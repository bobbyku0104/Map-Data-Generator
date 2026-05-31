import Razorpay from "razorpay";
import dotenv from "dotenv";

// Trigger nodemon reload - Restored original keys
// Load environment variables immediately to support ESM import hoisting
dotenv.config();

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
    });
    console.log("Razorpay client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Razorpay instance:", error.message);
  }
} else {
  console.warn("Razorpay API key_id or key_secret is missing inside server/.env. Payment functions will run in Mock sandbox mode.");
}

export default razorpay;