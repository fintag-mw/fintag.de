// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import opengraphImages, {presets} from "astro-opengraph-images";

import fs from 'node:fs';

// https://astro.build/config
export default defineConfig({
    site: "https://www.fintag.de",
    redirects: {
        // old RSS link
        "/newsletter/index.xml": "/newsletter/rss.xml",

        // published wrong slug initially
        "/newsletter/2024/02/14/message-aalen-mein-zuhause/": "/newsletter/2024/02/14/messe-aalen-mein-zuhause",
        "/newsletter/2022/10/13/bausparverträge-waren-noch-nie-so-lukrativ": "/newsletter/2022/10/13/bausparvertraege-waren-noch-nie-so-lukrativ/",
        "/newsletter/2023/01/11/drei-sterne-für-2023/": "/newsletter/2023/01/11/drei-sterne-fuer-2023/",

        // ancient newsletter links that are known to google
        "/newsletter/2022-04-27_fintag-informiert_angst_vor_der_immobilienblase/": "/newsletter/2022/04/27/angst-vor-der-immobilienblase/",
        "/newsletter/2022-05-18_fintag-informiert_unser-neuer-partner-peysu/": "/newsletter/2022/09/21/unser-neuer-partner-zur-gesetzlichen-rentenversicherung/",
        "/newsletter/2022-06-29_fintag-informiert_unser-neuer-partner-italviva/": "/newsletter/2022/06/29/unser-neuer-partner-italviva/",
        "/newsletter/2022-10-19_fintag-informiert_unser-mitarbeiter-herr-rainer-weber/": "/newsletter/2022/10/19/vorstellung-herrn-rainer-weber-in-der-fintag/",
        "/newsletter/2022-11-30_fintag-informiert_angst-vor-der-immobilienblase-teil-2/": "/newsletter/2022/11/30/angst-vor-der-immobilienblase-teil-2/",
        //
        "/newsletter/2023-01-11_fintag-informiert_drei-sterne-für-2023/": "/newsletter/2023/01/11/drei-sterne-fuer-2023/",
        "/newsletter/2023-02-08_fintag-informiert_meldungen-des-immobilienmarktes/": "/newsletter/2023/02/08/meldungen-des-immobilienmarktes/",
        "/newsletter/2023-03-15_fintag-informiert_zinsverbilligte-immobilienkredite-für-junge-familien-lakra/": "/newsletter/2023/03/15/zinsverbilligte-immobilienkredite-fuer-junge-familien_lakra/",
        "/newsletter/2023-04-05_fintag-informiert_kapitalanlage-und-absicherung-der-privaten-pflegeversicherung/": "/newsletter/2023/04/05/kapitalanlage-und-absicherung-der-privaten-pflegeversicherung/",
        "/newsletter/2023-08-09_neues-vom-rvi_und-es-gibt-ihn-doch-den-mut-zum-bauen/": "/newsletter/2023/08/09/und-es-gibt-ihn-doch_den-mut-zum-bauen/",
    },
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
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