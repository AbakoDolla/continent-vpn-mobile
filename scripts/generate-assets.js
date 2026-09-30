const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function generatePng(width, height) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const scanlineLength = width * 4;
  const rawData = Buffer.alloc(height * (scanlineLength + 1));
  const cx = width / 2;
  const cy = height / 2;

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData.writeUInt8(0, offset++); // Filter: None
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let r = 5, g = 7, b = 10, a = 255; // #05070A

      // Outer cyber ring
      if (dist >= 210 && dist <= 226) {
        r = 0; g = 229; b = 255; a = 255;
      }
      // Inner radar ring
      else if (dist >= 170 && dist <= 180) {
        r = 22; g = 139; b = 255; a = 200;
      }
      // Shield
      else if (y >= 130 && y <= 370) {
        const sy = y - 130;
        let maxW = sy < 70 ? 120 + sy * 0.2 : 134 * (1 - Math.pow((sy - 70) / 170, 1.8));
        const ax = Math.abs(dx);
        if (ax <= maxW) {
          if (ax >= maxW - 8 || sy <= 8) {
            r = 0; g = 229; b = 255; a = 255;
          } else {
            const glow = Math.floor(60 * (1 - ax / maxW));
            r = 7; g = 21; b = 37 + glow; a = 240;
          }
        }
      }

      // Red Core
      if (dist <= 30) {
        if (dist <= 18) {
          r = 255; g = 16; b = 24; a = 255;
        } else {
          r = 0; g = 229; b = 255; a = 255;
        }
      }

      rawData.writeUInt8(r, offset++);
      rawData.writeUInt8(g, offset++);
      rawData.writeUInt8(b, offset++);
      rawData.writeUInt8(a, offset++);
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function main() {
  const dir = path.join(__dirname, '..', 'assets', 'images');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const targetFile = path.join(dir, 'continent-vpn-logo.png');
  const pngBuf = generatePng(512, 512);
  fs.writeFileSync(targetFile, pngBuf);
  console.log(`[generate-assets] Generated ${targetFile} (${pngBuf.length} bytes) using pure Node.js`);
}

main();
