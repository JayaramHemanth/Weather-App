
import React, { useState, useEffect } from 'react';

const WeatherDetails = ({ weatherData, unit, onToggleUnit, forecastData }) => {
    const [forecastUnit, setForecastUnit] = useState(unit);
  
    useEffect(() => {
      setForecastUnit(unit);
    }, [unit]);
  
    const convertTemperature = (celsius) => (forecastUnit === 'metric' ? celsius : convertToFahrenheit(celsius));
    const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;
  
    const uniqueDates = forecastData ? [...new Set((forecastData.list || []).map(item => item.dt_txt.split(' ')[0]))] : [];
    const filteredForecast = forecastData ? (forecastData.list || []).filter(item =>
      uniqueDates.includes(item.dt_txt.split(' ')[0])
    ) : [];
  
    const averageTemperaturePerDay = {};
    filteredForecast.forEach(forecast => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!averageTemperaturePerDay[date]) {
        averageTemperaturePerDay[date] = {
          count: 1,
          totalTemperature: forecast.main.temp,
          description: forecast.weather && forecast.weather[0].description,
          icon: forecast.weather && forecast.weather[0].icon,
        };
      } else {
        averageTemperaturePerDay[date].count += 1;
        averageTemperaturePerDay[date].totalTemperature += forecast.main.temp;
      }
    });
  
    return (
      <div className="weather-details">
        {weatherData ? (
          <>
            <h2>{weatherData.name}, {weatherData.sys && weatherData.sys.country}</h2>
            {weatherData.main ? (
              <>
                {/* Displaying temperature with unit conversion */}
                <p>Current Temperature: {convertTemperature(weatherData.main.temp)}&deg;{forecastUnit === 'metric' ? 'C' : 'F'}</p>
                <p>Min Temperature: {convertTemperature(weatherData.main.temp_min)}&deg;{forecastUnit === 'metric' ? 'C' : 'F'}</p>
                <p>Max Temperature: {convertTemperature(weatherData.main.temp_max)}&deg;{forecastUnit === 'metric' ? 'C' : 'F'}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </>
            ) : (
              <p>No temperature data available.</p>
            )}
            <p>Wind Speed: {weatherData.wind && weatherData.wind.speed} m/s</p>
            <p>Weather Description: {weatherData.weather && weatherData.weather[0].description}</p>
            {weatherData.weather && (
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
            )}
  
            {/* Toggle button to switch between Celsius and Fahrenheit */}
            <button onClick={() => {
              onToggleUnit();
              setForecastUnit(forecastUnit === 'metric' ? 'imperial' : 'metric');
            }}>Toggle Unit</button>
  
            {filteredForecast.length > 0 ? (
              <>
                <p>6 Days Forecast:</p>
                <div className="forecast">
                  {Object.entries(averageTemperaturePerDay).map(([date, data]) => (
                    <div key={date} className="forecast-item">
                      <p>Date: {date}</p>
                      <p>Average Temperature: {convertTemperature(data.totalTemperature / data.count).toFixed(2)}&deg;{forecastUnit === 'metric' ? 'C' : 'F'}</p>
                      <p>Description: {data.description}</p>
                      {data.icon && (
                        <img src={`http://openweathermap.org/img/wn/${data.icon}.png`} alt="Weather Icon" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No forecast data available. Please enter a valid city name.</p>
            )}
          </>
        ) : (
          <p>Enter a valid city name to view the weather details.</p>
        )}
      </div>
    );
  };
  
  export default WeatherDetails;
