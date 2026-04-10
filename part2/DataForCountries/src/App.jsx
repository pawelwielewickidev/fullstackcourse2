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
