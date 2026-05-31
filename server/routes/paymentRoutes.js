import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Define Protected Routes under /api/payments
router.post("/checkout", protect, createOrder);
router.post("/verify", protect, verifyPayment);

export default router;