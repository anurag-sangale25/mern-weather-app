import express from "express";
import mongoose from "mongoose";
import SearchHistory from "../models/SearchHistory.js";
import { getCurrentWeather, getForecast } from "../utils/openWeather.js";

const router = express.Router();

const buildLocationParams = (query) => {
  const { city, lat, lon, units = "metric" } = query;
  const safeUnits = units === "imperial" ? "imperial" : "metric";

  if (city) {
    return { q: city.trim(), units: safeUnits };
  }

  if (lat && lon) {
    return { lat, lon, units: safeUnits };
  }

  const error = new Error("Provide a city name or latitude and longitude.");
  error.statusCode = 400;
  throw error;
};

const saveSearch = async (city) => {
  if (!city || mongoose.connection.readyState !== 1) {
    return;
  }

  await SearchHistory.create({
    city,
    date: new Date()
  });
};

router.get("/weather", async (req, res, next) => {
  try {
    const params = buildLocationParams(req.query);
    const data = await getCurrentWeather(params);

    await saveSearch(data.name);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 502);
    next(error);
  }
});

router.get("/forecast", async (req, res, next) => {
  try {
    const params = buildLocationParams(req.query);
    const data = await getForecast(params);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 502);
    next(error);
  }
});

export default router;
