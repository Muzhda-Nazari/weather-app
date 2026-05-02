import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const API_KEY = "f5f975ed1c2307c9aa8dfc55b285fd32";

    if (city.trim() === "") {
      alert("Please enter a city");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.log(error);
      alert("Error fetching weather data");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Weather App 🌤️</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          {weather.weather[0].main === "Clear" && <span style={{fontSize: "60px"}}>☀️</span>}
{weather.weather[0].main === "Clouds" && <span style={{fontSize: "60px"}}>☁️</span>}
{weather.weather[0].main === "Rain" && <span style={{fontSize: "60px"}}>🌧️</span>}
{weather.weather[0].main === "Snow" && <span style={{fontSize: "60px"}}>❄️</span>}
{weather.weather[0].main === "Mist" && <span style={{fontSize: "60px"}}>🌫️</span>}
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;