import { SITE_URL, PUBLISHER, CONTACT, PLAY } from '../data/site';
import type { FaqItem } from '../data/faq';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: PUBLISHER,
    url: SITE_URL,
    email: CONTACT,
    logo: `${SITE_URL}/icons/icon-512.png`,
    sameAs: [
      PLAY.decktv,
      PLAY.deckcam,
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'DeckTV',
    description: 'Android TV launcher with built-in CCTV viewer and boot-to-camera support.',
    publisher: { '@id': `${SITE_URL}/#org` },
  };
}

export function getDeckTvAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app-decktv`,
    name: 'DeckTV',
    operatingSystem: 'Android TV 9+',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Android TV Launcher, CCTV Viewer',
    downloadUrl: PLAY.decktv,
    installUrl: PLAY.decktv,
    publisher: { '@id': `${SITE_URL}/#org` },
    image: `${SITE_URL}/icons/icon-512.png`,
    description: 'Turn any Android TV into a live CCTV control room. Boots straight into your cameras without touching a remote.',
    screenshot: [
      `${SITE_URL}/screens/12-camera-grid-9.png`,
      `${SITE_URL}/screens/01-home.png`,
      `${SITE_URL}/screens/05-settings.png`,
    ],
    featureList: [
      'Boot directly to camera wall on TV power-on',
      'Multi-camera RTSP streaming for Hikvision, Dahua, Uniview',
      'Remote-first controls with 0-9 number jump',
      'Lossless PNG snapshots and built-in gallery',
      'Lightweight 1 GB RAM Android TV optimization',
    ],
  };
}

export function getDeckCamAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app-deckcam`,
    name: 'DeckCam',
    operatingSystem: 'Android 9+ (TV, Phone, Tablet)',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'CCTV Viewer, Security Monitor',
    downloadUrl: PLAY.deckcam,
    installUrl: PLAY.deckcam,
    publisher: { '@id': `${SITE_URL}/#org` },
    image: `${SITE_URL}/icons/deckcam-icon-512.png`,
    description: 'Dedicated standalone CCTV and DVR camera viewer for Android TV, TV boxes, phones, and tablets with zero launcher overhead.',
    screenshot: [
      `${SITE_URL}/screens/12-camera-grid-9.png`,
      `${SITE_URL}/screens/14-camera-grid-4.png`,
      `${SITE_URL}/screens/17-snapshots-gallery.png`,
    ],
    featureList: [
      'Direct launch to multi-camera video grid',
      'Touch, gesture, and TV remote D-pad support',
      'Zero launcher permissions or background overhead',
      'Local network only, zero cloud requirements',
    ],
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
