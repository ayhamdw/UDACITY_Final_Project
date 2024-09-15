// Importing SCSS file
import "./styles/style.scss";

// Function to fetch weather and image data
const getTravelData = async (city) => {
  try {
    const response = await fetch("http://localhost:8081/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });

    if (!response.ok) throw new Error("Error fetching travel data");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to update the trip information in the DOM
const updateTripInfo = (tripDetails) => {
  document.getElementById("trip-location").textContent = tripDetails.location;
  document.getElementById("departure-date").textContent =
    tripDetails.departureDate;
  document.getElementById("days-away").textContent = tripDetails.daysAway;
  document.getElementById("high-temp").textContent = tripDetails.weather.high;
  document.getElementById("low-temp").textContent = tripDetails.weather.low;
  document.getElementById("weather-description").textContent =
    tripDetails.weather.description;
  document.getElementById("location-image").src = tripDetails.image;
};

// Handling the form submission
const form = document.getElementById("travel-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.getElementById("city").value;
  const departureDate = document.getElementById("departure-date-input").value;

  // Call the server to get the travel data
  const tripDetails = await getTravelData(city);

  // Update the trip info with the fetched data
  updateTripInfo({ ...tripDetails, departureDate });
});

// Save trip button
document.getElementById("save-trip").addEventListener("click", () => {
  alert("Trip saved!");
});

// Remove trip button
document.getElementById("remove-trip").addEventListener("click", () => {
  alert("Trip removed!");
});
