import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getFraudExplanation = async(transaction, riskData) => {
    const model = client.getGenerativeModel({model: "gemini-2.5-flash"});

    // const rawKey = process.env.GEMINI_API_KEY;
    // console.log("Key Length:", rawKey.length);
    // console.log("KEY Char codes:", rawKey.split("").map(c => c.charCodeAt(0)));

    const apiKey = process.env.GEMINI_API_KEY.trim();
    console.log("Trimmed Key Length:", apiKey);



    // console.log("API_KEY:", process.env.GEMINI_API_KEY);
    const prompt =`
    You are a draud detection specialist. Analyze the following transaction and its associated fraud risk score, and provide a detailed explanation of why this transaction might be considered fraudulent or not.

    Transaction Details:
    ${JSON.stringify(transaction, null, 2)}
    Fraud Risk Score: ${riskData.risk_score}
    is fraud risk score of ${riskData.is_fraud}


    Return your analysis in a Strict JSON format with the following fields:

    {
    "risk_level":"LOW|MEDIUM|HIGH|CRITICAL",
    "summary":"Short explanation",
    "key_factors":["factor1","factor2"],
    "recommendation":"Recommended action to take"
    }

    Do not include any explanations outside of the JSON object.
    `;

    const response = await axios.post(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,{
            contents:[
                {
                    "role":"user",
                    "parts":[{text:prompt}]
                }
            ]},
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        );

    const text = response.data.candidates[0].content.parts[0].text;
    const cleanText = text.replace(/```json|```/g, "").trim();
    console.log("Working...")
    return JSON.parse(cleanText);
    // return JSON.parse(text);
    // const result = await model.generateContent(prompt);
    // const response = result.response;
    // return response.text();
}