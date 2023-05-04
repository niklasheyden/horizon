### Youtube Video: https://youtu.be/n_9kbSayW4M
### I am hosting the application on Heroku. You can access it through this link: https://frozen-citadel-66233.herokuapp.com

# Project Title
Horizon – A Flask application for analyzing climate data and providing policy recommendations.

## Description
This project is a Flask web application that uses Jinja for templating, Tailwind CSS for styling, and MongoDB for data storage. The Climate Risk Assessment Tool allows users to input a location and receive climate data, risk assessments, and policy recommendations based on the analysis of historical and current climate data.


## Table of Contents

- ## Prerequisites
- ## Installation
- ## Usage


## Prerequisites
Before running the application, make sure you have the following installed:
- Python
- Node.js
- Tailwind CSS
- MongoDB

-> Instructions on how to set up Node.js, Tailwind CSS, and MongoDB can be found below under "Installation"


## Installation

1. Navigate to the project directory:
cd climate-risk-assessment-tool

2. Set up a virtual environment and activate it:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install the required Python packages:
pip install -r requirements.txt

4. Set up Tailwind CSS: 
Install Node.js and npm
- Visit the Node.js download page (https://nodejs.org/en/download/) and download the Node.js installer for your operating system.
- Install Node.js by following the installation instructions for your operating system.
- Verify that Node.js and npm (Node.js package manager) have been installed correctly by running the following commands in your terminal:
```sh
node -v
npm -v
```
- Install dependencies by runing: npm install 
- Build the Tailwind CSS file by running: npm run build-css
-> (This command should generate an output.css file in the static/css directory, which should contain the compiled Tailwind CSS styles).

5. Create a .env file and add the follwing API keys:
[Add API_Secret_Key as well as API Keys for Google Maps, Oikolabs ]

6. Install MongoDB and import policy recommendations:
- Visit the MongoDB download page (https://www.mongodb.com/try/download/community) and download the MongoDB Community Server for your operating system.
- Follow the installation instructions for your operating system in the MongoDB documentation: https://docs.mongodb.com/manual/installation/.
- Make sure your MongoDB server is running. If it's not start the server by following the instructions in the MongoDB documentation:(https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/).
- Open a terminal or command prompt and navigate to the project directory containing the `policy_recommendations.json` file.
- Run the following command to import the data from the JSON file into your MongoDB database:
```sh
mongoimport --db horizon --collection recommendations --file policy_recommendations.json
```

7. Run the application:
Start application by running: python app.py 
Open a web browser and navigate to http://127.0.0.1:5000/ to access the application.


## Usage
1. Register a new account by clicking on the "Register" button.
2. After creating your account, please log in. You will be redirected to your dashboard page.
2. Once logged in, you can create a new project by providing a name and an address before clicking the "Create New Project" button on the dashboard.
3. Using the location you provided, the application will fetch climate data, assess risks, and provide policy recommendations for that location. 
4. Once the application has created your project, you will be redirected to the project page where you can see all information.
5. You can return to the dashboard by clicking on the Horizon logo in the top left corner of the screen.
6. You can acces all past projects by clicking on them in the dashboard.

