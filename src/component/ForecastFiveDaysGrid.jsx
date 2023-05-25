import React, { useState, useEffect } from "react";
import "../styles/component/ForecastFiveDaysGrid.scss";
import ForecastGridColumn from "./ForecastGridColumn";

function ForecastFiveDaysGrid(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [temperatureFilter, setTemperatureFilter] = useState(null);
  const [filteredForecast, setFilteredForecast] = useState([]);

  useEffect(() => {
    const updateFilteredForecast = () => {
      const updatedForecast = selectedDate
        ? props.forecast.filter((weather) => {
            const forecastDate = new Date(weather.dt_txt);
            const selectedDateTime = new Date(selectedDate);
            return (
              forecastDate.getDate() === selectedDateTime.getDate() &&
              forecastDate.getMonth() === selectedDateTime.getMonth() &&
              forecastDate.getFullYear() === selectedDateTime.getFullYear()
            );
          })
        : props.forecast;

      const filteredByTemperature = temperatureFilter
        ? updatedForecast.filter(
            (weather) => weather.main.temp > temperatureFilter
          )
        : updatedForecast;

      setFilteredForecast(filteredByTemperature);
      props.onForecastChange(filteredByTemperature);
    };

    updateFilteredForecast();
  }, [props.forecast, selectedDate, temperatureFilter]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTemperatureChange = (e) => {
    const temperature = parseFloat(e.target.value);
    setTemperatureFilter(temperature);
  };

  return (
    <div>
      <h4 className="title">Five day forecast for {props.city}</h4>
      <div className="filters">
        <div className="date-dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedDate
              ? selectedDate.toLocaleDateString("hr-HR", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              : "Select a date"}
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-list">
              <li>
                <button onClick={() => handleDateSelect(null)}>All</button>
              </li>
              {props.forecast.map((weather, index) => {
                const forecastDate = new Date(weather.dt_txt);
                const formattedDate = forecastDate.toLocaleDateString("hr-HR", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleDateSelect(forecastDate)}
                      className={selectedDate === forecastDate ? "active" : ""}
                    >
                      {formattedDate}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="temperature-filter">
          <label htmlFor="temperature" className="temperature-filter__label">
            Temperature filter (°C):
          </label>
          <input
            type="number"
            id="temperature"
            className="temperature-filter__input"
            value={temperatureFilter || ""}
            onChange={handleTemperatureChange}
          />
        </div>
      </div>
      <div className="forecast-grid">
        {filteredForecast && filteredForecast.length > 0 ? (
          <>
            {filteredForecast.map((weather, index) => (
              <ForecastGridColumn key={index} weather={weather} />
            ))}
          </>
        ) : (
          <div>No forecast available for the selected date or temperature.</div>
        )}
      </div>
    </div>
  );
}

export default ForecastFiveDaysGrid;
