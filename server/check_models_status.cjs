const https = require('https');

const apiKey = "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8";
const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-1.5-pro"];

function checkModel(modelId) {
  return new Promise((resolve) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}?key=${apiKey}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`Model: ${modelId} | Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          console.log(`  Name: ${JSON.parse(data).name}`);
        }
        resolve();
      });
    }).on('error', (e) => {
      console.error(`Error checking ${modelId}:`, e.message);
      resolve();
    });
  });
}

(async () => {
  for (const model of models) {
    await checkModel(model);
  }
})();
