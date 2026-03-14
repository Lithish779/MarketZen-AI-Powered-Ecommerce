import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

async function run() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY || "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8"}`);
    const data = await response.json();
    if (data.models) {
      console.log("AVAILABLE MODELS:");
      data.models.forEach(m => console.log(`- ${m.name}`));
    } else {
      console.log("No models found or error:", data);
    }
  } catch (e) {
    console.error("List failed:", e);
  }
}

run();
