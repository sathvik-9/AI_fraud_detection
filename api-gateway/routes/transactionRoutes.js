import express from "express";
import {processTransaction} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", processTransaction);


export default router;