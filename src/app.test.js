// Importing the functions to test
import { getTravelData, updateTripInfo } from "./client/js/app"; // Adjust the path if needed

// Mock the fetch API for getTravelData tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        location: "Paris",
        weather: { high: 30, low: 20, description: "Sunny" },
      }),
  })
);

describe("getTravelData", () => {
  test("should fetch travel data for a given city", async () => {
    const city = "Paris";
    const data = await getTravelData(city);

    expect(data).toEqual({
      location: "Paris",
      weather: { high: 30, low: 20, description: "Sunny" },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8081/getData",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      })
    );
  });
});

describe("updateTripInfo", () => {
  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <div id="trip-location"></div>
      <div id="departure-date"></div>
      <div id="days-away"></div>
      <div id="high-temp"></div>
      <div id="low-temp"></div>
      <div id="weather-description"></div>
      <img id="location-image" />
    `;
  });

  test("should update the DOM with trip details", () => {
    const tripDetails = {
      location: "Paris",
      departureDate: "2024-10-01",
      daysAway: 10,
      weather: {
        high: 30,
        low: 20,
        description: "Sunny",
      },
      image: "https://example.com/image.jpg",
    };

    updateTripInfo(tripDetails);

    expect(document.getElementById("trip-location").textContent).toBe("Paris");
    expect(document.getElementById("departure-date").textContent).toBe(
      "2024-10-01"
    );
    expect(document.getElementById("days-away").textContent).toBe("10");
    expect(document.getElementById("high-temp").textContent).toBe("30");
    expect(document.getElementById("low-temp").textContent).toBe("20");
    expect(document.getElementById("weather-description").textContent).toBe(
      "Sunny"
    );
    expect(document.getElementById("location-image").src).toBe(
      "https://example.com/image.jpg"
    );
  });
});
