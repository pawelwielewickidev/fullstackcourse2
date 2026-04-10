import { useEffect, useState } from "react";
import axios from "axios";

const Display = ({ countries, setSearchCountry }) => {
  console.log("display country", countries);
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}> {language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <CountryDetails country={country} />
      </div>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}

          <button
            type="button"
            onClick={() => setSearchCountry(country.name.common)}
            style={{ marginLeft: "5px" }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country.capital) {
      console.log("No country for weather: ", country);
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const capitalName = country.capital?.[0];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${apiKey}&units=metric`;
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response.data);
      setWeather(response.data);
    });
  }, [country]);
  console.log("Weather for capital:", weather);
  if (weather === null) {
    return;
  }
  return (
    <div>
      <h2>Weather:</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((initialCountries) => {
        setCountries(initialCountries.data);
      });
  }, []);

  if (!countries) {
    return null;
  }

  const searchResult = searchCountry
    ? countries.filter((country) => {
        const nameLower = country.name.common.toLowerCase();
        const searchLower = searchCountry.toLocaleLowerCase();
        return nameLower.includes(searchLower);
      })
    : [];

  const handleCountrySearch = (event) => {
    console.log(event.target.value);
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <div>
        find countries:{" "}
        <input value={searchCountry} onChange={handleCountrySearch} />
      </div>
      <Display countries={searchResult} setSearchCountry={setSearchCountry} />
    </div>
  );
};

export default App;
