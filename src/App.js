import React, { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";

export default function App() {
  // State to hold filtered states based on selected country
  const [initstates, setstates] = useState([]);

  // State to hold filtered cities based on selected state
  const [initcities, setcities] = useState([]);

  // Memoize country data to avoid recomputation on every render
  const countries = useMemo(() => Country.getAllCountries(), []);

  // Memoize state data to avoid recomputation on every render
  const states = useMemo(() => State.getAllStates(), []);

  // Memoize city data to avoid recomputation on every render
  const cities = useMemo(() => City.getAllCities(), []);

  // Event handler to filter states based on selected country
  const handleChange = (e) => {
    // Filter states based on selected country code
    const filteredStates = states.filter(
      (val) => val.countryCode.trim() === e.target.value.trim()
    );

    // Update state with filtered states
    setstates(filteredStates);

    // Reset cities if the country is changed
    setcities([]);
  };

  // Event handler to filter cities based on selected state
  const handleStateChange = (e) => {
    // Filter cities based on selected state code
    const matchedcities = cities.filter(
      (val) => val.stateCode === e.target.value
    );

    // Update state with filtered cities
    setcities(matchedcities);
  };

  return (
    <>
      {/* Dropdown for selecting country */}
      <select onChange={handleChange}>
        {countries.map((country, i) => (
          <option key={i} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Dropdown for selecting state, disabled if no country selected */}
      <select onChange={handleStateChange} disabled={initstates.length === 0}>
        {initstates.map((state, i) => (
          <option key={i} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>

      {/* Dropdown for selecting city, disabled if no state selected */}
      <select disabled={initcities.length === 0}>
        {initcities.map((city, i) => (
          <option key={i} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
}
