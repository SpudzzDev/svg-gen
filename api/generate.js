const { createCanvas } = require('@napi-rs/canvas');

module.exports = (req, res) => {
  const { color = 'purple' } = req.query;

  const palettes = {
    purple: ["#2b003e", "#4c007d", "#7a1ca6", "#b86ccf", "#e7b8ff"],
    blue:   ["#001f3f", "#005f7f", "#008cba", "#7fdbff", "#d0f0ff"],
    green:  ["#013220", "#026440", "#04a66e", "#68d9a4", "#d1f5e0"],
    red:    ["#3b0000", "#7f0000", "#a60000", "#cf6c6c", "#ffd1d1"]
  };

  const waveColors = palettes[color] || palettes.purple;

  const canvas = createCanvas(1440, 800);
  const ctx = canvas.getContext('2d');

  // Fundo
  ctx.fillStyle = waveColors[4];
  ctx.fillRect(0, 0, 1440, 800);

  // Ondas em camadas
  for (let i = 0; i < waveColors.length; i++) {
    ctx.fillStyle = waveColors[i];
    ctx.globalAlpha = 1 - i * 0.15;
    ctx.fillRect(0, 700 - i * 100, 1440, 100);
  }

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
};