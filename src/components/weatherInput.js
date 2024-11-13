
import React, { useState } from 'react';
import './weatherInput.css';

const WeatherInput = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city);
      // Clear the input field after searching
      setCity('');
    }
  };

  return (
    <div className="weather-input">
      <input type="text" id="cityInput" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default WeatherInput;
