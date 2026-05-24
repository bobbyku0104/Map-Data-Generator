import express from "express";
import * as leadController from "../controllers/leadController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: Get leads by search query keyword
// GET /clients/:keyword
router.get("/clients/:keyword", protect, leadController.getLeads);

export default router;
