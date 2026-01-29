import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '477596fc73e5122b537130f48f236713';

  const getWeather = () => {
    if (!city) {
      setError('Please enter a city');
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError('City not found');
          setWeather(null);
        } else {
          setWeather(data);
          setError('');
        }
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <div className="weather-container">
      <h1>🌦️ Weather App</h1>

      <SearchBox
        city={city}
        setCity={setCity}
        getWeather={getWeather}
      />

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;

//            ┌───────────────────┐
//            │       App.jsx     │  <-- Parent Component
//            │                   │
//            │  State:           │
//            │  city, weather,   │
//            │  error            │
//            └─────────┬─────────┘
//                      │ props/state
//                      │
//         ┌────────────┴────────────┐
//         │                         │
// ┌───────────────┐          ┌───────────────┐
// │  SearchBox    │          │ WeatherCard   │
// │  (Child)      │          │ (Child)       │
// │               │          │               │
// │ Props:        │          │ Props:        │
// │ - city        │          │ - weather     │
// │ - setCity     │          │               │
// │ - getWeather  │          │               │
// └───────┬───────┘          └───────────────┘
//         │
//         │ User types input / clicks button
//         │
//         ▼
//    setCity / getWeather
//         │
//         ▼
//       Updates App State
