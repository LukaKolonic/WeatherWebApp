import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/component/Widget.scss"

const Widget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherBackground, setWeatherBackground] = useState('');

  
  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = 'b15e80dcce1aca1de5a89ac53a8840d4';
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            try {
              const response = await axios.get(apiUrl);
              setWeatherData(response.data);
              console.log(response.data);
              setLoading(false);
              setWeatherBackground(response.data.weather[0].main.toLowerCase());
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          },
          (error) => {
            console.error('Unable to retrieve geolocation', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported in this browser');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={`widget ${weatherBackground}`}>
          <h4 className='currentLocation'>Current location</h4>
          <h3 className='city'>{weatherData.name}</h3>
          <p className='temperature'>{weatherData.main.temp}°</p>
          <p className='maxTemp'>Max: {weatherData.main.temp_max}°</p>
          <p className='minTemp'>Min: {weatherData.main.temp_min}°</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default Widget;
