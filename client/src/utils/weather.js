export const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const formatTemperature = (value) => Math.round(value);

export const getWeatherEmoji = (condition = "") => {
  const normalized = condition.toLowerCase();

  if (normalized.includes("thunder")) return "⛈";
  if (normalized.includes("rain") || normalized.includes("drizzle")) return "🌧";
  if (normalized.includes("snow")) return "❄";
  if (normalized.includes("cloud")) return "☁";
  if (normalized.includes("mist") || normalized.includes("fog") || normalized.includes("haze")) return "🌫";
  if (normalized.includes("clear")) return "☀";
  return "🌤";
};

export const getWeatherMood = (weather) => {
  const condition = weather?.weather?.[0]?.main?.toLowerCase() || "clear";

  if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunder")) return "rainy";
  if (condition.includes("cloud")) return "cloudy";
  if (condition.includes("snow")) return "snowy";
  if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) return "misty";
  return "sunny";
};

export const getFiveDayForecast = (items = []) => {
  const groupedByDate = items.reduce((acc, item) => {
    const [date] = item.dt_txt.split(" ");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.entries(groupedByDate)
    .slice(0, 5)
    .map(([date, dayItems]) => {
      const midday = dayItems.find((item) => item.dt_txt.includes("12:00:00")) || dayItems[Math.floor(dayItems.length / 2)];
      const temps = dayItems.map((item) => item.main.temp);

      return {
        date,
        tempMin: Math.min(...temps),
        tempMax: Math.max(...temps),
        condition: midday.weather[0].description,
        icon: midday.weather[0].icon
      };
    });
};

export const formatDay = (date) =>
  new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
