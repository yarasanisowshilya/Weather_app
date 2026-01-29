import React from 'react';

const SearchBox = ({ city, setCity, getWeather }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>
    </>
  );
};

export default SearchBox;
