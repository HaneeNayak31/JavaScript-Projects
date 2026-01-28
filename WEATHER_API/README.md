# Weather App ☀️

**Weather App** is a simple yet functional application that provides real-time weather updates for any city in the world. By integrating with the OpenWeatherMap API, it fetches current temperature and weather conditions instantly.

## 🚀 About the Project

This project allows users to check the weather by simply entering a city name. It handles API requests, processes the JSON response, and dynamically updates the DOM to display the city name, temperature, and a brief description of the weather. It also includes error handling for invalid city names.

## ✨ Key Features

-   **City Search**: Input any city name to retrieve its weather data.
-   **Real-Time Data**: Fetches live temperature and condition descriptions (e.g., cloudy, clear sky).
-   **Metric Units**: Displays temperature in degrees Celsius.
-   **Error Handling**: User-friendly error message when a city is not found.
-   **Responsive UI**: A clean, centered layout that works on all devices.

## 🛠️ Tech Stack & Tools

-   **HTML5 & CSS3**: For structure and styling.
-   **JavaScript (Async/Await)**: Handles asynchronous API calls using `fetch`.
-   **OpenWeatherMap API**: The external service used to provide accurate weather data.

## 🏗️ How It Works

1.  **Input**: The user types a city name and clicks "Get Weather".
2.  **Fetch API**: JavaScript sends an asynchronous request to the OpenWeatherMap endpoint with the city name and API key.
3.  **Validation**: If the city exists, the API returns a 200 OK response with the data. If not, an error is caught and displayed.
4.  **Display**: The app extracts the relevant fields (`name`, `main.temp`, `weather.description`) and updates the HTML elements to show the result.

---
*Check before you step out.*
