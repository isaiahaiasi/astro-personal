import { defineConfig } from 'astro/config';

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  },
  site: "https://isaiah.fyi/",
  integrations: [preact()]
});
