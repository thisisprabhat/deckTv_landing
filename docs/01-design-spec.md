# 01 · Design spec — DeckTV + DeckCam landing site

> Status: draft for review · 2026-10-25 · Publisher: WaygoSquad

## Goal
A premium, fast, SEO-friendly marketing site for two Android apps:

| App | Package (Play) | What it is |
|---|---|---|
| **DeckTV** | `com.waygosquad.decktv` | Minimal Android TV launcher with a built-in CCTV viewer. The TV can boot straight into the camera wall. |
| **DeckCam** | `com.waygosquad.deckcam` | The same camera viewer as a standalone app for Android TV, TV boxes, phones and tablets. No launcher. |

Canonical domain: `https://decktv.waygosquad.tech`. The fallback `decktv.waygosquad.com` 301-redirects to it at the host.

## Audience
1. **Shop and small-business owners**, the primary audience. They have a Hikvision/Dahua/CP Plus DVR, a cheap Android TV on the wall, and want the cameras on screen the moment the TV is switched on.
2. **Home users** who want the cameras on the living-room TV without the vendor's cloud app.
3. **Installers and integrators** who set up DVRs for clients and need a dependable TV client.
4. **Phone and tablet users**, who are served by DeckCam.

## Core message hierarchy
1. **Your TV is the control room.** (tagline, taken from the app)
2. **Switch on. Cameras on.** Set Camera as the start-up input and the TV boots straight into the full-screen camera view, with no remote needed.
3. Works with the DVR you already have, over your local network, with no cloud and no account.
4. Remote-first controls: digits jump to a camera, and the colour keys take snapshots, reconnect, change layout and listen.
5. Just want the cameras? Try **DeckCam**.

## Art direction: "the control room"
Dark, precise and calm, like a well-run security desk. The page should look like the product itself and avoid generic SaaS styling.

### Tokens (from `assets/branding/palette.json`, which matches the app's `ui/Theme.kt`)
```css
:root {
  --bg: #0B0D10;        /* page */
  --deep: #101318;      /* banner / plates */
  --surface: #171A1F;   /* cards */
  --surface-hi: #242830;
  --text: #F2F4F7;
  --text-dim: #9AA3AF;
  --accent: #5AC8FA;    /* DeckTV cyan */
  --live: #FF453A;      /* REC dot, Red key */
  --green: #32D74B;     /* Green key */
  --orange: #FF9F0A;    /* Yellow key (rendered orange in-app) */
  --rule: rgb(242 244 247 / .08);   /* hairline 1px */
  --rule-strong: rgb(242 244 247 / .16);
  --radius: 14px; --radius-lg: 24px;
}
```
The site is dark-first. There is no light theme: the product is a dark TV UI, and a light page would misrepresent it. `color-scheme: dark`.

### Typography
- **Outfit Variable**, the app's own font (OFL, `@fontsource-variable/outfit`). Display weights 300–500, with large thin numerals the way the app's clock is set. Body 400 at 17–18px.
- **JetBrains Mono**, used only for CCTV on-screen labels (`CAM 05 · 17:47:13`, `● REC`, `RTSP :554`) and key captions.
- Scale (clamp-based): display 64–112px, h2 40–56px, h3 22–28px, body 17px, small 14px, mono 12–13px with +0.06em tracking.

### Hairline language
- 1px `--rule` borders on every card, divider and table. No heavy shadows; depth comes from layered surfaces and a soft cyan glow on focus.
- `@lucasmarkes/hairline@0.5.1` isometric line figures stand in for icons where an idea needs an illustration:
  - `router` = DVR on your network
  - `padlock` = local and private
  - `phone` = DeckCam on mobile
  - custom `remote` (made with `/hairline-create`) = remote-first controls
- Figure theme: `--hairline-plate: var(--bg); --hairline-hi: var(--accent); --hairline-edge: rgb(242 244 247 / .7); --hairline-mid: rgb(242 244 247 / .35); --hairline-lo: rgb(242 244 247 / .15)`.
- Small inline icons are 1.25px-stroke line SVGs drawn in the same style. The chunky PNG icons from `assets/landing/icon-*.png` are not used.

### Signature moments
1. **Live hero TV.** A generated photo of a shop counter with a wall TV. The TV screen is live HTML laid over the photo with `matrix3d`, playing the real 9-up camera grid with a ticking mono timestamp and a pulsing REC dot. Keys **1–9** focus that camera full-screen and **0** returns to the grid, the same as the app's remote. A hint chip reads "Try it — press 1–9".
2. **Switch on. Cameras on.** A scroll-driven sequence: a black TV → a power LED → boot glow → the camera wall fades in, with no remote shown in the frame. The caption explains the start-up input.
3. **Interactive remote.** A hairline remote figure. Hovering or focusing each key lights it and shows its action from the in-app shortcut list.

## Page map

### `/`: DeckTV (home)
| # | Section | Content | Visual |
|---|---|---|---|
| 1 | Nav | Wordmark · Features · Boot-to-camera · DeckCam · Privacy · compact "Get it on Play" | sticky, blurred `--bg` at 80% |
| 2 | Hero (h1) | "Your TV is the control room." Sub-line: "DeckTV turns any Android TV into a live CCTV wall — and boots straight into your cameras, no remote needed." The DeckTV badge is primary and DeckCam secondary. | Live hero TV composite |
| 3 | Boot-to-camera | "Switch on. Cameras on." Start-up input: Camera / Home / HDMI / Live TV; Open on TV turn-on; Never sleep. A Xiaomi note. | power-on sequence |
| 4 | Problems → solutions | 10 cards, problem stated first, then the fix | hairline rules, numbered |
| 5 | Feature bento | Layouts · Live DVR view · Snapshots · Listen · Real home screen · Always on · Local & private | screenshots in TvFrame, hairline figures |
| 6 | Remote | Interactive remote + shortcut table | custom hairline remote |
| 7 | Works with your DVR | Brand list as mono text, with no vendor logos (trademarks) | marquee-free static grid |
| 8 | DeckCam | "Just want the cameras?" TV · phone · tablet; badge; link to `/deckcam` | phone/tablet composite + hairline `phone` |
| 9 | Specs | Android 9+, 1 GB RAM TVs, tested on Mi TV 4A Pro, LAN-only | definition list |
| 10 | FAQ | native `<details>` (also FAQPage JSON-LD) | — |
| 11 | CTA | Both badges | dark band with glow |
| 12 | Footer | Links · privacy (both) · © WaygoSquad · contact | — |

### `/deckcam`
Hero (TV and phone pair) → camera feature list → touch and remote controls → DeckTV vs DeckCam comparison table → FAQ → CTA.

### `/features`
Every feature of both apps, grouped (Start-up & always-on, Cameras & layouts, Streams & performance, Snapshots, Audio, Remote & touch, Home screen, Setup, Privacy), each group with an `id` anchor. This page is crawlable long-form content for SEO. Each item is tagged *DeckTV*, *DeckCam* or *Both*.

### `/privacy/decktv`, `/privacy/deckcam`
Readable prose layout (max 68ch), with a table of contents, effective date and contact.

### `/404`
A "No signal" CCTV tile with a link home.

## Play Store badges
- Google's official "Get it on Google Play" badge artwork, unmodified, at the minimum size or larger, with clear space around it. The app icon sits beside it in a hairline pill.
- Links: `https://play.google.com/store/apps/details?id=com.waygosquad.decktv` and `…id=com.waygosquad.deckcam`. They open in a new tab with `rel="noopener"` and carry `aria-label="Get DeckTV on Google Play"`.
- The nav uses a compact pill variant (icon + "Get DeckTV").

## Motion
- CSS scroll-driven animations (`animation-timeline: view()`) for reveals. If they aren't supported, an IntersectionObserver adds a class.
- Durations 200–600ms on `cubic-bezier(.2,.8,.2,1)`. The springy overshoot echoes the app's glass focus.
- Astro `<ClientRouter/>` view transitions between pages. The TV frame is a shared element (`transition:name="tv"`).
- `prefers-reduced-motion: reduce` turns off all reveals, the timestamp tick, the REC pulse and the boot sequence, which shows its final frame. Hairline figures hold still on their own.

## Accessibility
- WCAG 2.2 AA contrast. `--text-dim` on `--bg` is about 7.4:1, which passes.
- Visible focus ring: 2px `--accent` plus a 4px glow. A skip link. Landmarks.
- The keyboard camera shortcuts only act when focus isn't in a form field. They are announced through `aria-live="polite"` ("Camera 5, full view").
- Every image gets real alt text. Decorative composites use `alt=""` alongside a visible caption.

## Responsive
Breakpoints at 390 / 768 / 1024 / 1440. The hero composite crops toward the TV on mobile, and the bento collapses to one column. No horizontal scroll. Gutters are at least 16px.
