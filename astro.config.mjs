// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://aleixs-trejo.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()],
  adapter: vercel(),
});