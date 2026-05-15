import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Weather API is running" });
});

app.use("/api", weatherRoutes);
app.use("/api/history", historyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
