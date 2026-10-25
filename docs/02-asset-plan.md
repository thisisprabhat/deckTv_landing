# 02 · Asset plan

Source of truth: `/Users/prabhatkumar/Projects/creations/apps/androidTvLauncher_Cam/assets/` (DeckTV) and `/Users/prabhatkumar/Projects/creations/apps/DeckCam/app/src/main/res/` (DeckCam). `scripts/sync-assets.mjs` copies the chosen files into `src/assets/`, so nothing in the site is hand-edited from the originals.

## 1. Audit: keep / skip

### Keep
| File | Used for | Why |
|---|---|---|
| `screenshots/01-home.png` | Hero idle state, Home-screen bento | Real UI, crisp 1280×720 |
| `screenshots/02-home-recent.png`, `03-home-scrolled.png` | Launcher feature | Shows recent/all apps |
| `screenshots/05-settings.png` | Always-on / start-up input | Settings proof |
| `screenshots/06-settings-dvr.png` | DVR setup feature | Address and credentials already redacted |
| `screenshots/07-settings-cameras.png` | Show/hide, aspect per camera | |
| `screenshots/11-settings-about-shortcuts.png` | Remote section reference | Shortcut copy |
| `screenshots/12-camera-grid-9.png` | **Hero live grid**, boot sequence end frame | Best camera-wall shot |
| `screenshots/13-camera-grid-controls.png` | Controls dock | |
| `screenshots/14-camera-grid-4.png`, `15-camera-layout-all.png`, `16-…-dock.png` | Layouts feature (tabs cycle Mine → 9 → All) | |
| `screenshots/17-snapshots-gallery.png` | Snapshots feature | |
| `screenshots/18-camera-audio-picker.png` | Listen feature | |
| `branding/icon.svg`, `icon-*.png`, `favicon.ico`, `icon-180.png` | DeckTV app icon, favicons, apple-touch | Vector-perfect |
| `branding/mark-transparent.svg` | Nav mark | |
| `branding/logo-horizontal.svg` | Footer / OG | |
| `branding/og-social-1200x630.png` | Fallback OG image until custom OG renders exist | |

The 9-up grid crops from `12` can also be sliced into separate camera tiles (with sharp) for the keyboard 1–9 focus effect. This gives each tile its own image, so a "full view" looks like a real zoom.

### Skip, with reasons
| File(s) | Reason |
|---|---|
| `landing/icon-*.png` | Chunky filled 256px tiles that clash with the hairline language. Replaced by hairline figures and 1.25px line icons. |
| `landing/feature-*.png` | Baked TV frames on a purple/teal gradient backdrop. The backdrops fight the page background and the frames are raster. We frame the raw screenshots in CSS and in real scenes instead. |
| `landing/hero-*.png` | Same baked gradient. Replaced by the generated scene + live composite. |
| `landing/bg-gradient-*.png` | Done in CSS (smaller, sharper). |
| `landing/cta-banner-2400x600.png`, `screenshot-sheet-2000x1800.png` | Not needed in this layout. |
| `branding/play-feature-graphic`, `tv-banner-*`, `twitter-header` | For the Play Console, not the site. |

## 2. Generate: lifestyle scenes (Gemini, via the `gemini-image-harvest` skill in the user's Chrome)

General rules for every prompt:
- 16:9, 2400×1350 or larger
- photoreal, natural light, shallow depth of field
- the **screen is switched on, but shows a flat, uniformly dark charcoal (#15181d) surface with no reflections or content**, so it can be composited cleanly
- the screen faces the camera at a mild angle (≤ 20°)
- no logos, no brand names, no readable text, no people's faces in focus
- a palette that suits the page: deep blues and warm practical lights

| ID | Scene | Use |
|---|---|---|
| S1 | A small, tidy Indian clothing/saree shop at evening. A 43-inch TV is wall-mounted above the billing counter, seen from the customer side, slightly below eye level. Warm shelf lights, colourful folded fabric out of focus. | **DeckTV hero** |
| S2 | A modern living room at night. A 55-inch TV on a low wooden console, a sofa edge in the foreground, a lamp glow, a dark teal wall. | Boot-to-camera section |
| S3 | A small office reception desk with a wall TV behind it, cool daylight, plants. | Problems / installers band |
| S4 | A hand holding a modern Android phone in landscape over a café table, with a blurred background. The screen faces the camera. | DeckCam section and `/deckcam` hero |
| S5 | An Android tablet on a desk stand beside a notebook and coffee, from the top-front, soft morning light. | `/deckcam` touch feature |

The skill saves the files to `src/assets/scenes/raw/` (originals, git-ignored if they're large) and the downscaled versions to `src/assets/scenes/`.

**Fallback:** if a scene doesn't composite well because the screen angle is off or there are reflections, regenerate it, or use the CSS `TvFrame` bezel for that section.

## 3. Compositing method
1. Measure the four screen corners of each scene in pixels (Chrome DevTools, or a small `scripts/corners.html` click-tool). Store them in `src/data/scenes.ts`:
   ```ts
   export const scenes = { s1: { src, w: 2400, h: 1350, corners: [[x,y],[x,y],[x,y],[x,y]] } }
   ```
2. `SceneComposite.astro` renders the photo with `<Picture>` and an absolutely positioned 1280×720 `<div class="screen">`. `transform: matrix3d(...)` is computed **at build time** from the corners with a homography (a small `src/lib/homography.ts`). The result is scaled as a percentage, so it stays aligned at every width.
3. The screen contents are live HTML: screenshot `<img>`s, the CCTV overlay (timestamp, REC) and the 1–9 focus behaviour. A subtle glass reflection gradient and `mix-blend-mode: screen` glow make it sit in the photo.
4. Static renders for the OG images and the no-JS / `<noscript>` fallback: `magick scene.png \( screen.png -distort Perspective '…' \) -composite out.png` if ImageMagick is installed. Otherwise a Playwright screenshot of the composite at 1200×630.

## 4. Generated vector assets
- **DeckCam icon** (`src/assets/brand/deckcam-icon.svg`): converted from `DeckCam/app/src/main/res/drawable/ic_launcher_fg.xml`. It is a cyan camera body (`M34,42h28…`) and a triangle (`M70,48l10,-6v24l-10,-6z`) on the same 108×108 `#101318` rounded plate (`rx=24`) as `branding/icon.svg`, so the two icons read as a family. PNG exports are 32/180/192/512.
- **DeckCam OG** (1200×630): an S4 composite, the DeckCam icon and the wordmark.
- **Per-page OG**: `/`, `/deckcam`, `/features` and the privacy pages (a simple template: icon, title, hairline rule).
- **Play badge**: Google's official "Get it on Google Play" badge (EN, SVG/PNG from Google's badge page) saved to `src/assets/badges/google-play-en.svg`, unmodified.
- **Hairline figures**: the library's `router`, `padlock` and `phone`, plus a custom `remote` figure made with `/hairline-create "an Android TV remote with D-pad, OK, digits 0-9 and four colour keys"`, saved to `src/figures/remote.js`.

## 5. Export and performance
- Astro `<Picture formats={['avif','webp']}>` with `widths=[640, 960, 1280, 1920, 2400]` and correct `sizes`.
- Hero: `loading="eager" fetchpriority="high"` and a preloaded AVIF. Everything else is `loading="lazy" decoding="async"`.
- Budget: hero image ≤ 220 KB AVIF at 1920w, each screenshot ≤ 80 KB, total page ≤ 1.5 MB.
- Every image gets explicit `width`/`height` (no CLS).
