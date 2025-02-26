// @ts-check
import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import opengraphImages, {presets} from "astro-opengraph-images";

import fs from 'node:fs';

// https://astro.build/config
export default defineConfig({
    site: "https://www.fintag.de",
    redirects: {
        "/newsletter/index.xml": "/newsletter/rss.xml",
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
            nesting: true
        }),
        mdx(),
        react(),
        sitemap(),
        opengraphImages({
            options: {
                fonts: [
                    {
                        name: "noto sans",
                        weight: 400,
                        style: "normal",
                        data: fs.readFileSync("node_modules/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff")
                    }
                ]
            },
            render: presets.simpleBlog
        })],
    publicDir: './static'
});