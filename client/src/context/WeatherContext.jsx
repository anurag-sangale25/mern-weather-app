import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchForecast, fetchHistory, fetchWeather } from "../services/weatherApi.js";
import { getFiveDayForecast, getWeatherMood } from "../utils/weather.js";

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState(() => localStorage.getItem("weather-unit") || "metric");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("weather-theme") === "dark");

  const unitSymbol = unit === "metric" ? "C" : "F";

  const loadHistory = useCallback(async () => {
    try {
      const searches = await fetchHistory();
      setHistory(searches);
    } catch {
      setHistory([]);
    }
  }, []);

  const loadWeather = useCallback(
    async (location) => {
      setLoading(true);
      setError("");

      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchWeather({ ...location, units: unit }),
          fetchForecast({ ...location, units: unit })
        ]);

        setWeather(weatherData);
        setForecast(getFiveDayForecast(forecastData.list));
        await loadHistory();
      } catch (err) {
        setError(err.message || "Unable to load weather right now.");
      } finally {
        setLoading(false);
      }
    },
    [loadHistory, unit]
  );

  const loadByCity = useCallback(
    (city) => {
      const trimmedCity = city.trim();
      if (!trimmedCity) {
        setError("Please enter a city name.");
        return;
      }

      loadWeather({ city: trimmedCity });
    },
    [loadWeather]
  );

  const loadByCoordinates = useCallback(
    (lat, lon) => {
      loadWeather({ lat, lon });
    },
    [loadWeather]
  );

  useEffect(() => {
    localStorage.setItem("weather-unit", unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem("weather-theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (!navigator.geolocation) {
      loadByCity("London");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadByCoordinates(position.coords.latitude, position.coords.longitude);
      },
      () => {
        loadByCity("London");
      },
      {
        timeout: 7000,
        maximumAge: 300000
      }
    );
  }, []);

  useEffect(() => {
    if (weather) {
      loadWeather({ city: weather.name });
    }
  }, [unit]);

  const value = useMemo(
    () => ({
      weather,
      forecast,
      history,
      loading,
      error,
      unit,
      unitSymbol,
      darkMode,
      mood: getWeatherMood(weather),
      loadByCity,
      loadByCoordinates,
      setUnit,
      setDarkMode
    }),
    [weather, forecast, history, loading, error, unit, unitSymbol, darkMode, loadByCity, loadByCoordinates]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used inside WeatherProvider");
  }

  return context;
};
