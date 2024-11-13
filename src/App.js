

import React, { useState } from 'react';
import './App.css';
import WeatherInput from './components/weatherInput';
import WeatherDetails from './components/weatherDetails';


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  const fetchWeatherData = async (city) => {
    try {
      // Fetch weather data and forecast data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=0dac173636f400a4a1cb223aef8de1da`
      );
      const weatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=0dac173636f400a4a1cb223aef8de1da`
      );
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);

      // Clear the input field after searching
      document.getElementById('cityInput').value = '';
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  return (
    <div className="App">
      <WeatherInput
        onSearch={(city) => {
          fetchWeatherData(city);
        }}
      />
      <WeatherDetails
        weatherData={weatherData}
        forecastData={forecastData}
        unit={unit}
        onToggleUnit={() => setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'))}
      />
    </div>
  );
};

export default App;

