import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import ForecastCard from "./components/ForecastCard.jsx";
import Loader from "./components/Loader.jsx";
import RecentSearches from "./components/RecentSearches.jsx";
import { WeatherProvider, useWeather } from "./context/WeatherContext.jsx";

const Dashboard = () => {
  const { weather, forecast, loading, error, mood } = useWeather();

  return (
    <main className={`app-shell weather-${mood}`}>
      <section className="dashboard">
        <Navbar />

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Live weather dashboard</p>
            <h1>Plan your day with clear weather updates.</h1>
            <p className="hero-text">
              Search any city, use your current location, switch units, and view a simple 5-day forecast.
            </p>
          </div>

          <SearchBar />
        </section>

        {error && <div className="alert">{error}</div>}
        {loading && <Loader />}

        {!loading && weather && (
          <div className="content-grid">
            <WeatherCard weather={weather} />
            <RecentSearches />
          </div>
        )}

        {!loading && forecast.length > 0 && (
          <section className="forecast-section">
            <div className="section-heading">
              <span>5-day outlook</span>
              <strong>{weather?.name}</strong>
            </div>

            <div className="forecast-grid">
              {forecast.map((day) => (
                <ForecastCard key={day.date} forecast={day} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

const App = () => (
  <WeatherProvider>
    <Dashboard />
  </WeatherProvider>
);

export default App;
