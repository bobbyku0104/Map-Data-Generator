import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   freeUsed: {
      type: Boolean,
      default: false,
   },
   leadLimit: {
      type: Number,
      default: 0,
   },
   subscriptionPlan: {
      type: String,
      default: "free",
   },
   subscriptionActive: {
      type: Boolean,
      default: false,
   },
}, { timestamps: true });

export default mongoose.model("User", userSchema);