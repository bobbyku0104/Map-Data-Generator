import express from "express";

import protect from "../middleware/authMiddleware.js";

import User from "../models/User.js";

const router = express.Router();

router.post("/client-access", protect, async (req, res) => {
    try {
        // current logged in user
        const user = await User.findById(req.user.id);

        // Check if subscription is active
        if (user.subscriptionActive) {
            return res.status(200).json({ message: "Subscription active", leadLimit: user.leadLimit || 500 });
        }

        // first free access
        if (!user.freeUsed) {
            return res.status(200).json({ message: "Free access available", leadLimit: 25 });
        }        

        // second time
        return res.status(403).json({ message: "subscription required " });
    }
    catch (err) {
        console.error("Client access error:", err);
        res.status(500).json({ message: "server error" });
    }
})



export default router;
