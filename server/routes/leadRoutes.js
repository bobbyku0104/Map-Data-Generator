import express from "express";
import * as leadController from "../controllers/leadController.js";

const router = express.Router();

// Route: Get leads by search query keyword
// GET /api/clients/:keyword
router.get("/clients/:keyword", leadController.getLeads);

export default router;
