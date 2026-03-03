import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/db.js"
import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js"
import authRoutes from "./routes/authRoutes.js";

connectDB();
const app = express();

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the AI Fraud Detection API Gateway");
});

app.listen(5000, () => {
    console.log("server running on port 5000");
})
