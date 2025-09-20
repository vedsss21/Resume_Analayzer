import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Export as default so other files can import it as "client"
export default model;
