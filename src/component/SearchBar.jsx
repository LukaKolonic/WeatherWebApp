import React, { useState } from 'react';
import axios from 'axios';
import "../styles/component/SearchBar.css";
import ForecastFiveDaysGrid from './ForecastFiveDaysGrid';
import ForecastGraph from './ForecastGraph';


const SearchBar = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [filteredForecast, setFilteredForecast] = useState([]);

  const apiKey = "b15e80dcce1aca1de5a89ac53a8840d4";

  const handleSearch = () => {
    if (city) {
      fetchForecast();
      setShowGrid(true);
      setShowGraph(true);
    }
    
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      if(!response.data) return;
      const forecastList = response.data.list;

      const filteredForecast = forecastList.filter((weather) =>
      weather.dt_txt.includes("12:00:00")
      );

      setForecast(filteredForecast.slice(0, 5));
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  }

  const handleForecastChange = (newForecast) => {
    setFilteredForecast(newForecast);
  }

  return (
    <div className='search'>
      <input className='textSearch'
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter the city.."
      />

      <button className='btnSearch' onClick={handleSearch}>Search</button>

      {showGrid && <ForecastFiveDaysGrid city={city} forecast={forecast} onForecastChange={handleForecastChange} />}
      
      {showGraph && <ForecastGraph city={city} forecast={filteredForecast} />}
      
    </div>
  );
};

export default SearchBar;






