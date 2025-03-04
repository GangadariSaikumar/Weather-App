import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import wicon from "../src/assets/wicon.jpg";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "86eebf0545b3652c11b5223880e77d4e";

  const fetchWeather = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-black text-white">
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-black outline-none px-2"
        />
        <FaSearch onClick={fetchWeather} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Weather Info */}
      {loading ? (
        <p className="text-xl font-semibold">Loading...</p>
      ) : weather ? (
        <>
          <img src={wicon} alt="Weather Icon" className="w-20 h-20 mb-4" />
          <h1 className="text-4xl font-bold mb-1">{weather.main.temp}°C</h1>
          <h2 className="text-2xl font-semibold mt-2">{weather.name}</h2>

          {/* Humidity & Wind Speed */}
          <div className="w-full max-w-md mt-6 flex flex-col md:flex-row items-center justify-between md:items-start">
            <div className="flex flex-col items-center">
              <WiHumidity className="text-3xl" />
              <span className="text-lg font-medium">{weather.main.humidity}%</span>
              <p className="text-sm">Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              <WiStrongWind className="text-3xl" />
              <span className="text-lg font-medium">{weather.wind.speed} km/h</span>
              <p className="text-sm">Wind Speed</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-xl font-semibold">Enter a city name to get the weather</p>
      )}
    </div>
  );
}

export default App;
