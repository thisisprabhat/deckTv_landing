# 03 · Features and problems solved

Everything here is taken from the app source: `androidTvLauncher_Cam/app/src/main/java/com/prabhat/decktv/**` and `DeckCam/docs/superpowers/specs/2026-10-25-deckcam-design.md`. Wording marked *(app)* is the app's own UI string. This file feeds `src/data/features.ts`, the single source for `/`, `/features` and `/deckcam`.

Tags: **TV** = DeckTV only · **CAM** = DeckCam only · **BOTH**

---

## A. Start-up & always-on: "Switch on. Cameras on."
| Feature | Detail | Tag |
|---|---|---|
| **Boots straight into the cameras** | Settings → **Start-up input**: Camera · Home screen · each HDMI/AV input · Live TV. "The checked input opens when the TV turns on" *(app)*. **Camera is the default after installation**, so the TV powers on into the full-screen camera view and **no remote is needed**. | TV |
| Input switcher on the home screen | Choosing an input on the home screen also sets it as the start-up input. | TV |
| Open on TV turn-on | "Open DeckTV when the TV turns on" *(app)*; returns to DeckTV after standby instead of the last app. | TV |
| Xiaomi power-on fix | Xiaomi firmware opens Live TV on its last source at power-on (`set_auto_play`). DeckTV keeps this in step with the start-up input, so Live TV doesn't grab the screen. | TV |
| Never sleep | "Keeps the TV awake: no screensaver, no auto sleep (restored when turned off)" *(app)*. | TV |
| Keep screen awake | Keeps the screen on while the app is open. | BOTH |
| One-press permissions | "Allow everything": DeckTV grants itself the permissions it needs through the TV's own debugging connection, with no computer needed *(app)*. | TV |

## B. Cameras & layouts
| Feature | Detail | Tag |
|---|---|---|
| Every camera, one screen | Layouts: **My Selection** (4 cameras you pick), **9-up**, **All cameras**, **Single** full view, **Primary** enlarged tile. | BOTH |
| 1–64 cameras | Channel auto-discovery from the DVR; a fallback count is used if the DVR doesn't list them. | BOTH |
| Drag to reorder | Move tiles; "Reset camera order" *(app)*. | BOTH |
| Show / hide cameras | Per channel. | BOTH |
| Aspect ratio per camera | Stretch / Fit / Zoom / 16:9 / 4:3, plus a default. | BOTH |
| Demo mode | "Eight illustrated cameras, no DVR needed" *(app)*. | BOTH |

## C. DVR / NVR support
| Feature | Detail | Tag |
|---|---|---|
| Brands | Hikvision / HiLook / LTS / Annke · Dahua / CP Plus / Amcrest / Lorex · Uniview (UNV) · TVT / Provision · XMEye / H.264 DVR · any generic RTSP. | BOTH |
| Auto-detect | Detects the brand and RTSP paths. | BOTH |
| RTSP path presets | Main/sub stream path templates with `{ch} {ch0} {ch2} {user} {pass}` placeholders. | BOTH |
| Ports & HTTPS | RTSP port, HTTP/HTTPS port, Use HTTPS. | BOTH |
| Test connection | "Test connection" and "Save and connect" *(app)*. | BOTH |
| Encrypted password | The DVR password is encrypted with a key held in the Android Keystore. | BOTH |

## D. Streams & performance
| Feature | Detail | Tag |
|---|---|---|
| SD in grids, HD in full view | "Grids use each camera's sub (SD) stream; full view uses the main (HD) stream and falls back to SD if the DVR refuses it" *(app)*. | BOTH |
| Simultaneous-stream cap | "How many cameras this TV can decode at once; extra tiles pause" *(app)*. | BOTH |
| Low-end TVs | Runs on 1 GB RAM TVs; tested on Mi TV 4A Pro (Android 9). Motion level "Reduced — for slower TVs" *(app)*. | BOTH |
| Hardened RTSP | A patched Media3 RTSP stack for real-world DVR quirks. | BOTH |

## E. Snapshots
| Feature | Detail | Tag |
|---|---|---|
| One-press snapshot | Red key, or the camera button; **Snapshot all** cameras at once. | BOTH |
| PNG files | "Snapshots are PNG files named Camera-yyyyMMdd-HHmmss" *(app)*, saved to `Pictures/CamDeck`. | BOTH |
| Gallery | Browse full screen and delete. | BOTH |

## F. Audio
| Feature | Detail | Tag |
|---|---|---|
| Listen to any camera | Blue key, or the menu; camera volume is separate from the TV volume. | BOTH |

## G. Remote, pointer & touch
| Key | Action *(app)* | Tag |
|---|---|---|
| 0–9 | "Open that camera full screen · same number again: back to grid" | BOTH |
| OK on a tile | Full view · in full view: back to grid | BOTH |
| Hold OK on a tile | Camera menu (snapshot, listen, aspect, move, My Selection…) | BOTH |
| CH+ / CH− · ⏭ / ⏮ | Next / previous page (or camera in full view) | BOTH |
| Red / Green / Yellow / Blue | Snapshot all · Reconnect all · Next layout (Mine → 9 → All) · Listen | BOTH |
| BACK | Shows the controls · closes pop-ups · full view → last grid | BOTH |
| HOME, or BACK three times | Back to the home screen | TV |
| Double BACK | Exit | CAM |
| Air mouse | Moving the pointer shows the controls | BOTH |
| Touch | Tap, drag and controls on phones and tablets | CAM |
| Auto-hiding controls | Overlay auto-hide timeout | BOTH |

## H. Home screen (launcher)
| Feature | Detail | Tag |
|---|---|---|
| Glass-focus home | Apple-TV-style springy glass focus, overshoot zoom, staggered entrance; greeting and big clock. | TV |
| Cameras tile | A live preview tile on the home row. | TV |
| Now playing / Last played | Shows what's playing in other apps (with media access). | TV |
| Recent & frequently used apps | With usage access. | TV |
| All apps · hide apps | Hold OK on an app to hide it. | TV |
| Dock | Add, remove and re-order; Reset the dock. | TV |
| Live TV & inputs | Choose a Live TV app; HDMI/AV inputs listed with connection state. | TV |
| Clock screensaver | "Drifting clock on the home screen when idle" *(app)*. | TV |
| Motion levels | Full (Apple TV style) / Reduced. | TV |
| Android TV settings | Shortcut to network, display, sound and accounts. | TV |

## I. Privacy (also see docs/05)
| Feature | Detail | Tag |
|---|---|---|
| Local only | Talks only to your DVR on your network, plus (DeckTV) the TV's own debugging service on 127.0.0.1. | BOTH |
| No account, no cloud | No sign-in, no servers. | BOTH |
| No tracking | No analytics, ads or crash-reporting SDKs. | BOTH |
| No backups of settings | `allowBackup=false`. | BOTH |

---

## Problems → solutions
Shown as numbered cards on `/` (problem in bold, fix below) and repeated on `/features`. **Please confirm the wording before launch.**

1. **"Every morning someone has to find the remote, switch input and open the camera app."**
   DeckTV boots straight into the camera wall when the TV is switched on. Camera is the default start-up input, so no remote is needed.
2. **"The DVR's HDMI output means a long cable and a USB mouse at the TV."**
   Stream over your existing Wi-Fi/LAN instead. Any Android TV on the network becomes a monitor.
3. **"The vendor app is built for phones, needs a cloud login, and fights the TV remote."**
   A TV-first, remote-first viewer that connects directly to the DVR, with no account.
4. **"My cheap TV freezes when it shows lots of HD cameras."**
   SD sub-streams in grids, HD only in full view, and a cap on simultaneous decodes. Built for 1 GB TVs.
5. **"The TV goes to sleep, or the screensaver covers the cameras."**
   Never sleep keeps the TV awake, and it is restored when you turn it off.
6. **"On power-on my Xiaomi TV jumps to Live TV instead."**
   DeckTV keeps the firmware's power-on behaviour in step with your chosen input.
7. **"I have a different DVR brand at each site, and RTSP URLs are cryptic."**
   Presets for the major brands, auto-detect, placeholder templates and a Test connection button.
8. **"Saving a clip of an incident takes forever."**
   One key snapshots a camera, or every camera at once, as timestamped PNGs.
9. **"I want to hear what's happening at the counter without blasting the TV."**
   Listen to any camera with its own volume.
10. **"Stock launchers are slow and full of ads."**
    A minimal launcher that still keeps your apps, Live TV, inputs and what's playing.
11. **"I don't want my camera feeds going through someone's cloud."**
    Local network only. No account, no analytics, an encrypted password.
12. **"I just want the cameras, on my phone or tablet too."**
    DeckCam is the same viewer as a standalone app for TV, phone and tablet, with no launcher.

## DeckTV vs DeckCam (comparison table for `/deckcam`)
| | DeckTV | DeckCam |
|---|---|---|
| Live CCTV viewer (all layouts, snapshots, audio) | ✓ | ✓ |
| Android TV & TV boxes | ✓ | ✓ |
| Phones & tablets (touch) | — | ✓ |
| Boots into cameras on TV power-on | ✓ | — |
| Replaces the TV home screen (launcher) | ✓ | — |
| Never sleep / power-on input control | ✓ | — |
| Special permissions | Launcher set (see policy) | Network only |
