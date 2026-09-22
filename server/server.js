import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://map-data-generator.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow if no origin (like mobile apps/curl) or matched allowedOrigins/hosting domains
      const isAllowedHost =
        origin && (origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com"));
      if (!origin || allowedOrigins.includes(origin) || isAllowedHost || (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Register Routes
import clientRoutes from "./routes/clientRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", clientRoutes);
app.use("/", leadRoutes);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT} 🚀`);
});