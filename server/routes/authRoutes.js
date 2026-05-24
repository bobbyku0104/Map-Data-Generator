import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: Register a user
// POST /api/auth/register
router.post("/register", registerUser);

// Route: Login a user
// POST /api/auth/login
router.post("/login", loginUser);

// Route: Logout a user
// POST /api/auth/logout
router.post("/logout", logoutUser);

// Route: Get current user profile (for verification/session checking)
// GET /api/auth/me
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
