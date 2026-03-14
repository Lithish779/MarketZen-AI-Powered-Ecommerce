const https = require('https');

const apiKey = "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8";
const tests = [
  { version: 'v1beta', model: 'gemini-1.5-flash' },
  { version: 'v1beta', model: 'gemini-1.5-flash-latest' },
  { version: 'v1beta', model: 'gemini-2.0-flash' },
  { version: 'v1beta', model: 'gemini-2.0-flash-exp' },
  { version: 'v1', model: 'gemini-1.5-flash' },
];

function checkModel(version, modelId) {
  return new Promise((resolve) => {
    const url = `https://generativelanguage.googleapis.com/${version}/models/${modelId}?key=${apiKey}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`Version: ${version} | Model: ${modelId} | Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
           console.log(`  Name: ${JSON.parse(data).name}`);
        } else {
           console.log(`  Error: ${data}`);
        }
        resolve();
      });
    }).on('error', (e) => {
      console.error(`Error:`, e.message);
      resolve();
    });
  });
}

(async () => {
  for (const test of tests) {
    await checkModel(test.version, test.model);
  }
})();
