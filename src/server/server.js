const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const getWeatherData = async (city) => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHERBIT_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = {
      high: data.data[0].temp,
      low: data.data[0].low_temp || "N/A",
      description: data.data[0].weather.description,
    };

    return weather;
  } catch (error) {
    console.error("Error fetching weather data:", error);
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
  const { city } = req.body;

  try {
    const weather = await getWeatherData(city);
    const image = await getCityImage(city);

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

app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
