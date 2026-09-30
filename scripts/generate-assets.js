const fs = require('fs');
const path = require('path');

function generateAssets() {
  const base64File = path.join(__dirname, 'logo.base64');
  const targetDir = path.join(__dirname, '..', 'assets', 'images');
  const targetFile = path.join(targetDir, 'continent-vpn-logo.png');

  if (!fs.existsSync(base64File)) {
    console.warn('[generate-assets] Warning: scripts/logo.base64 not found.');
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const base64Content = fs.readFileSync(base64File, 'utf8').trim();
  const buffer = Buffer.from(base64Content, 'base64');
  fs.writeFileSync(targetFile, buffer);
  console.log(`[generate-assets] Successfully materialized continent-vpn-logo.png (${buffer.length} bytes)`);
}

generateAssets();
