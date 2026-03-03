import express from "express";
import {processTransaction} from "../controllers/transactionController.js";
import {getAllTransactions} from "../controllers/transactionController.js";
import {getFraudStats} from "../controllers/transactionController.js";
import {protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, processTransaction);
router.get("/", protect, getAllTransactions);
router.get("/stats", protect, getFraudStats);


export default router;