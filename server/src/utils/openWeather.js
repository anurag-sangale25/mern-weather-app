import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getApiKey = () => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "your_openweathermap_api_key") {
    const error = new Error("OpenWeatherMap API key is not configured.");
    error.statusCode = 500;
    throw error;
  }

  return apiKey;
};

const requestWeather = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        appid: getApiKey()
      },
      timeout: 10000
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      const notFound = new Error("City not found. Please check the spelling and try again.");
      notFound.statusCode = 404;
      throw notFound;
    }

    if (error.response?.data?.message) {
      const apiError = new Error(error.response.data.message);
      apiError.statusCode = error.response.status || 502;
      throw apiError;
    }

    throw new Error("Unable to reach the weather service. Please try again.");
  }
};

export const getCurrentWeather = (params) => requestWeather("weather", params);
export const getForecast = (params) => requestWeather("forecast", params);
