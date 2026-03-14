const https = require('https');

const apiKey = "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8";

function check(version) {
  return new Promise((resolve) => {
    https.get(`https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`, (res) => {
      let data = '';
      res.on('data', (d) => data += d);
      res.on('end', () => {
        console.log(`--- ${version} ---`);
        try {
          const json = JSON.parse(data);
          if (json.models) {
            json.models.forEach(m => console.log(`- ${m.name}`));
          } else {
            console.log("No models or error:", data);
          }
        } catch (e) {
          console.log("Parse error:", data);
        }
        resolve();
      });
    });
  });
}

(async () => {
  await check('v1beta');
  await check('v1');
})();
