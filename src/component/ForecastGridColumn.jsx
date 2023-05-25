
import React from 'react';
import '../styles/component/ForecastGridColumn.scss';

function ForecastGridColumn(props) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
  };

  return (
    <div className="forecast-item">
      <p className="date">{formatDate(props.weather.dt_txt)}</p>
      <div className="temperature">
        <p className="temp">{props.weather.main.temp} °</p>
        <p className="min-max">
          Min: {props.weather.main.temp_min} ° Max: {props.weather.main.temp_max} °
        </p>
      </div>
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}
          alt="Weather Icon"
        />
        <p className="weather-description">{props.weather.weather[0].main}</p>
      </div>
    </div>
  );
}

export default ForecastGridColumn;
