export const SITE_URL = 'https://decktv.waygosquad.tech';

export const PUBLISHER = 'WaygoSquad';
export const CONTACT = 'thisisprabhatk@gmail.com';

export const PLAY = {
  decktv: 'https://play.google.com/store/apps/details?id=com.waygosquad.decktv',
  deckcam: 'https://play.google.com/store/apps/details?id=com.waygosquad.deckcam',
} as const;

export const NAV_LINKS = [
  { label: 'Overview', href: '/#overview' },
  { label: 'Boot to Camera', href: '/#boot' },
  { label: 'Features', href: '/features' },
  { label: 'DeckCam', href: '/deckcam' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const FOOTER_LINKS = {
  apps: [
    { label: 'DeckTV for Android TV', href: '/' },
    { label: 'DeckCam (Standalone Monitor)', href: '/deckcam' },
    { label: 'All Features & Specs', href: '/features' },
  ],
  support: [
    { label: 'DeckTV Privacy Policy', href: '/privacy/decktv' },
    { label: 'DeckCam Privacy Policy', href: '/privacy/deckcam' },
    { label: 'Contact & Feedback', href: `mailto:${CONTACT}` },
  ],
  play: [
    { label: 'DeckTV on Google Play', href: PLAY.decktv },
    { label: 'DeckCam on Google Play', href: PLAY.deckcam },
  ]
};
