# Travel Planner App

This is a travel planner application that helps users plan their trips by showing weather information and images of their selected destination. The app pulls data from the **Weatherbit** and **Pixabay** APIs and calculates how many days remain until the user's planned departure date.

## Features

- Users can input a destination and a departure date.
- Displays weather information (high/low temperature and weather conditions) for the selected city.
- Displays an image of the city from Pixabay.
- Calculates and displays how many days away the trip is.
- Options to save or remove the trip.

## Technologies Used

- **Node.js** with **Express** for the server-side API
- **Webpack** for bundling JavaScript, SCSS, and other resources
- **JavaScript (ES6)** for client-side logic
- **SCSS** for styling
- **Service Workers** for offline capability
- **Jest** for testing

## APIs Integrated

1. **Geonames API**

   - Used to convert the city name entered by the user into geographical coordinates (latitude and longitude).
   - The coordinates are passed to the Weatherbit API to retrieve weather data.

2. **Weatherbit API**

   - Provides weather data (both current and future weather) based on the coordinates received from the Geonames API.

3. **Pixabay API**
   - Provides an image of the destination city, based on the user’s input.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Webpack
- Babel

### Installation

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/ayhamdw/UDACITY_Final_Project.git
   cd Final_Project
   ```

2. Install all dependencies.

   ```
   npm install
   ```

3. Set up your `.env` file with your API keys for Geonames, Weatherbit, and Pixabay. You should create a `.env` file in the root directory and add your API keys in the following format:
   ```
   GEONAMES_USERNAME=your_geonames_username
   WEATHERBIT_KEY=your_weatherbit_api_key
   PIXABAY_KEY=your_pixabay_api_key
   ```

### Running the Application

1. Build the project using Webpack.

   ```
   npm run prod
   ```

2. Run the development server with hot reloading using Webpack Dev Server.

   ```
   npm run dev
   ```

3. Start the Express server.

   ```
   npm run start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

### Testing

To run the tests using Jest:

```
npm run test
```

## Folder Structure

```
├── dist/                # Bundled output files
├── src/
│   ├── client/
│   │   ├── js/
│   │   │   └── app.js   # Main client-side JavaScript
│   │   ├── styles/
│   │   │   └── style.scss  # SCSS styles
│   │   ├── views/
│   │   │   └── index.html  # HTML template
│   └── server/
│       └── server.js  # Express server
├── .env                # Environment variables for API keys
├── package.json        # Project dependencies and scripts
├── webpack.config.js   # Webpack configuration
└── README.txt          # Project description and instructions
```

## Additional Notes

- **Cross-browser compatibility**: The app ensures consistent rendering across modern browsers.
- **Offline functionality**: Service workers have been implemented to cache assets and provide offline access.
- **Future Improvements**: You can enhance this app further by adding more APIs for a richer experience, such as flight or hotel booking integration.
