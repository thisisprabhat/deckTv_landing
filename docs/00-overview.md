# DeckTV + DeckCam landing site — plan

## Context
DeckTV (`apps/androidTvLauncher_Cam`) is a minimal Android TV launcher with a built-in CCTV viewer. DeckCam (`apps/DeckCam`) is the same viewer as a standalone app for TVs, phones, tablets and TV boxes, without the launcher. Both need a premium, SEO-friendly marketing site in `websites/deckTv_landing`, which is empty today. It should have:
- Google Play badges for `com.waygosquad.decktv` and `com.waygosquad.deckcam`
- a complete feature list and the problems each app solves
- a privacy policy page for each app
- high-quality visuals
- a lead message: **set Camera as the start-up input and the TV boots straight into the camera wall, with no remote needed.**

**Decisions:**
- Stack: Astro (static).
- Layout: DeckTV-led home page, a large DeckCam section, and a separate `/deckcam` page.
- Footage: real CCTV footage used as-is.
- Domain: canonical `https://decktv.waygosquad.tech`, with `decktv.waygosquad.com` as a fallback that 301-redirects at the host.
- Publisher: **WaygoSquad**, contact thisisprabhatk@gmail.com.
- Imagery: Gemini-generated lifestyle scenes with the real screenshots composited onto them.

## Step 0: write the plan docs to `./docs/` (first deliverable)
| File | Contents |
|---|---|
| `docs/01-design-spec.md` | Art direction, tokens, page map, motion and accessibility rules |
| `docs/02-asset-plan.md` | Asset audit (what's kept and skipped, and why), Gemini scene prompts, compositing method, export formats |
| `docs/03-features-and-problems.md` | The full feature inventory for both apps and the problem → solution list (below) |
| `docs/04-seo-plan.md` | Metadata, structured data, keyword targets, crawlability, performance budget |
| `docs/05-privacy-policies.md` | Draft policy text for both apps, based on the manifests and code |
| `docs/06-implementation-plan.md` | Checkbox task list (Tasks 1–11) in superpowers writing-plans format |

## Content, taken from the source code (detail goes in docs/03)

**Start-up input / boot-to-camera:** this comes from `launcher/StartSource.kt`. Settings → Start-up input offers Camera, Home screen, each HDMI/AV input, and Live TV. "The checked input opens when the TV turns on", and Camera is the default after installation. With "Open DeckTV when the TV turns on" and "Never sleep" also on, the TV powers on into the full-screen camera view with no remote needed. On Xiaomi TVs, DeckTV also switches off the firmware's `set_auto_play`, so Live TV no longer grabs the screen at power-on. This becomes a dedicated home section ("Switch on. Cameras on.") with a power → camera-wall animation, and it is repeated in the hero sub-line and the FAQ.

**DeckTV features:**
- **Launcher:** glass-focus home screen with a greeting and clock; Now playing and Last played; recent and frequently used apps; all apps; hide apps; a dock you can reorder, add to and remove from; a Live TV app shortcut; the HDMI input list; a clock screensaver; motion levels (Full/Reduced); return to DeckTV after standby; Never sleep.
- **Setup:** one-press "Allow everything" grants through the TV's own debugging connection, with no computer needed. Runs on 1 GB RAM TVs (Android 9+).

**Camera features (shared by both apps):**
- **Brands:** Hikvision/HiLook/LTS/Annke, Dahua/CP Plus/Amcrest/Lorex, Uniview, TVT/Provision, XMEye, generic RTSP, plus auto-detect.
- **Setup:** channel auto-discovery; 1–64 cameras; RTSP path presets with placeholders; test connection; HTTPS option; demo mode with eight illustrated cameras.
- **Streams:** SD sub-streams in grids, HD main stream in full view with SD fallback, and a cap on simultaneous streams (extra tiles pause).
- **Layouts and tiles:** My Selection (4), 9-up, All, Single and Primary-enlarged; drag to reorder tiles; per-camera aspect ratio; show/hide cameras.
- **Snapshots:** one press, or "Snapshot all", saved as PNG to `Pictures/CamDeck`, with a gallery to browse and delete.
- **Listen:** hear any camera with its own volume.
- **Remote:** digits jump to a camera, OK opens full view, hold OK opens the menu, CH± pages, the colour keys are Snapshot all / Reconnect all / Next layout / Listen, plus air mouse.
- **Privacy:** the password is encrypted with an Android Keystore key.

**DeckCam extras:** touch support on phones and tablets; no launcher permissions at all; keep the screen awake; overlay auto-hide timeout; double-BACK to exit.

**Problems it solves (drafted from the code; the user should confirm the wording):**
1. The cameras should be on the TV the moment it's switched on, without anyone hunting for a remote, switching input and opening an app → boot-to-camera.
2. The DVR's own HDMI output needs a cable run and a USB mouse → the TV streams over the LAN.
3. Vendor apps are phone-first, need a cloud login and work poorly with a D-pad → a local, remote-first TV UI.
4. Cheap 1 GB TVs choke on many HD streams → SD grids, HD on demand, a stream cap.
5. The TV sleeps or the screensaver covers the camera wall → Never sleep.
6. Mixed DVR brands and cryptic RTSP URLs → presets plus auto-detect.
7. Evidence needs to be captured fast → one-key snapshot and Snapshot all.
8. The heavy stock launcher has ads → a minimal launcher that keeps the apps.
9. Privacy worries about cloud CCTV → local network only, no account, no analytics.
10. Someone wants only the cameras, on a phone or tablet → DeckCam.

## Site map and pages
- **`/`**, the DeckTV home page, in this order:
  1. Nav
  2. Hero with both Play badges
  3. Boot-to-camera section
  4. Problem → solution grid
  5. Feature bento
  6. Interactive remote (hairline)
  7. Brand compatibility
  8. DeckCam section
  9. Specs
  10. FAQ
  11. CTA
  12. Footer
- **`/deckcam`**: hero (TV and phone pair), the feature list, a DeckTV vs DeckCam comparison table, FAQ and CTA.
- **`/features`**: every feature of both apps as a crawlable list, grouped and anchor-linked. This is the main SEO long-tail page.
- **`/privacy/decktv`** and **`/privacy/deckcam`**: policy pages, linked from the footer and usable as the Play Console privacy URL.
- **`404`**, `robots.txt`, `sitemap-index.xml`.

## Art direction: "the control room"
- **Palette:** `assets/branding/palette.json`, which matches the app's Theme.kt. bg `#0B0D10`, surface `#171A1F`/`#242830`, text `#F2F4F7`/`#9AA3AF`, cyan `#5AC8FA`, live red `#FF453A`, plus green and orange for the colour keys. Dark-first.
- **Type:** Outfit (the app's font, OFL, `@fontsource-variable/outfit`) for everything, with JetBrains Mono for CCTV on-screen labels (`CAM 05 · 17:47:13`, `● REC`).
- **Hairline language:** 1px low-alpha rules, hairline cards, and `@lucasmarkes/hairline@0.5.1` figures (`router` for the DVR connection, `padlock` for privacy, `phone` for DeckCam). The theme tokens `--hairline-plate:#0B0D10; --hairline-hi:#5AC8FA` match the page. A custom TV-remote figure is made with `/hairline-create`.
- **Signature moment:** a hero TV, either generated or a CSS bezel, playing the real 9-up grid with a ticking mono timestamp and a REC dot. Keys **1–9** focus that camera and **0** returns to the grid, the same as the app's remote.
- **Motion:** CSS scroll-driven reveals; the power-on → camera-wall sequence in the boot section; Astro `<ClientRouter/>` view transitions. `prefers-reduced-motion` is fully honoured.

## Assets (detail goes in docs/02)
- **Keep:** the raw `screenshots/*.png` (1280×720, real UI), `branding/icon.svg`, `mark-transparent.svg`, `logo-horizontal.svg`, the favicon set, `og-social-1200x630.png`.
- **Skip:** the chunky `landing/icon-*.png` (replaced by hairline figures and inline line icons), the baked `feature-*` mockups (their gradient backdrops clash), `bg-gradient-*`, `cta-banner`, `screenshot-sheet`.
- **Generate with Gemini** using the gemini-image-harvest skill in the user's Chrome, five 16:9 photoreal scenes, each with a dark, evenly lit screen surface for compositing:
  1. a shop counter with a wall TV (the DeckTV hero)
  2. an evening living room
  3. a small office reception
  4. a hand holding a phone in landscape (DeckCam)
  5. a tablet on a desk
- **Composite:** place each screenshot with CSS `matrix3d` from four measured screen corners. The screen stays live HTML, so the grid can animate on the photo. Static fallbacks and OG images come from an ImageMagick `-distort Perspective` render, or a Playwright capture if ImageMagick isn't installed.
- **Generate as SVG:** a DeckCam icon converted from `DeckCam/.../drawable/ic_launcher_fg.xml` (on a `#101318` plate, the same grammar as the DeckTV icon), DeckCam OG and Play badge artwork using Google's official "Get it on Google Play" badge.
- `scripts/sync-assets.mjs` copies the chosen files from the app repos, so the repos stay the source of truth. Astro `<Picture>` exports AVIF and WebP with `srcset`.

## SEO (detail goes in docs/04)
- `site: 'https://decktv.waygosquad.tech'` in `astro.config.mjs`, set from one `SITE_URL` constant.
- `src/components/Seo.astro` gives each page a unique title and description, a canonical URL, OG/Twitter cards with a per-page 1200×630 image, `theme-color` and the manifest.
- JSON-LD:
  - a `SoftwareApplication` for each app (`operatingSystem: Android`, `applicationCategory: MultimediaApplication`, `downloadUrl` = the Play URL, `publisher` = WaygoSquad)
  - an `Organization`
  - a `FAQPage` on `/` and `/deckcam`
  - a `BreadcrumbList` on the sub-pages
- `@astrojs/sitemap` and `robots.txt`; semantic landmarks; one `h1` per page; descriptive alt text; internal links between `/`, `/features`, `/deckcam` and the privacy pages.
- **Keyword targets:** "Android TV CCTV viewer", "Hikvision / Dahua on Android TV", "DVR viewer for TV", "RTSP camera viewer Android TV", "TV boots into CCTV", "Android TV launcher for shops".
- **Performance budget:** LCP < 2.0 s, CLS < 0.05, under 1.5 MB per page, zero JS except the islands, preloaded hero AVIF, `font-display: swap`.

## Privacy policies (detail goes in docs/05)
The facts come from the manifests and code:
- No analytics, ads, crash or cloud SDKs; the dependencies are only Compose, Media3 and coroutines.
- No account.
- Network traffic goes only to the DVR or camera address the user enters.
- The password is encrypted with an Android Keystore key, and `allowBackup=false`.
- Snapshots stay on the device in `Pictures/CamDeck`.
- Nothing is collected or shared, and the policy says this in Data-safety-aligned language.

**DeckTV** also explains each sensitive permission and that all of them are processed on the device only:
- QUERY_ALL_PACKAGES (it's a launcher)
- usage access (recent apps)
- notification listener (Now playing)
- WRITE_SECURE_SETTINGS (Never sleep and the power-on input)
- SYSTEM_ALERT_WINDOW (return to front)
- RECEIVE_BOOT_COMPLETED

**DeckCam** has only INTERNET and network state. Both policies carry an effective date of 2026-10-25, the contact, and a children's section. Both pages are shown in a readable prose layout.

## Implementation tasks (mirrored in docs/06)
1. **Scaffold:** `npm create astro@latest` (minimal, TS). Add `@astrojs/sitemap`, the fontsource packages and `@lucasmarkes/hairline@0.5.1`. Install the skill with `npx skills add lucasmarkes/hairline`.
2. **Tokens:** `src/styles/tokens.css` and `global.css`; `src/layouts/Base.astro` (Seo, ClientRouter, skip link); `src/data/site.ts` (SITE_URL, Play URLs, contact); `src/data/features.ts` (one source for the feature and problem lists used by `/`, `/features` and `/deckcam`).
3. **Assets I:** `scripts/sync-assets.mjs`, the DeckCam icon, the Play badges.
4. **Assets II:** generate the Gemini scenes, measure the screen corners, write `src/components/SceneComposite.astro` (matrix3d), render static fallbacks and OG images.
5. **Core components:** `TvFrame`, `PlayBadge` (official badge, app icon, `https://play.google.com/store/apps/details?id=com.waygosquad.<app>`), `Nav`, `Footer`, `Section`, `Seo`.
6. **Hairline:** `HairlineFigure.astro`, which lazy-mounts through an IntersectionObserver; the custom remote figure goes in `src/figures/remote.js`.
7. **Home sections:** Hero with the 1–9 key script; BootToCamera; Problems; Bento; Remote; Compat; DeckCamSection; Specs; FAQ; CTA.
8. **Pages:** `/deckcam` (comparison table, shared-element transition) and `/features`.
9. **Privacy pages:** `src/layouts/Prose.astro`, `/privacy/decktv` and `/privacy/deckcam`.
10. **Polish:** a design pass with the frontend-design and ui-ux-pro-max skills; reduced motion; 404 page.
11. **Verify** (below), then fix issues with the web-design-reviewer skill.

## Verification
- `npm run build` runs cleanly and `npm run preview` serves the site.
- Claude in Chrome: screenshots of every page at 1440, 768 and 390 widths. Checks: keys 1–9 and 0 work, hairline figures react to the pointer, the composites line up with the screens, there's no horizontal scroll, and view transitions run.
- `grep` on `dist/` confirms both Play IDs, the canonical URLs on `decktv.waygosquad.tech`, the JSON-LD on each page, and that the sitemap lists all six URLs. The JSON-LD also passes the schema.org validator.
- `npx lighthouse` on `/`, `/deckcam` and `/features` scores ≥95 for Performance, Accessibility, Best Practices and SEO.
- With reduced motion emulated, the page stays static and readable. Tab order shows visible focus rings.

## Notes and follow-ups
- ⚠️ The code's `applicationId` is `com.prabhat.decktv` / `com.prabhat.deckcam`, while the site uses `com.waygosquad.*` as requested. The apps need renaming before they are published.
- The `.com` → `.tech` 301 redirect and the deployment (Coolify is available) are host-level and out of scope.
