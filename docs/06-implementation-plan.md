# 06 · Implementation plan — DeckTV + DeckCam site

> **For agentic workers:** use superpowers:executing-plans (inline) or superpowers:subagent-driven-development. Steps use `- [ ]` checkboxes. Read docs 01–05 first; they are the spec.

**Goal:** a static Astro site at `websites/deckTv_landing` with the pages `/`, `/deckcam`, `/features`, `/privacy/decktv`, `/privacy/deckcam` and `/404`. It must be SEO-complete, use the hairline design language, have live screenshot composites in generated scenes, and carry Play badges for `com.waygosquad.decktv` / `com.waygosquad.deckcam`.

**Stack:** Astro 5 (static output, TS strict), `@astrojs/sitemap`, `@fontsource-variable/outfit`, `@fontsource/jetbrains-mono`, `@lucasmarkes/hairline@0.5.1`, sharp (bundled with Astro). There's no UI framework; client code is plain `<script>` islands.

**Skills used along the way:** frontend-design and ui-ux-pro-max (Tasks 7 and 10), hairline-create (Task 6), gemini-image-harvest (Task 4), claude-in-chrome and web-design-reviewer (Task 11), verification-before-completion (Task 11).

## File structure
```
astro.config.mjs        package.json        tsconfig.json
public/  robots.txt  site.webmanifest  favicon.ico  icons/*
scripts/ sync-assets.mjs  render-og.mjs  corners.html
src/
  data/       site.ts  features.ts  faq.ts  scenes.ts
  lib/        homography.ts  jsonld.ts
  styles/     tokens.css  global.css
  layouts/    Base.astro  Prose.astro
  components/ Seo.astro Nav.astro Footer.astro Section.astro PlayBadge.astro
              TvFrame.astro SceneComposite.astro CctvOverlay.astro
              HairlineFigure.astro FeatureCard.astro Faq.astro
  sections/   Hero.astro BootToCamera.astro Problems.astro Bento.astro
              Remote.astro Compat.astro DeckCamSection.astro Specs.astro Cta.astro
  figures/    remote.js            (custom hairline figure)
  assets/     screens/ brand/ badges/ scenes/ og/
  pages/      index.astro deckcam.astro features.astro 404.astro
              privacy/decktv.astro privacy/deckcam.astro
```

---

### Task 1: Scaffold
- [ ] `npm create astro@latest . -- --template minimal --typescript strict --no-git --install`
- [ ] `npm i @astrojs/sitemap @fontsource-variable/outfit @fontsource/jetbrains-mono @lucasmarkes/hairline@0.5.1`
- [ ] `npx skills add lucasmarkes/hairline` (installs the `hairline-create` / `hairline-adopt` skills)
- [ ] `astro.config.mjs`: `site` from `SITE_URL`, `integrations: [sitemap({ filter: p => !p.includes('404') })]`, `trailingSlash: 'never'`, `build: { format: 'file' }`, `image: { responsiveStyles: true }`
- [ ] `git init` + a `.gitignore` (node_modules, dist, `src/assets/scenes/raw`)
- [ ] **Check:** `npm run build` passes on the empty template

### Task 2: Tokens, base layout, data
- [ ] `src/styles/tokens.css`: the tokens from docs/01, the type scale with `clamp()`, the hairline variables
- [ ] `src/styles/global.css`: reset, `color-scheme: dark`, body background `--bg`, focus ring, `.rule`, `.card`, `.mono`, reveal utilities with `@supports (animation-timeline: view())` plus a reduced-motion override
- [ ] `src/data/site.ts`: `SITE_URL`, `PLAY = { decktv: 'https://play.google.com/store/apps/details?id=com.waygosquad.decktv', deckcam: '…id=com.waygosquad.deckcam' }`, `PUBLISHER = 'WaygoSquad'`, `CONTACT = 'thisisprabhatk@gmail.com'`
- [ ] `src/data/features.ts`: groups A–I and the problems from docs/03, typed `{ id, group, title, detail, tag: 'TV'|'CAM'|'BOTH', screen? }`
- [ ] `src/data/faq.ts`: the 8 Q&As from docs/04
- [ ] `src/components/Seo.astro` + `src/lib/jsonld.ts` (builders for Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList)
- [ ] `src/layouts/Base.astro`: Seo, font preload, `<ClientRouter/>`, skip link, Nav, `<main id="main">`, Footer
- [ ] **Check:** a blank page renders with the correct `<head>` (view-source)

### Task 3: Assets I (sync, icons, badges)
- [ ] `scripts/sync-assets.mjs`: copy the "Keep" list from docs/02 into `src/assets/screens` and `src/assets/brand`; favicons into `public/`. Use sharp to slice `12-camera-grid-9.png` into per-camera tiles (`cam-1…cam-7`) based on its layout
- [ ] `src/assets/brand/deckcam-icon.svg` from `ic_launcher_fg.xml` (docs/02 §4); export PNGs at 32/180/192/512
- [ ] Download Google's official "Get it on Google Play" badge into `src/assets/badges/`
- [ ] `package.json` script `"assets": "node scripts/sync-assets.mjs"`
- [ ] **Check:** `npm run assets` is idempotent and the files exist

### Task 4: Assets II (generated scenes and compositing)
- [ ] Use the gemini-image-harvest skill to generate S1–S5 with the prompts in docs/02 §2. Save the raw files to `src/assets/scenes/raw/` and the 2400w versions to `src/assets/scenes/`
- [ ] Review each scene. Regenerate if the screen has reflections or content, the angle is over 20°, or there's text or logos
- [ ] `scripts/corners.html`: click four corners to get the JSON. Record them in `src/data/scenes.ts`
- [ ] `src/lib/homography.ts`: 4-point → `matrix3d` (solve the 8×8 system), unit-tested against a known square → trapezoid
- [ ] `src/components/SceneComposite.astro`: `<Picture>` + `.screen` (1280×720 scaled by the ratio of the container to the scene width) with the build-time matrix, a slot for the screen content, and a glass reflection overlay
- [ ] `scripts/render-og.mjs`: render the per-page 1200×630 OG images (ImageMagick `-distort Perspective` if available, otherwise Playwright)
- [ ] **Check:** the composites line up at 390 / 768 / 1440 (screenshot overlay check)

### Task 5: Core components
- [ ] `PlayBadge.astro` with props `app`, `size: 'lg'|'sm'`, `variant: 'badge'|'pill'`. Official badge + app icon in a hairline pill; `target="_blank" rel="noopener"`; `aria-label`
- [ ] `TvFrame.astro`: a CSS bezel with a screen slot and an optional `transition:name`
- [ ] `CctvOverlay.astro`: mono timestamp (ticks once a second, frozen under reduced motion), `● REC`, camera label
- [ ] `Nav.astro` (sticky, blur, mobile sheet using `<details>`), `Footer.astro` (all pages + both policies, © WaygoSquad, contact), `Section.astro` (eyebrow, h2, lede, `aria-labelledby`)
- [ ] `FeatureCard.astro`, `Faq.astro` (native `<details>`)
- [ ] **Check:** a component gallery page in dev only (`src/pages/_dev.astro`, excluded from the build)

### Task 6: Hairline figures
- [ ] `HairlineFigure.astro` with props `figure: 'router'|'padlock'|'phone'|'remote'`, `label`, `intensity`, `play`. A client script imports the function, mounts it when an IntersectionObserver fires, and calls `destroy()` on `astro:before-swap`
- [ ] Theme tokens are set on the wrapper (docs/01), `theme: 'dark'`
- [ ] `/hairline-create "an Android TV remote: D-pad ring, OK, back/home, digits 0-9, four colour keys red/green/yellow/blue; pointer near a key presses it"`. Adapt the output into `src/figures/remote.js` with the same `(el, opts) → {update, destroy}` contract, and expose an `onKey` callback for the Remote section
- [ ] **Check:** figures respond to the pointer and sit still under reduced motion

### Task 7: Home page sections (load the frontend-design and ui-ux-pro-max skills first)
- [ ] `Hero.astro`: h1 + sub-line + both PlayBadges. S1 SceneComposite whose screen holds a 9-up grid made from the camera tiles, plus CctvOverlay. Key script: `1–9` → `.screen[data-focus=n]` (the tile scales to fill), `0`/`Escape` → grid. Ignored while focus is in an input. Announced through `aria-live`. Hint chip
- [ ] `BootToCamera.astro`: S2 composite; a scroll-driven sequence (off → LED → glow → `12-camera-grid-9`); three hairline steps "Start-up input: Camera / Open on TV turn-on / Never sleep"; a Xiaomi note
- [ ] `Problems.astro`: 12 numbered problem → solution cards from `features.ts`
- [ ] `Bento.astro`: 7 tiles (layouts with Mine/9/All tabs cycling 14/12/15; DVR + `router`; snapshots 17; listen 18; home 01/02; always on 05; private + `padlock`). Each links to `/features#…`
- [ ] `Remote.astro`: the remote figure and a shortcut table that highlights in sync
- [ ] `Compat.astro`: brand list (mono, hairline grid)
- [ ] `DeckCamSection.astro`: S4 composite, the `phone` figure, the DeckCam badge, a link to `/deckcam`
- [ ] `Specs.astro`, the FAQ (from `faq.ts`), `Cta.astro`
- [ ] `src/pages/index.astro` composes them, with Seo + JSON-LD (Org, WebSite, 2× SoftwareApplication, FAQPage)
- [ ] **Check:** the build passes and `/` looks right at three widths

### Task 8: `/deckcam` and `/features`
- [ ] `deckcam.astro`: hero (S4 + S5 or TvFrame + phone), feature list filtered to `BOTH|CAM`, touch and remote block, the comparison table from docs/03, a DeckCam FAQ subset, CTA. The TvFrame shares `transition:name="tv"` with the home page
- [ ] `features.ts` and `features.astro`: grouped sections with anchors (`#start-up`, `#cameras`, `#dvr`, `#streams`, `#snapshots`, `#audio`, `#remote`, `#home`, `#privacy`), tag chips, the problems list, and a sticky in-page TOC on desktop
- [ ] Seo + BreadcrumbList on both pages
- [ ] **Check:** anchors resolve and the view transition runs from `/` → `/deckcam`

### Task 9: Privacy pages
- [ ] `layouts/Prose.astro`: 68ch column, TOC, effective-date badge, hairline tables
- [ ] `privacy/decktv.astro` and `privacy/deckcam.astro` with the exact text from docs/05
- [ ] Seo (indexable) + BreadcrumbList + `WebPage.dateModified`
- [ ] **Check:** both pages are reachable from the footer of every page

### Task 10: Polish (load the frontend-design and ui-ux-pro-max skills)
- [ ] Design pass on spacing rhythm, type, hover/focus states and section transitions
- [ ] Check reduced motion and no-JS: content is complete, and the composites fall back to static OG-style renders through `<noscript>`
- [ ] `404.astro`: a "No signal" tile
- [ ] Font fallback metrics (`size-adjust`) to avoid CLS

### Task 11: Verify
- [ ] `npm run build` and `npm run preview`
- [ ] Claude in Chrome: screenshots of all 6 pages at 1440 / 768 / 390. Test keys 1–9/0, hairline interaction, the view transition, no horizontal scroll, keyboard tab order
- [ ] `grep -r "com.waygosquad.decktv\|com.waygosquad.deckcam" dist/` finds both on every page with badges
- [ ] `grep -L 'rel="canonical" href="https://decktv.waygosquad.tech' dist/**/*.html` returns nothing
- [ ] Sitemap lists the 5 indexable URLs. JSON-LD passes validator.schema.org
- [ ] `npx lighthouse http://localhost:4321/ --only-categories=performance,accessibility,best-practices,seo` scores ≥ 95 each on `/`, `/deckcam` and `/features`
- [ ] Run the web-design-reviewer skill and fix what it finds
- [ ] Report the results with evidence (scores, screenshots). Flag anything that is unmet

---

## Open items for the owner
- The app `applicationId`s are still `com.prabhat.decktv` / `com.prabhat.deckcam`. Rename them to `com.waygosquad.*` before publishing, or the badges will 404.
- Confirm the wording of the problem statements (docs/03) and the privacy text (docs/05).
- Deployment: a static host, plus the `.com` → `.tech` 301 redirect. Coolify is available if wanted.
