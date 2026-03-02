import express from "express";
import {processTransaction} from "../controllers/transactionController.js";
import {getAllTransactions} from "../controllers/transactionController.js";
import {getFraudStats} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", processTransaction);
router.get("/", getAllTransactions);
router.get("/stats", getFraudStats);


export default router;