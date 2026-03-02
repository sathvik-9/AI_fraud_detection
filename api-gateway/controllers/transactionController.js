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