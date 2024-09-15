const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serving static files
app.use(express.static("dist"));

// API Keys (replace with your actual API keys)
const WEATHERBIT_API_KEY = "YOUR_WEATHERBIT_API_KEY";
const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY";

// Function to get weather data from Weatherbit
const getWeatherData = async (city) => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHERBIT_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = {
      high: data.data[0].temp, // Assuming temp is high temp
      low: data.data[0].low_temp || "N/A", // Assuming there is a low temp field
      description: data.data[0].weather.description,
    };

    return weather;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Function to get an image from Pixabay
const getCityImage = async (city) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      return "https://placekitten.com/400/300"; // Default image if no results
    }
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
  }
};

// Endpoint to fetch travel data
app.post("/getData", async (req, res) => {
  const { city } = req.body;

  try {
    // Get weather and image data
    const weather = await getWeatherData(city);
    const image = await getCityImage(city);

    // Calculate days away
    const currentDate = new Date();
    const departureDate = new Date(req.body.departureDate);
    const timeDiff = Math.abs(departureDate - currentDate);
    const daysAway = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Send response
    res.json({
      location: city,
      weather,
      image,
      daysAway,
    });
  } catch (error) {
    console.error("Error fetching travel data:", error);
    res.status(500).json({ error: "Failed to fetch travel data" });
  }
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
