export interface FeatureItem {
  id: string;
  groupId: string;
  groupTitle: string;
  title: string;
  detail: string;
  tag: 'TV' | 'CAM' | 'BOTH';
  screen?: string;
}

export interface ProblemSolution {
  number: number;
  problem: string;
  solution: string;
  detail: string;
  tag: 'TV' | 'CAM' | 'BOTH';
}

export const FEATURE_GROUPS = [
  { id: 'start-up', title: 'Start-Up & Always-On' },
  { id: 'cameras', title: 'Cameras & Layouts' },
  { id: 'dvr', title: 'DVR / NVR Support' },
  { id: 'streams', title: 'Streams & Performance' },
  { id: 'snapshots', title: 'Snapshots & Evidence' },
  { id: 'audio', title: 'Audio Monitoring' },
  { id: 'remote', title: 'Remote, Pointer & Touch' },
  { id: 'home', title: 'Android TV Home Launcher' },
  { id: 'privacy', title: 'Privacy & Security' },
] as const;

export const FEATURES: FeatureItem[] = [
  // A. Start-up & always-on
  {
    id: 'boot-to-camera',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Boots straight into the cameras',
    detail: 'Settings → Start-up input offers Camera, Home screen, HDMI/AV inputs, and Live TV. Camera is the default after installation, so your TV powers on into the full-screen camera wall without needing a remote.',
    tag: 'TV',
    screen: '05-settings.png'
  },
  {
    id: 'input-switcher',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Input switcher on the home screen',
    detail: 'Selecting any HDMI or AV input directly on the home screen automatically sets it as your default start-up input.',
    tag: 'TV',
    screen: '01-home.png'
  },
  {
    id: 'open-on-turn-on',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Open on TV turn-on',
    detail: 'Returns directly to DeckTV after standby instead of leaving the TV on a third-party app or black screen.',
    tag: 'TV',
    screen: '05-settings.png'
  },
  {
    id: 'xiaomi-fix',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Xiaomi power-on fix',
    detail: 'Xiaomi firmware opens Live TV on its last source at power-on via set_auto_play. DeckTV keeps this synchronized with your start-up input so Live TV never grabs the display unexpectedly.',
    tag: 'TV'
  },
  {
    id: 'never-sleep',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Never sleep mode',
    detail: 'Keeps the TV display awake: disables system screensavers and auto-sleep timers so your security wall runs 24/7 (original timers restored when toggled off).',
    tag: 'TV',
    screen: '05-settings.png'
  },
  {
    id: 'keep-awake',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'Keep screen awake',
    detail: 'Prevents the device from dimming or sleeping while video feeds are active.',
    tag: 'BOTH'
  },
  {
    id: 'one-press-grants',
    groupId: 'start-up',
    groupTitle: 'Start-Up & Always-On',
    title: 'One-press permission setup',
    detail: '"Allow everything" grants DeckTV necessary TV system permissions via the TV\'s local loopback debugging service (127.0.0.1) without connecting a PC.',
    tag: 'TV'
  },

  // B. Cameras & layouts
  {
    id: 'layouts',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: 'Every camera on one screen',
    detail: 'Flexible layout options: My Selection (4 curated feeds), 9-up grid, All cameras wall, Single full view, and Primary enlarged tile view with smooth spring transitions.',
    tag: 'BOTH',
    screen: '12-camera-grid-9.png'
  },
  {
    id: 'channels',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: '1 to 64 camera channels',
    detail: 'Automatic channel discovery from the NVR/DVR. Fallback manual channel count handles non-discovery devices.',
    tag: 'BOTH',
    screen: '07-settings-cameras.png'
  },
  {
    id: 'reorder-tiles',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: 'Drag and reorder camera tiles',
    detail: 'Easily rearrange feeds to match your physical site layout. "Reset camera order" restores default DVR mapping.',
    tag: 'BOTH',
    screen: '13-camera-grid-controls.png'
  },
  {
    id: 'show-hide',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: 'Show or hide cameras',
    detail: 'Toggle individual camera channels on or off so unused or offline feeds don\'t take up grid space.',
    tag: 'BOTH',
    screen: '07-settings-cameras.png'
  },
  {
    id: 'aspect-ratio',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: 'Per-camera aspect ratio override',
    detail: 'Configure Stretch, Fit, Zoom, 16:9, or 4:3 independently for corridor cameras and wide-angle lenses.',
    tag: 'BOTH'
  },
  {
    id: 'demo-mode',
    groupId: 'cameras',
    groupTitle: 'Cameras & Layouts',
    title: 'Interactive demo mode',
    detail: 'Includes eight beautifully animated demo cameras to explore layouts, remote shortcuts, and gestures before connecting to a DVR.',
    tag: 'BOTH'
  },

  // C. DVR / NVR support
  {
    id: 'dvr-brands',
    groupId: 'dvr',
    groupTitle: 'DVR / NVR Support',
    title: 'Multi-brand DVR/NVR compatibility',
    detail: 'Native protocols and RTSP templates for Hikvision, HiLook, LTS, Annke, Dahua, CP Plus, Amcrest, Lorex, Uniview (UNV), TVT, Provision, XMEye, and generic RTSP IP cameras.',
    tag: 'BOTH',
    screen: '06-settings-dvr.png'
  },
  {
    id: 'brand-auto-detect',
    groupId: 'dvr',
    groupTitle: 'DVR / NVR Support',
    title: 'Brand and stream auto-detection',
    detail: 'Tests common endpoints to automatically discover brand capabilities and RTSP URI templates.',
    tag: 'BOTH',
    screen: '06-settings-dvr.png'
  },
  {
    id: 'rtsp-presets',
    groupId: 'dvr',
    groupTitle: 'DVR / NVR Support',
    title: 'RTSP path presets with variables',
    detail: 'Pre-filled templates with {ch}, {ch0}, {ch2}, {user}, and {pass} tokens make connecting any custom IP stream painless.',
    tag: 'BOTH'
  },
  {
    id: 'encrypted-passwords',
    groupId: 'dvr',
    groupTitle: 'DVR / NVR Support',
    title: 'Keystore-encrypted credentials',
    detail: 'Your DVR credentials are encrypted using hardware-backed Android Keystore keys and never leave your TV.',
    tag: 'BOTH'
  },

  // D. Streams & performance
  {
    id: 'dual-streaming',
    groupId: 'streams',
    groupTitle: 'Streams & Performance',
    title: 'SD in grids, HD in full view',
    detail: 'Grids stream sub (SD) feeds for ultra-lightweight GPU decoding. Zooming into any camera automatically switches to main (HD) resolution with instant SD fallback if congested.',
    tag: 'BOTH',
    screen: '14-camera-grid-4.png'
  },
  {
    id: 'stream-capping',
    groupId: 'streams',
    groupTitle: 'Streams & Performance',
    title: 'Simultaneous stream cap',
    detail: 'Configurable limit on concurrent hardware decoders ensures smooth frame rates on low-end hardware by intelligently pausing unseen tiles.',
    tag: 'BOTH'
  },
  {
    id: 'ram-optimization',
    groupId: 'streams',
    groupTitle: 'Streams & Performance',
    title: 'Built for 1 GB RAM Android TVs',
    detail: 'Engineered specifically for budget smart TVs (tested thoroughly on Mi TV 4A Pro with Android 9). Includes "Reduced Motion" mode for maximum responsiveness.',
    tag: 'BOTH'
  },
  {
    id: 'hardened-rtsp',
    groupId: 'streams',
    groupTitle: 'Streams & Performance',
    title: 'Hardened Media3 RTSP client',
    detail: 'Features a patched, battle-tested Media3 RTSP engine that handles erratic network latency, UDP packet drops, and proprietary DVR packet headers.',
    tag: 'BOTH'
  },

  // E. Snapshots
  {
    id: 'one-press-snapshot',
    groupId: 'snapshots',
    groupTitle: 'Snapshots & Evidence',
    title: 'Instant snapshot & "Snapshot All"',
    detail: 'Capture crisp full-resolution PNG frames in one click via the Red remote key or controls dock. "Snapshot All" freezes and saves every active camera simultaneously.',
    tag: 'BOTH',
    screen: '17-snapshots-gallery.png'
  },
  {
    id: 'snapshot-gallery',
    groupId: 'snapshots',
    groupTitle: 'Snapshots & Evidence',
    title: 'On-screen gallery viewer',
    detail: 'Browse, inspect in full-screen, and delete evidence photos directly on your TV using remote D-pad navigation. Saved in Pictures/CamDeck.',
    tag: 'BOTH',
    screen: '17-snapshots-gallery.png'
  },

  // F. Audio
  {
    id: 'audio-listen',
    groupId: 'audio',
    groupTitle: 'Audio Monitoring',
    title: 'Independent camera audio listening',
    detail: 'Listen to the microphone on any selected camera feed with independent volume control separate from your TV\'s main audio level.',
    tag: 'BOTH',
    screen: '18-camera-audio-picker.png'
  },

  // G. Remote & controls
  {
    id: 'number-keys',
    groupId: 'remote',
    groupTitle: 'Remote, Pointer & Touch',
    title: 'Direct number jump (0–9)',
    detail: 'Press digits 1–9 on your TV remote to instantly maximize that camera full-screen. Press the same digit or 0 to immediately return to the grid.',
    tag: 'BOTH',
    screen: '11-settings-about-shortcuts.png'
  },
  {
    id: 'color-shortcuts',
    groupId: 'remote',
    groupTitle: 'Remote, Pointer & Touch',
    title: 'Color key remote shortcuts',
    detail: 'Red: Snapshot All · Green: Reconnect Feeds · Yellow: Cycle Layouts (Mine → 9-Up → All) · Blue: Toggle Audio Monitoring.',
    tag: 'BOTH',
    screen: '11-settings-about-shortcuts.png'
  },
  {
    id: 'dpad-navigation',
    groupId: 'remote',
    groupTitle: 'Remote, Pointer & Touch',
    title: 'Fluid D-pad and air mouse',
    detail: 'Native focus rings, CH+/CH- page cycling, long-press OK for channel context menus, and full support for air-mouse pointing devices.',
    tag: 'BOTH'
  },
  {
    id: 'mobile-touch',
    groupId: 'remote',
    groupTitle: 'Remote, Pointer & Touch',
    title: 'Touch & gesture support (DeckCam)',
    detail: 'DeckCam adds fluid touch controls, pinch-to-zoom, tap-to-focus, and swipe navigation tailored for phones and tablets.',
    tag: 'CAM'
  },

  // H. Home launcher
  {
    id: 'glass-home',
    groupId: 'home',
    groupTitle: 'Android TV Home Launcher',
    title: 'Apple TV-style glass focus',
    detail: 'Smooth spring animations, depth layers, dynamic greeting, live clock, and clean wallpaper backdrops without banner ads.',
    tag: 'TV',
    screen: '01-home.png'
  },
  {
    id: 'app-management',
    groupId: 'home',
    groupTitle: 'Android TV Home Launcher',
    title: 'App management & custom dock',
    detail: 'Recent & frequently used apps row, custom pinned dock, hide unused apps, and easy access to HDMI/AV inputs and system settings.',
    tag: 'TV',
    screen: '02-home-recent.png'
  },
  {
    id: 'clock-screensaver',
    groupId: 'home',
    groupTitle: 'Android TV Home Launcher',
    title: 'Ambient clock screensaver',
    detail: 'Minimal drifting clock displays gently when the launcher is idle.',
    tag: 'TV'
  },

  // I. Privacy & security
  {
    id: 'local-only',
    groupId: 'privacy',
    groupTitle: 'Privacy & Security',
    title: '100% Local & Private',
    detail: 'Streams direct from your DVR over your private LAN. Zero third-party cloud brokers, zero analytics SDKs, zero telemetry, no account required.',
    tag: 'BOTH'
  }
];

export const PROBLEMS_SOLUTIONS: ProblemSolution[] = [
  {
    number: 1,
    problem: 'Cameras should be on the TV the second it is switched on, without hunting for a remote or navigating menus.',
    solution: 'Boot-to-Camera Default',
    detail: 'DeckTV allows setting Camera as the TV\'s boot input. Turn on the TV switch, and live feeds appear immediately with zero button presses.',
    tag: 'TV'
  },
  {
    number: 2,
    problem: 'DVR HDMI output requires running long cables through walls and plugging in an awkward USB mouse.',
    solution: 'LAN Streaming on Existing TV',
    detail: 'Streams RTSP feeds straight over Wi-Fi or Ethernet to the TV you already own, controlled comfortably with the TV remote.',
    tag: 'BOTH'
  },
  {
    number: 3,
    problem: 'Manufacturer apps are built for phones, mandate slow cloud accounts, and fail on D-pads.',
    solution: 'Remote-First, Zero-Cloud Design',
    detail: 'Purpose-built for Android TV D-pads and remotes. Talks directly to your DVR over your local subnet with no cloud middleman.',
    tag: 'BOTH'
  },
  {
    number: 4,
    problem: 'Affordable 1 GB RAM smart TVs crash or stutter when decoding multiple high-resolution streams.',
    solution: 'SD Grid & Decoded Stream Capping',
    detail: 'Sub-streams are used for multi-camera grids while HD is reserved for full-view focus, maintaining silky 60fps responsiveness on budget TVs.',
    tag: 'BOTH'
  },
  {
    number: 5,
    problem: 'The TV goes to sleep, turns off, or displays an unwanted screensaver over the surveillance feeds.',
    solution: 'Never Sleep Surveillance Mode',
    detail: 'Overrides standby timers and screensavers when active, turning any Android TV into a continuous commercial security display.',
    tag: 'TV'
  },
  {
    number: 6,
    problem: 'Multi-brand cameras and cryptic RTSP URL formats make manual configuration frustrating.',
    solution: 'Brand Presets & Auto-Discovery',
    detail: 'Built-in presets for Hikvision, Dahua, Uniview, CP Plus, and more automatically format stream URLs and discover channel counts.',
    tag: 'BOTH'
  },
  {
    number: 7,
    problem: 'Capturing incident evidence in a hurry is difficult with multi-step vendor menus.',
    solution: 'One-Key Snapshot & Snapshot All',
    detail: 'Press the Red key to instantly snapshot one or all cameras to disk in lossless PNG, browsable in the built-in TV gallery.',
    tag: 'BOTH'
  },
  {
    number: 8,
    problem: 'Stock Android TV launchers are cluttered with sponsored ads and slow down the device.',
    solution: 'Ultra-Clean, Fast Launcher',
    detail: 'A clutter-free, ad-free launcher experience with Apple TV-style glass focus, quick app launching, and immediate camera access.',
    tag: 'TV'
  },
  {
    number: 9,
    problem: 'Privacy concerns regarding camera feeds leaking through third-party cloud servers.',
    solution: 'Strict Local Isolation',
    detail: 'DeckTV and DeckCam connect only to your local DVR IP. No tracking, no user accounts, and credentials encrypted with Android Keystore.',
    tag: 'BOTH'
  },
  {
    number: 10,
    problem: 'You only want a camera viewer without altering your TV\'s launcher or on a phone/tablet.',
    solution: 'DeckCam Standalone App',
    detail: 'DeckCam gives you the identical high-performance CCTV monitor engine without launcher permissions, perfect for mobile, tablets, and TV boxes.',
    tag: 'CAM'
  }
];

export const COMPARISON_TABLE = [
  { feature: 'Live multi-camera grid (Quad, 9-Up, All, Primary)', decktv: true, deckcam: true },
  { feature: 'DVR support: Hikvision, Dahua, CP Plus, Uniview, RTSP', decktv: true, deckcam: true },
  { feature: 'Sub-stream SD grids with HD full-screen switch', decktv: true, deckcam: true },
  { feature: 'Hardware keystore credential encryption', decktv: true, deckcam: true },
  { feature: 'Snapshot capture & built-in gallery', decktv: true, deckcam: true },
  { feature: 'Independent camera audio listening', decktv: true, deckcam: true },
  { feature: 'Remote shortcuts (0–9 digits, Color keys)', decktv: true, deckcam: true },
  { feature: 'Local network only (No cloud / account)', decktv: true, deckcam: true },
  { feature: 'Optimized for 1 GB RAM Android TVs', decktv: true, deckcam: true },
  { feature: 'Touch & swipe gesture support', decktv: false, deckcam: true },
  { feature: 'Direct launch to cameras (No launcher code)', decktv: false, deckcam: true },
  { feature: 'Runs on Android phones & tablets', decktv: false, deckcam: true },
  { feature: 'Full Android TV home launcher replacement', decktv: true, deckcam: false },
  { feature: 'Boot-to-Camera start-up input (Zero clicks)', decktv: true, deckcam: false },
  { feature: 'Recent apps, custom dock & app launcher', decktv: true, deckcam: false },
  { feature: 'Never sleep mode (System sleep timer override)', decktv: true, deckcam: false },
  { feature: 'Xiaomi TV power-on auto-play fix', decktv: true, deckcam: false },
];
