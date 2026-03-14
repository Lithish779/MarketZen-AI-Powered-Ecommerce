import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");
  try {
    const models = await genAI.listModels();
    console.log("AUTHORIZED MODELS:");
    for (const model of models) {
      console.log(`- ${model.name}`);
    }
  } catch (e) {
    console.error("List Models failed:", e.message);
  }
}

listModels();
