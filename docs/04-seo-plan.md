# 04 · SEO plan

## Site config
- `astro.config.mjs`: `site: SITE_URL`, where `SITE_URL = 'https://decktv.waygosquad.tech'` in `src/data/site.ts`. `trailingSlash: 'never'`, `build.format: 'file'`.
- Fallback domain `decktv.waygosquad.com`: a **301 redirect at the host** to the same path on `.tech`. The canonical always points to `.tech`. This is deployment config, not part of the site build.
- `@astrojs/sitemap` → `/sitemap-index.xml`, which excludes `/404`.
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://decktv.waygosquad.tech/sitemap-index.xml
  ```
- `public/site.webmanifest`, favicons (`favicon.ico`, 32px PNG, 180px apple-touch, 192/512 for the manifest), `theme-color #0B0D10`.

## Per-page metadata (`src/components/Seo.astro`)
Props: `title`, `description`, `path`, `ogImage`, `jsonLd[]`, `noindex?`. The component outputs `<title>`, meta description, `<link rel="canonical">`, `og:*` (type, url, title, description, image 1200×630, site_name "DeckTV"), `twitter:card=summary_large_image`, and `<meta name="robots">`.

| Path | Title (≤ 60) | Description (≤ 155) |
|---|---|---|
| `/` | DeckTV — Android TV launcher & CCTV viewer | Turn any Android TV into a live CCTV wall. DeckTV boots straight into your cameras — Hikvision, Dahua, CP Plus, RTSP. No cloud, no remote needed. |
| `/deckcam` | DeckCam — CCTV & DVR viewer for Android TV, phone, tablet | Watch your DVR/NVR cameras on any Android device. Grids, full view, snapshots and audio — local network only, no account. |
| `/features` | Features — DeckTV & DeckCam CCTV viewer for Android | Every feature: boot-to-camera start-up input, 4/9/All layouts, SD/HD streams, snapshots, remote shortcuts, Hikvision/Dahua/Uniview support. |
| `/privacy/decktv` | DeckTV privacy policy | DeckTV collects no personal data. How the app uses its permissions on your TV, entirely on-device. |
| `/privacy/deckcam` | DeckCam privacy policy | DeckCam collects no personal data and talks only to your own DVR or cameras on your network. |

## Structured data (JSON-LD)
- **All pages**: an `Organization` (`name: WaygoSquad`, `url: SITE_URL`, `email: thisisprabhatk@gmail.com`, `logo`) and a `WebSite`.
- **`/`**: `SoftwareApplication` for DeckTV:
  ```json
  { "@type": "SoftwareApplication", "name": "DeckTV",
    "operatingSystem": "Android TV 9+", "applicationCategory": "MultimediaApplication",
    "applicationSubCategory": "Launcher, CCTV viewer",
    "downloadUrl": "https://play.google.com/store/apps/details?id=com.waygosquad.decktv",
    "installUrl": "same", "publisher": {"@id": "#org"}, "image": ".../icon-512.png",
    "screenshot": [".../12-camera-grid-9.png", ...], "featureList": [...] }
  ```
  Plus a second `SoftwareApplication` for DeckCam (it is featured on the page) and a `FAQPage`.
- **`/deckcam`**: DeckCam `SoftwareApplication`, `FAQPage`, `BreadcrumbList`.
- **`/features`**, **privacy pages**: `BreadcrumbList`. The privacy pages also get a `WebPage` with `dateModified`.
- `offers` and `aggregateRating` are **left out** until there is a real price or rating. Inventing them is against Google's guidelines.

## On-page
- One `h1` per page, and a logical h2/h3 outline.
- Semantic `header/nav/main/section/footer`, and `aria-labelledby` on sections.
- Descriptive alt text. For example: "DeckTV on a shop TV showing a 9-camera live grid from a Hikvision DVR".
- Internal links: hero → `/features#start-up`; DeckCam section → `/deckcam`; footer → all pages including both policies. Each feature card links to its `/features#…` anchor.
- Copy uses the keywords naturally. FAQ answers are written for featured snippets (40–60 words).

## Keyword targets
| Cluster | Terms | Landing |
|---|---|---|
| Core | android tv cctv viewer, cctv app for android tv, dvr viewer for tv | `/` |
| Brand + TV | hikvision on android tv, dahua dvr android tv app, cp plus dvr on tv, uniview android tv | `/`, `/features#dvr` |
| Behaviour | tv boot directly to cctv, show cctv on tv when turned on, android tv auto start camera app | `/` boot section, `/features#start-up` |
| Technical | rtsp viewer android tv, nvr sub stream grid, multi camera rtsp player | `/features` |
| Launcher | minimal android tv launcher, launcher for shops / mi tv | `/` |
| Mobile | dvr viewer android phone no cloud, local cctv app no account | `/deckcam` |

FAQ questions (these double as the FAQPage schema):
1. Can my TV open the cameras automatically when it turns on?
2. Which DVR / NVR brands work?
3. Do I need the internet or a cloud account?
4. Will it run on a 1 GB RAM TV?
5. What's the difference between DeckTV and DeckCam?
6. Does DeckTV replace my TV's home screen? Can I go back?
7. Where are snapshots saved?
8. Is my DVR password safe?

## Performance (Core Web Vitals) budget
- LCP < 2.0 s on mobile 4G (preloaded hero AVIF, no render-blocking JS, fonts self-hosted with `font-display: swap` and the Outfit latin subset preloaded).
- CLS < 0.05 (dimensions on every image, the font fallback metric-adjusted with `size-adjust`).
- INP < 100 ms (only small islands: hero key handler, hairline figures, reveal fallback).
- Page weight ≤ 1.5 MB; JS ≤ 40 KB gzip per page (hairline is dependency-free).
- Lighthouse ≥ 95 in all four categories on `/`, `/deckcam` and `/features`.

## Checks before launch
- [ ] `dist/` grep: every page has a canonical on `https://decktv.waygosquad.tech`
- [ ] Rich Results Test / validator.schema.org passes for `/` and `/deckcam`
- [ ] Sitemap lists `/`, `/deckcam`, `/features`, `/privacy/decktv`, `/privacy/deckcam`
- [ ] Facebook/LinkedIn/X OG previews render the per-page images
- [ ] Submit the sitemap in Google Search Console (owner action)
