# Import necessary libraries
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
import requests
from dotenv import load_dotenv
from urllib.parse import quote
import json
import pandas as pd

# Initialize Flask app
app = Flask(__name__, static_folder='static')
app.secret_key = '19cee4b711c3f79dd62a2af4f511291c'

# Load API keys from .env file
load_dotenv()
google_maps_api_key = os.environ.get("GOOGLE_MAPS_API_KEY")
oiko_api_key = os.environ.get("OIKO_API_KEY")
# noaa_api_key = os.environ.get("NOAA_API_KEY")
# openweather_api_key = os.environ.get("OPENWEATHER_API_KEY")

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# MongoDB setup
mongodb_uri = os.environ.get("MONGODB_URI")
client = MongoClient(mongodb_uri)

db = client['horizon']
recommendations_collection = db["recommendations"]
users_collection = db["users"]
projects_collection = db["projects"]

# client = MongoClient('mongodb://localhost:27017/')
# db = client['horizon']
# recommendations_collection = db["recommendations"]
# users_collection = db["users"]
# projects_collection = db["projects"]
# mongodb_uri = os.environ.get("MONGODB_URI")
# client = MongoClient(mongodb_uri)

# User class for Flask login
class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data['_id'])
        self.username = user_data['username']
        self.email = user_data['email']
        self.password = user_data['password']
        self.projects = user_data['projects']

# User loader function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    user_data = db.users.find_one({'_id': ObjectId(user_id)})
    if user_data:
        return User(user_data)
    return None

# Home 
@app.route('/')
def home():
     return render_template('home.html')

# Registration 
@app.route('/register', methods=['GET', 'POST'])
def register():
    # Redirect to dashboard if already logged in
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    # Handle registration form submission
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check for existing user
        existing_user = db.users.find_one({'email': email})

        if existing_user:
            flash('An account with this email already exists.', 'danger')
            return redirect(url_for('register'))

        # Create new user
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hashed_password_str = hashed_password.decode('utf-8')
        new_user = {
            'username': username,
            'email': email,
            'password': hashed_password_str,
            'projects': []
        }

        # Add new user to database
        db.users.insert_one(new_user)
        flash('Registration successful. You can now log in.', 'success')
        return redirect(url_for('login'))

    # Render registration template
    return render_template('register.html')

# Login 
@app.route('/login', methods=['GET', 'POST'])
def login():
    # Redirect to dashboard if already logged in
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    # Handle login form submission
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user_data = db.users.find_one({'email': email})

        # Authenticate user
        if user_data:
            stored_password = user_data['password'].encode('utf-8')  # Add this line

            # Authenticate user
            if bcrypt.checkpw(password.encode('utf-8'), stored_password):  # Update this line
                user = User(user_data)
                login_user(user)
                flash('Logged in successfully.', 'success')
                # Redirect to the dashboard after successful login
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid email or password.', 'danger')

    # Render the login template
    return render_template('login.html')

# Logout 
@app.route('/logout')
@login_required
def logout():
    # Log the user out
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

# Dashboard
@app.route('/dashboard')
@login_required
def dashboard():
    # Get user projects from the database
    user_projects = db.projects.find({'user_id': current_user.id})
    return render_template('dashboard.html', projects=user_projects)

# Create new project
@app.route('/create_project', methods=['POST'])
@login_required
def create_project():
    project_name = request.form['project_name']
    address = request.form['address']

    # Fetch climate data for the project
    climate_stats, lat, lon, weather_data = fetch_climate_data(address)

    # Create a new project
    new_project = {
        'name': project_name,
        'address': address,
        'lat': lat,
        'lon': lon,
        'climate_stats': climate_stats,
        'weather_data': weather_data,
        'user_id': current_user.id
    }

    # Add the new project to the database
    project_id = db.projects.insert_one(new_project).inserted_id
    flash('Project created successfully.', 'success')
    return redirect(url_for('project', project_id=project_id))

# Fetch climate data
def fetch_climate_data(address):
    # Print the address for which the climate data is being fetched
    print("Fetching climate data for address:", address)

    # Encode the address and create the geocode URL
    encoded_address = quote(address)
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={encoded_address}&key={google_maps_api_key}"

    # Get the geocode response
    geocode_response = requests.get(geocode_url).json()

    # If no results are found, return empty data
    if not geocode_response['results']:
        print("Geocode API Error: No results found.")
        return {}, None, None, None

    # Extract the latitude and longitude from the geocode response
    location = geocode_response['results'][0]['geometry']['location']
    lat = location['lat']
    lon = location['lng']

    # Send a request to the Oikolab API to get climate data
    response = requests.get('https://api.oikolab.com/weather',
                            params={'param': ['temperature', 'wind_speed', 'surface_solar_radiation', 'surface_thermal_radiation'],
                                    'start': '2010-01-01',
                                    'end': '2018-12-31',
                                    'lat': lat,
                                    'lon': lon,
                                    'api-key': oiko_api_key}
                            )

    # Process the Oikolab API response
    if response.status_code == 200:
        weather_data = json.loads(response.json()['data'])
        df = pd.DataFrame(index=pd.to_datetime(weather_data['index'], unit='s'),
                          data=weather_data['data'],
                          columns=weather_data['columns'])

        # Calculate basic climate statistics
        climate_stats = {
            'avg_temperature': df['temperature (degC)'].mean(),
            'avg_wind_speed': df['wind_speed (m/s)'].mean(),
            'avg_surface_solar_radiation': df['surface_solar_radiation (W/m^2)'].mean(),
            'avg_surface_thermal_radiation': df['surface_thermal_radiation (W/m^2)'].mean(),
            'annual_mean_temps': df['temperature (degC)'].resample('Y').mean().values.tolist(),
            'annual_max_temps': df['temperature (degC)'].resample('Y').max().values.tolist(),
            'annual_min_temps': df['temperature (degC)'].resample('Y').min().values.tolist(),
            'avg_daily_temp_per_month': df['temperature (degC)'].resample('M').mean().values.tolist(),
            'avg_max_temps': df['temperature (degC)'].resample('Y').max().mean()
        }

        return climate_stats, lat, lon, weather_data
    else:
        # Handle Oikolab API errors
        print(f"Oikolab API Error: Status code {response.status_code}")
        return {}, None, None, None

# Project page
@app.route('/project/<project_id>')
@login_required
def project(project_id):
    # Find the project data in the database
    project_data = db.projects.find_one({'_id': ObjectId(project_id), 'user_id': current_user.id})
    
    # If the project is not found, redirect to the dashboard
    if not project_data:
        flash('Project not found.', 'danger')
        return redirect(url_for('dashboard'))
    
    # If the project does not have climate data, show an error message
    if not project_data.get('climate_stats'):
        flash('Climate data is missing.', 'danger')
        return redirect(url_for('dashboard'))

    # Extract required climate data from the climate_stats dictionary
    climate_data = {
        'temperature': project_data['climate_stats']['avg_temperature'],
        'maxTemperature': project_data['climate_stats']['avg_max_temps'],
        'precipitation': 40,
        'solarRadiation': project_data['climate_stats']['avg_surface_solar_radiation'],
        'windSpeed': project_data['climate_stats']['avg_wind_speed']
    }

    policy_recommendations = get_policy_recommendations()

    return render_template('project.html', project=project_data, climate_stats=project_data['climate_stats'], climate_data=climate_data, policy_recommendations=policy_recommendations)

# Fetch policy recommendations from the database
def get_policy_recommendations():
    recommendations_collection = db["recommendations"]
    policy_recommendations = recommendations_collection.find_one()
    return policy_recommendations["policy_recommendations"]

# Delete project route
@app.route('/delete_project', methods=['POST'])
@login_required
def delete_project():
    # Get the project ID from the form data
    project_id = request.form['project_id']

    # Delete the project from the database
    db.projects.delete_one({'_id': ObjectId(project_id), 'user_id': current_user.id})
    flash('Project deleted successfully.', 'success')
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True)



