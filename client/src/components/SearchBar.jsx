import { useEffect, useMemo, useState } from "react";
import { useWeather } from "../context/WeatherContext.jsx";

const suggestions = [
  "New York",
  "London",
  "Tokyo",
  "Mumbai",
  "Paris",
  "Sydney",
  "Dubai",
  "Singapore"
];

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [matches, setMatches] = useState([]);
  const { loadByCity, loadByCoordinates, loading } = useWeather();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (city.trim().length < 2) {
        setMatches([]);
        return;
      }

      const normalized = city.toLowerCase();
      setMatches(suggestions.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 4));
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  const canUseLocation = useMemo(() => "geolocation" in navigator, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadByCity(city);
    setMatches([]);
  };

  const handleLocation = () => {
    if (!canUseLocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => loadByCoordinates(position.coords.latitude, position.coords.longitude),
      () => loadByCity("London")
    );
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="search-row">
        <input
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search city..."
          aria-label="Search city"
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
        <button className="secondary-button" type="button" onClick={handleLocation} disabled={!canUseLocation || loading}>
          Location
        </button>
      </div>
      {matches.length > 0 && (
        <div className="suggestions">
          {matches.map((match) => (
            <button
              type="button"
              key={match}
              onClick={() => {
                setCity(match);
                loadByCity(match);
                setMatches([]);
              }}
            >
              {match}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
