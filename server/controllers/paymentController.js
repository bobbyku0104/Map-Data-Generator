import razorpay from "../config/rozerpay.js";
import crypto from "crypto";
import User from "../models/User.js";

// Helper function to resolve plan details
const getPlanDetails = (plan) => {
  const normalized = plan.toLowerCase();
  switch (normalized) {
    case "starter":
      return { amount: 750 * 100, limit: 500 }; // ₹750 (75000 paise), 500 leads
    case "pro":
      return { amount: 2500 * 100, limit: 2500 }; // ₹2500 (250000 paise), 2500 leads
    case "enterprise":
      return { amount: 7500 * 100, limit: 999999 }; // ₹7500 (750000 paise), Unlimited leads
    default:
      return { amount: 750 * 100, limit: 500 };
  }
};

// @desc    Create a Razorpay order or fallback to mock sandbox order
// @route   POST /api/payments/checkout
// @access  Private
export async function createOrder(req, res) {
  try {
    const { plan } = req.body;
    if (!plan) {
      return res.status(400).json({ message: "Plan type is required" });
    }

    const { amount, limit } = getPlanDetails(plan);
    const hasKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

    if (!hasKeys) {
      return res.status(500).json({ message: "Razorpay credentials are not configured on the server." });
    }

    const options = {
      amount, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: req.user.id,
        plan,
      },
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID.trim(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
}

// @desc    Verify Razorpay signature & active user plan
// @route   POST /api/payments/verify
// @access  Private
export async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan parameter is required" });
    }

    const { limit } = getPlanDetails(plan);
    const userId = req.user.id;
    const hasKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

    if (!hasKeys) {
      return res.status(500).json({ message: "Razorpay credentials are not configured on the server." });
    }

    // Real Signature Verification Flow
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing required Razorpay parameters for verification" });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Razorpay signature verification failed." });
    }

    // Upgrade database states on valid real signature
    console.log(`Real Razorpay payment verified successfully for User: ${userId}, Plan: ${plan}`);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        freeUsed: false,
        subscriptionPlan: plan.toLowerCase(),
        subscriptionActive: true,
        leadLimit: limit,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Subscription activated successfully (${plan.toUpperCase()})!`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionActive: user.subscriptionActive,
        freeUsed: user.freeUsed,
        leadLimit: user.leadLimit,
      },
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Verification failed due to a server error." });
  }
}
