export interface FaqItem {
  question: string;
  answer: string;
  category?: 'decktv' | 'deckcam' | 'general';
}

export const FAQS: FaqItem[] = [
  {
    question: 'Can my TV open the cameras automatically when it turns on?',
    answer: 'Yes! DeckTV includes a dedicated Start-up input feature. Under Settings → Start-up input, choose "Camera". From then on, whenever you power on the TV at the wall or with the remote, it bypasses the home screen and boots straight into your live CCTV camera grid with zero button presses needed.',
    category: 'decktv'
  },
  {
    question: 'Which DVR / NVR brands work?',
    answer: 'DeckTV and DeckCam natively support Hikvision, HiLook, LTS, Annke, Dahua, CP Plus, Amcrest, Lorex, Uniview (UNV), TVT, Provision, XMEye, and any generic RTSP IP camera. The built-in auto-detect tests your device to discover brand protocol endpoints and configure stream URLs automatically.',
    category: 'general'
  },
  {
    question: 'Do I need the internet or a cloud account?',
    answer: 'No. Neither DeckTV nor DeckCam requires an internet connection or cloud account. Both apps communicate directly with your DVR or IP cameras over your local Wi-Fi or Ethernet network. No footage or credentials ever leave your premises.',
    category: 'general'
  },
  {
    question: 'Will it run smoothly on a 1 GB RAM TV?',
    answer: 'Yes. DeckTV and DeckCam are purposefully engineered in modern native Kotlin/Compose to run flawlessly on low-cost 1 GB RAM Android TVs (extensively tested on the Mi TV 4A Pro running Android 9). Multi-camera grids use low-bandwidth sub-streams with a hardware decoder cap, switching to full HD only when you zoom into a single camera.',
    category: 'general'
  },
  {
    question: 'What is the difference between DeckTV and DeckCam?',
    answer: 'DeckTV is a complete Android TV launcher that replaces your standard TV home screen, giving you boot-to-camera power, app management, and an integrated CCTV wall. DeckCam is the standalone camera monitor app extracted from DeckTV — perfect for phones, tablets, or TV users who want to keep their existing launcher.',
    category: 'general'
  },
  {
    question: 'Does DeckTV replace my TV\'s home screen? Can I go back?',
    answer: 'Yes, DeckTV acts as your default launcher, but you can switch back anytime in Android TV Settings → Apps → Default Apps → Home app. DeckTV also gives you instant access to all your installed TV apps and HDMI inputs right from its dock.',
    category: 'decktv'
  },
  {
    question: 'Where are snapshots saved?',
    answer: 'Snapshots are saved locally as standard PNG image files in your device\'s Pictures/CamDeck folder. You can view them in the built-in full-screen gallery, delete them via remote D-pad, or access them using any standard Android file manager.',
    category: 'general'
  },
  {
    question: 'Is my DVR password safe?',
    answer: 'Yes. Your DVR login credentials are encrypted at rest on your device using hardware-backed keys managed by the Android Keystore system. They are never written to unencrypted storage and are excluded from cloud backups (allowBackup=false).',
    category: 'general'
  }
];
