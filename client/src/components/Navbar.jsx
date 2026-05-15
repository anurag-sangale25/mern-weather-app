import { useWeather } from "../context/WeatherContext.jsx";

const Navbar = () => {
  const { darkMode, setDarkMode, unit, setUnit } = useWeather();

  const unitLabel = unit === "metric" ? "\u00B0C" : "\u00B0F";
  const themeLabel = darkMode ? "Light" : "Dark";

  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-mark">WF</span>
        <div>
          <span className="brand-name">WeatherFlow</span>
          <small>Forecast center</small>
        </div>
      </div>

      <div className="nav-controls">
        <button
          className="segmented-button"
          type="button"
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          aria-label="Toggle temperature unit"
        >
          {unitLabel}
        </button>

        <button
          className="icon-button"
          type="button"
          onClick={() => setDarkMode((value) => !value)}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {themeLabel}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
