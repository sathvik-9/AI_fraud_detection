import { getFraudRisk } from "../services/mlServices.js";
import { getFraudExplanation } from "../services/llmServices.js";
import Transaction from "../models/Transaction.js";

export const processTransaction = async (req, res) => {
    try{
        const transactionData = req.body;
        const fraudRisk = await getFraudRisk(transactionData);
        const aiAnalysis = await getFraudExplanation(transactionData, fraudRisk);
        const savedTransaction = await Transaction.create({
            transactionData,
            risk_score: fraudRisk.risk_score,
            is_fraud: fraudRisk.is_fraud,
            risk_level: aiAnalysis.risk_level,
            summary: aiAnalysis.summary,
            key_factors: aiAnalysis.key_factors,
            recommended_action: aiAnalysis.recommended_action
        });

        res.json({
            id: savedTransaction._id,
            fraudRisk,
            aiAnalysis
        });
    }
    catch(error){
        console.error("Full Error:", error.response?.data || error.message);
        res.status(500).json({error: "Error processing transaction"});
    }
}

export const getAllTransactions = async (req, res) =>{
    try{
        const transactions = await Transaction.find().sort({createdAt: -1});
        res.json(transactions);
    }
    catch(error){
        console.log("Error fetching transactions:", error);
        res.status(500).json({error: "Error fetching transactions"});
    }
}

export const getFraudStats = async (req, res) =>{
    try{
        const total = await Transaction.countDocuments();
        const fraud_count = await Transaction.countDocuments({is_fraud:true});
        const high_risk = await Transaction.countDocuments({risk_level: "HIGH"});
        res.json({
            total_transacitons: total,
            fraud_transactions: fraud_count,
            fraud_percentage: total > 0 ? ((fraud_count/total)*100).toFixed(2) : 0,
            high_risk: high_risk,
        })
    }
    catch(error){
        console.error("Error fetching fraud status:", error);
    }
}