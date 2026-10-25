// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://decktv.waygosquad.tech',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('404') && !page.includes('health'),
    }),
  ],
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  image: {
    responsiveStyles: true,
  },
});
