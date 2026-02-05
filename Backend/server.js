import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

// THIS IS IMPORTANT — prints every request in terminal
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// Connect DB with logging
connectDB()

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  logger.info("Health check hit: GET /");
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
