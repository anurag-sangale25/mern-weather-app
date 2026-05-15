import { useWeather } from "../context/WeatherContext.jsx";
import { formatTemperature, getIconUrl, getWeatherEmoji } from "../utils/weather.js";

const WeatherCard = ({ weather }) => {
  const { unitSymbol } = useWeather();
  const condition = weather.weather[0];

  return (
    <article className="weather-card glass-card">
      <div className="weather-topline">
        <div>
          <p className="label">Current weather</p>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
        </div>
        <span className="weather-emoji" aria-hidden="true">
          {getWeatherEmoji(condition.main)}
        </span>
      </div>

      <div className="temperature-block">
        <img src={getIconUrl(condition.icon)} alt={condition.description} />
        <div>
          <strong>
            {formatTemperature(weather.main.temp)}°{unitSymbol}
          </strong>
          <span>{condition.description}</span>
        </div>
      </div>

      <div className="metrics-grid">
        <div>
          <span>Feels like</span>
          <strong>
            {formatTemperature(weather.main.feels_like)}°{unitSymbol}
          </strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>{weather.wind.speed} {unitSymbol === "C" ? "m/s" : "mph"}</strong>
        </div>
        <div>
          <span>Pressure</span>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
