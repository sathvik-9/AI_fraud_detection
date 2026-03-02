import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test(){
    const model = client.getGenerativeModel({model: "gemini-2.5-flash", apiVersion: "v1"});
    console.log("API_KEY:", process.env.GEMINI_API_KEY);
    console.log("Model:", model);
    console.log("Version:", model.apiVersion);
    const result = await model.generateContent("Say 'Hello, world!' in a friendly tone");
    const response = result.response;
    console.log(response.text());
}

test();