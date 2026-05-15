import express from "express";
import mongoose from "mongoose";
import SearchHistory from "../models/SearchHistory.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const searches = await SearchHistory.find({})
      .sort({ date: -1 })
      .limit(5)
      .lean();

    res.json(searches);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
