const fs = require('fs');
const path = require('path');
const jimp = require('jimp-compact');

function generateAssets() {
  const targetDir = path.join(__dirname, '..', 'assets', 'images');
  const targetFile = path.join(targetDir, 'continent-vpn-logo.png');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    new jimp(512, 512, 0x05070AFF, (err, img) => {
      if (err) {
        console.error('[generate-assets] Jimp error:', err);
        return reject(err);
      }

      const cx = 256;
      const cy = 256;

      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Outer cyber ring with circuit gaps
          if (dist >= 216 && dist <= 232) {
            const modAngle = Math.abs(angle % (Math.PI / 2));
            if (modAngle > 0.15) {
              const alpha = Math.floor(255 * (1 - Math.abs(dist - 224) / 8));
              img.setPixelColor(jimp.rgbaToInt(0, 229, 255, alpha), x, y);
            }
          }

          // Middle segmented radar ring
          if (dist >= 175 && dist <= 185) {
            const modAngle = Math.abs(angle % (Math.PI / 4));
            if (modAngle > 0.1) {
              img.setPixelColor(jimp.rgbaToInt(22, 139, 255, 180), x, y);
            }
          }

          // Shield Guardian shape
          const sy = y - 130;
          if (sy >= 0 && sy <= 240) {
            let maxW = 130;
            if (sy < 70) {
              maxW = 120 + sy * 0.2;
            } else {
              const t = (sy - 70) / 170;
              maxW = 134 * (1 - Math.pow(t, 1.8));
            }

            const ax = Math.abs(dx);
            if (ax <= maxW) {
              if (ax >= maxW - 8 || sy <= 8) {
                img.setPixelColor(jimp.rgbaToInt(0, 229, 255, 255), x, y);
              } else {
                const innerRatio = 1 - (ax / maxW);
                const glow = Math.floor(60 * innerRatio);
                img.setPixelColor(jimp.rgbaToInt(7, 21, 37 + glow, 230), x, y);
              }
            }
          }

          // Core Reactor at center (Red / Cyan accent)
          if (dist <= 35) {
            if (dist <= 22) {
              const rGlow = Math.floor(255 * (1 - dist / 22));
              img.setPixelColor(jimp.rgbaToInt(255, 16, 24, rGlow), x, y);
            } else {
              img.setPixelColor(jimp.rgbaToInt(0, 229, 255, 240), x, y);
            }
          }
        }
      }

      img.write(targetFile, () => {
        console.log(`[generate-assets] Successfully materialized ${targetFile}`);
        resolve();
      });
    });
  });
}

generateAssets()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
