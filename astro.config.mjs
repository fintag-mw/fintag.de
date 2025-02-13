// @ts-check
import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://www.fintag.de",
    integrations: [
        tailwind({
            applyBaseStyles: false,
            nesting: true
        }),
        mdx(),
        react(),
        sitemap()],
    publicDir: './static'
});