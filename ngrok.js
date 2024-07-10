const ngrok = require('ngrok');
const fs = require('fs');

(async function () {
    const url = await ngrok.connect(3000);
    console.log(`ngrok URL: ${url}`);

    // Update .env with ngrok URL
    fs.writeFileSync('.env', `NGROK_URL=${url}\n`, { flag: 'a' });

    // Keep the process alive to maintain ngrok tunnel
    process.stdin.resume();
})();
