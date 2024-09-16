const getTravelData = async (city, departureDate) => {
  try {
    const response = await fetch("http://localhost:8081/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Pass both city and departureDate to the server
      body: JSON.stringify({ city, departureDate }),
    });

    if (!response.ok) throw new Error("Error fetching travel data");

    const data = await response.json();
    console.log("Travel data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateTripInfo = (tripDetails) => {
  if (!tripDetails.weather) {
    console.error("Invalid tripDetails object:", tripDetails);
    return;
  }

  document.getElementById("trip-location").textContent = tripDetails.location;
  document.getElementById("departure-date").textContent =
    tripDetails.departureDate;
  document.getElementById("days-away").textContent = tripDetails.daysAway;
  document.getElementById(
    "high-temp"
  ).textContent = `${tripDetails.weather.high}°F`;
  document.getElementById(
    "low-temp"
  ).textContent = `${tripDetails.weather.low}°F`;
  document.getElementById("weather-description").textContent =
    tripDetails.weather.description;
  document.getElementById("location-image").src = tripDetails.image;
};

const handleFormSubmit = () => {
  const form = document.getElementById("travel-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    const departureDate = document.getElementById("departure-date-input").value;

    // Pass city and departureDate to the server
    const tripDetails = await getTravelData(city, departureDate);
    if (tripDetails) {
      updateTripInfo({ ...tripDetails, departureDate });
    }
  });
};

const handleTripButtons = () => {
  const saveButton = document.getElementById("save-trip");
  const removeButton = document.getElementById("remove-trip");

  saveButton.addEventListener("click", () => {
    alert("Trip saved!");
  });

  removeButton.addEventListener("click", () => {
    alert("Trip removed!");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleFormSubmit();
  handleTripButtons();
});
