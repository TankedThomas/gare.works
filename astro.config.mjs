// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  experimental: {
    clientPrerender: true,
    svgo: true,
  },

  image: {
    responsiveStyles: true
  },

  integrations: [mdx()],
});