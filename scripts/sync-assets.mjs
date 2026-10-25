import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DECKTV_ROOT = '/Users/prabhatkumar/Projects/creations/apps/androidTvLauncher_Cam';
const ASSETS_SRC = path.join(DECKTV_ROOT, 'assets');

const DIRS = [
  'src/assets/screens',
  'src/assets/brand',
  'src/assets/badges',
  'src/assets/tiles',
  'public/screens',
  'public/icons',
  'public/badges',
  'public/og',
  'public/tiles',
];

for (const dir of DIRS) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Syncing assets from:', ASSETS_SRC);

// 1. Copy Screenshots
const SCREENSHOTS = [
  '01-home.png',
  '02-home-recent.png',
  '03-home-scrolled.png',
  '05-settings.png',
  '06-settings-dvr.png',
  '07-settings-cameras.png',
  '11-settings-about-shortcuts.png',
  '12-camera-grid-9.png',
  '13-camera-grid-controls.png',
  '14-camera-grid-4.png',
  '15-camera-layout-all.png',
  '16-camera-layout-all-dock.png',
  '17-snapshots-gallery.png',
  '18-camera-audio-picker.png',
];

for (const shot of SCREENSHOTS) {
  const src = path.join(ASSETS_SRC, 'screenshots', shot);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join('src/assets/screens', shot));
    fs.copyFileSync(src, path.join('public/screens', shot));
    console.log(`Copied screen: ${shot}`);
  } else {
    console.warn(`Screen not found: ${src}`);
  }
}

// 2. Copy Branding Assets
const BRAND_FILES = [
  'icon.svg',
  'mark-transparent.svg',
  'logo-horizontal.svg',
  'favicon.ico',
  'icon-32.png',
  'icon-180.png',
  'icon-192.png',
  'icon-512.png',
  'og-social-1200x630.png',
];

for (const file of BRAND_FILES) {
  const src = path.join(ASSETS_SRC, 'branding', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join('src/assets/brand', file));
    if (file === 'favicon.ico') {
      fs.copyFileSync(src, path.join('public', file));
    }
    if (file.endsWith('.png')) {
      fs.copyFileSync(src, path.join('public/icons', file));
    }
    console.log(`Copied brand asset: ${file}`);
  }
}

// 3. Create DeckCam Vector Icon and Render Sizes
const DECKCAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="1024" height="1024">
  <rect width="108" height="108" rx="24" fill="#101318"/>
  <path fill="#5AC8FA" d="M34 42h28a5 5 0 0 1 5 5v14a5 5 0 0 1 -5 5h-28a5 5 0 0 1 -5 -5v-14a5 5 0 0 1 5 -5z"/>
  <path fill="#5AC8FA" d="M70 48l10 -6v24l-10 -6z"/>
  <circle cx="40" cy="46" r="2.4" fill="#FF453A"/>
</svg>`;

fs.writeFileSync('src/assets/brand/deckcam-icon.svg', DECKCAM_SVG);
fs.writeFileSync('public/icons/deckcam-icon.svg', DECKCAM_SVG);

// Render DeckCam PNG icons
const iconSizes = [32, 180, 192, 512];
for (const size of iconSizes) {
  await sharp(Buffer.from(DECKCAM_SVG))
    .resize(size, size)
    .png()
    .toFile(`public/icons/deckcam-icon-${size}.png`);
  fs.copyFileSync(`public/icons/deckcam-icon-${size}.png`, `src/assets/brand/deckcam-icon-${size}.png`);
  console.log(`Generated DeckCam icon ${size}x${size}`);
}

// 4. Official Google Play Badge SVG
const GOOGLE_PLAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 162" width="273" height="81">
  <rect width="546" height="162" rx="24" fill="#000000" stroke="#A6A6A6" stroke-width="2"/>
  <g transform="translate(36, 26)">
    <!-- Play logo -->
    <path fill="#00E676" d="M26.2 3.1c-1.3-.7-2.8-1.1-4.2-1.1-1.2 0-2.3.3-3.3.8L63.5 47.6 77 34.1 26.2 3.1z"/>
    <path fill="#FF3D00" d="M18.7 106.8c1 .5 2.1.8 3.3.8 1.4 0 2.9-.4 4.2-1.1l50.8-31-13.5-13.5-44.8 44.8z"/>
    <path fill="#FFC107" d="M91.8 42.6L77 34.1 63.5 47.6 77 61.1l14.8-8.5c4.7-2.7 4.7-7.3 0-10z"/>
    <path fill="#2979FF" d="M18.7 2.8C16.8 4.2 15.6 7 15.6 10.7v88.6c0 3.7 1.2 6.5 3.1 7.9l44.8-44.8L18.7 2.8z"/>
  </g>
  <g fill="#FFFFFF" font-family="'Outfit Variable', -apple-system, sans-serif">
    <text x="160" y="58" font-size="28" font-weight="500" letter-spacing="1">GET IT ON</text>
    <text x="160" y="114" font-size="52" font-weight="700" letter-spacing="0.5">Google Play</text>
  </g>
</svg>`;

fs.writeFileSync('src/assets/badges/google-play-badge.svg', GOOGLE_PLAY_SVG);
fs.writeFileSync('public/badges/google-play-badge.svg', GOOGLE_PLAY_SVG);

// 5. Slice 9-Up Grid into 9 camera tiles
const grid9Path = path.join(ASSETS_SRC, 'screenshots', '12-camera-grid-9.png');
if (fs.existsSync(grid9Path)) {
  const metadata = await sharp(grid9Path).metadata();
  console.log(`Grid 9 resolution: ${metadata.width}x${metadata.height}`);
  const w = metadata.width;
  const h = metadata.height;

  // 3 columns, 3 rows
  const tileW = Math.floor(w / 3);
  const tileH = Math.floor(h / 3);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = row * 3 + col + 1;
      const left = col * tileW;
      const top = row * tileH;
      await sharp(grid9Path)
        .extract({ left, top, width: tileW, height: tileH })
        .png()
        .toFile(`public/tiles/cam-${idx}.png`);
      fs.copyFileSync(`public/tiles/cam-${idx}.png`, `src/assets/tiles/cam-${idx}.png`);
    }
  }
  console.log('Sliced 9 camera tiles from 12-camera-grid-9.png');
}

// 6. Generate crisp OG Images
const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const renderOg = async (title, subtitle, filename) => {
  const width = 1200;
  const height = 630;
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#0B0D10"/>
    <defs>
      <radialGradient id="glow" cx="60%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#5AC8FA" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#0B0D10" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#glow)"/>
    <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="rgba(242,244,247,0.12)" stroke-width="2"/>
    <g transform="translate(100, 120)">
      <text fill="#5AC8FA" font-family="'JetBrains Mono', monospace" font-size="22" letter-spacing="4">WAYGOSQUAD · ANDROID TV</text>
      <text y="90" fill="#F2F4F7" font-family="'Outfit', sans-serif" font-size="72" font-weight="600" letter-spacing="-1">${safeTitle}</text>
      <text y="170" fill="#9AA3AF" font-family="'Outfit', sans-serif" font-size="32" font-weight="400">${safeSubtitle}</text>
      <rect y="240" width="60" height="4" fill="#5AC8FA" rx="2"/>
      <g transform="translate(0, 280)">
        <circle cx="12" cy="12" r="8" fill="#FF453A"/>
        <text x="32" y="18" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="18" letter-spacing="2">LIVE CONTROL ROOM · BOOT TO CAMERA</text>
      </g>
    </g>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(`public/og/${filename}`);
  console.log(`Generated OG: ${filename}`);
};

await renderOg('DeckTV', 'Turn any Android TV into a live CCTV wall.', 'og-decktv.png');
await renderOg('DeckCam', 'Dedicated CCTV & DVR viewer for Android TV & mobile.', 'og-deckcam.png');
await renderOg('DeckTV Features', 'Complete specifications, layouts and remote controls.', 'og-features.png');
await renderOg('Privacy Policy', '100% Local · No Accounts · Keystore Encrypted.', 'og-privacy.png');

console.log('Asset synchronization complete!');
