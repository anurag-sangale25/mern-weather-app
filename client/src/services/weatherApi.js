const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const buildQuery = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
};

const request = async (path, params = {}) => {
  const query = buildQuery(params);
  const response = await fetch(`${API_BASE_URL}${path}${query ? `?${query}` : ""}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

export const fetchWeather = (params) => request("/api/weather", params);
export const fetchForecast = (params) => request("/api/forecast", params);
export const fetchHistory = () => request("/api/history");
