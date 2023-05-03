# Design Document

## Technical Decisions
### Flask, Jinja, MongoDB, and Tailwind CSS
The project was built using Flask as it is an easy-to-use web framework for Python. Flask was chosen because it simplifies the process of building web applications, while still providing flexibility and extensibility. Jinja was used as the templating engine, as it is the default templating engine for Flask and provides a simple yet powerful syntax for rendering dynamic HTML content.

MongoDB was selected as the database for the project due to its flexibility and scalability. The database schema can be easily updated, and the JSON-like structure of the documents makes it easy to work with.

Tailwind CSS was chosen for styling the web application because it offers a utility-first approach, which allows for rapid development and customization of the UI. Moreover, the utility classes provided by Tailwind CSS can be easily combined and extended to create unique designs with minimal effort.

### Address Autocomplete and Mapbox
Address Autocomplete was implemented using the Google Maps JavaScript API. This feature was chosen to simplify the process of entering addresses and ensure that users input valid addresses with accurate geographic coordinates.

Mapbox was chosen for displaying the project location on a map because it offers a robust and customizable mapping solution with a rich set of features. This allows for the easy integration of interactive maps and custom markers, enhancing the user experience.

### Climate Data Processing and Visualization
To process and visualize the climate data, the project relied on several Python libraries, including pandas for data manipulation and calculation of statistics, and Chart.js for creating interactive charts. These tools were chosen because they are widely adopted, well-documented, and provide an efficient way to handle and visualize data. Furthermore, I've utilized the Oikolabs API to access historic weather data as they provided me with free access to their API while also having a good documentation which allowed me to easily interact with it.

### Challenges, Features, and New Technologies
I encountered numerous challenges while building the application. First, after discovering the importance of using a virtual environment to prevent conflicts between dependencies and ensure reproducibility, I decided to set up my own virtual environment. However, learning to set up, activate, and manage the environment proved more challenging than anticipated. Second, I experienced many trial and error cycles when trying to use Chart.js to plot my graphs, as passing the necessary data to the Chart instance was difficult. Given that writing JavaScript code was the most challenging and time-consuming part, I had to accept that my climate statistics might not be perfect and instead focus on making the JavaScript functions work. Third, I tried several APIs such as OpenWeather and NOAA, but obtaining simple data that I could process and use was quite difficult. Although I successfully worked with all APIs, Oikolabs enabled me to easily access the data I needed, even though it didn't provide precipitation data which forced me to hard-code the value into the application. Consequently, I could have used various APIs or even a combination of all of them to obtain more meaningful climate statistics, but this seemed to be beyond the scope of this project. Lastly, learning and setting up MongoDB and Tailwind CSS proved to be a significant challenge, as I had to invest many hours reading the documentation to configure everything properly. As a result, I challenged myself by learning several new technologies, ranging from experimenting with different APIs and utilizing ChartJS for visually appealing graphs to mastering MongoDB and Tailwind CSS.


## Ethical Decisions
### Motivation and Features
My primary motivation for this project was to build a tool for people in communities that are highly vulnerable to the impacts of climate change. I recognized that those who will suffer the most from climate change often have limited resources, and it is crucial to provide them with a tool that can help them prepare and mitigate risks. To address this need, I aimed to create features that would provide easy-to-understand climate information, risk assessments, and actionable policy recommendations to support informed decision-making.

### Intended Users and Their Needs
The intended users of this project are individuals, communities, and local authorities in areas vulnerable to the impacts of climate change. These users value accurate and relevant information that can help them understand the changing climate patterns, assess potential risks, and take preventive measures to reduce their vulnerability. They need a user-friendly tool that can deliver timely and reliable information, enabling them to make informed decisions about resource allocation, risk management, and community planning.

### Impact on Users as the Project Scales Up
As the project scales up, it is essential to consider potential misuse, accessibility, and social concerns. One potential misuse of the project could be using the climate risk data to discriminate against certain areas or populations when making decisions about investments or resource allocation. To minimize this risk, it is crucial to emphasize the importance of using the data responsibly and ethically. Accessibility is another concern, as users with limited technical skills or disabilities may have difficulty using the project. Efforts should be made to ensure that the application is accessible and user-friendly for a diverse range of users. Finally, if the project would become widely adopted, there may be social concerns related to the implications of climate risks on vulnerable populations or regions. The project should strive to present the data in a balanced and unbiased manner, while also promoting awareness of the broader context and potential consequences of climate change.


