const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../assets/images');
const targetFile = path.join(targetDir, 'continent-vpn-logo.png');

function main() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 50000) {
    console.log('[generate-assets] Official CONTINENT VPN brand logo present at ' + targetFile + ' (' + fs.statSync(targetFile).size + ' bytes). Keeping official logo.');
    return;
  }

  if (!fs.existsSync(targetFile)) {
    console.error('[generate-assets] ERROR: Official CONTINENT VPN logo is missing at ' + targetFile);
    process.exit(1);
  }
}

main();
