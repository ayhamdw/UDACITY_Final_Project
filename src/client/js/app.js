import "../styles/style.scss";

export const getTravelData = async (city) => {
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

export const updateTripInfo = (tripDetails) => {
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

export const handleFormSubmit = () => {
  const form = document.getElementById("travel-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    const departureDate = document.getElementById("departure-date-input").value;
    const tripDetails = await getTravelData(city);
    updateTripInfo({ ...tripDetails, departureDate });
  });
};

export const handleTripButtons = () => {
  document.getElementById("save-trip").addEventListener("click", () => {
    alert("Trip saved!");
  });

  document.getElementById("remove-trip").addEventListener("click", () => {
    alert("Trip removed!");
  });
};
