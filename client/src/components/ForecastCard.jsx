import { useWeather } from "../context/WeatherContext.jsx";
import { formatDay, formatTemperature, getIconUrl } from "../utils/weather.js";

const ForecastCard = ({ forecast }) => {
  const { unitSymbol } = useWeather();

  return (
    <article className="forecast-card">
      <span>{formatDay(forecast.date)}</span>
      <img src={getIconUrl(forecast.icon)} alt={forecast.condition} />
      <strong>
        {formatTemperature(forecast.tempMax)}° / {formatTemperature(forecast.tempMin)}°{unitSymbol}
      </strong>
      <p>{forecast.condition}</p>
    </article>
  );
};

export default ForecastCard;
