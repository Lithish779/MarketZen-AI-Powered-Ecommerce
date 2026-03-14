const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");
  try {
    const models = await genAI.listModels(); // This should work if it's 0.24.1
    console.log("AUTHORIZED MODELS:");
    // models is an async iterator in some versions? No.
    // Let's check if it's a result object.
    const result = await genAI.listModels();
    if (result && result.models) {
      result.models.forEach(m => console.log(`- ${m.name}`));
    } else {
      console.log("No models in result:", result);
    }
  } catch (e) {
    console.error("List Models failed:", e.message);
  }
}

run();
