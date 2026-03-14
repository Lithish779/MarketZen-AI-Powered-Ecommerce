const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");
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

run();
