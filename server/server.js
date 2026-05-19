import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Register Routes
app.use("/", leadRoutes);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});