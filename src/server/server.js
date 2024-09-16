const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

require("dotenv").config();

const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const getWeatherData = async (city, departureDate) => {
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHERBIT_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Find forecast for the departure date
    const forecast = data.data.find((day) => day.valid_date === departureDate);

    if (forecast) {
      const weather = {
        high: forecast.high_temp,
        low: forecast.low_temp,
        description: forecast.weather.description,
        wind_speed: forecast.wind_spd,
        precipitation: forecast.precip,
        clouds: forecast.clouds,
      };
      return weather;
    } else {
      return { description: "No forecast available for this date." };
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: "Failed to fetch weather data" };
  }
};

const getCityImage = async (city) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      return "https://placekitten.com/400/300";
    }
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
  }
};

app.post("/getData", async (req, res) => {
  const { city, departureDate } = req.body;
  console.log(departureDate);
  console.log(city);

  try {
    const weather = await getWeatherData(city, departureDate);
    const image = await getCityImage(city);

    const currentDate = new Date();
    const travelDate = new Date(departureDate);
    const timeDiff = Math.abs(travelDate - currentDate);
    const daysAway = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    res.json({
      location: city,
      weather,
      image,
      daysAway,
      departureDate,
    });
  } catch (error) {
    console.error("Error fetching travel data:", error);
    res.status(500).json({ error: "Failed to fetch travel data" });
  }
});

app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
