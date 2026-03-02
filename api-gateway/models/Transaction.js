import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionData: Object,
    risk_score: Number,
    is_fraud: Boolean,
    risk_level: String,
    summary: String,
    key_factors: [String],
    recommended_action: String
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);