import rss from "@astrojs/rss";
import {type CollectionEntry, getCollection, render} from 'astro:content';
import {compare} from "@utils.ts";
import sanitizeHtml from 'sanitize-html';
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { experimental_AstroContainer  as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";

type newsletterType = CollectionEntry<'newsletter'>;

function getAuthorElement(newsletter: newsletterType) {
    if (newsletter.data.author) {
        return `<dc:creator>${newsletter.data.author}</dc:creator>`;
    }
    if (newsletter.data.authors) {
        return newsletter.data.authors.map(a => `<dc:creator>${a}</dc:creator>`).join("")
    }
    return undefined;
}

export async function GET(context: any) {
    const renderers = await loadRenderers([getMDXRenderer()]);
    const container = await AstroContainer.create({ renderers });

    const newsletterCollection: newsletterType[] = await getCollection("newsletter");
    const newsletter = newsletterCollection
        .sort((n1, n2) => compare(n1.data.publishDate, n2.data.publishDate, true))
        .slice(0, 10)

    return rss({
        title: "Newsletter der fintag",
        description: "Die neuesten Beiträge vom Feed Newsletter der fintag",
        site: new URL('/newsletter/', context.site),
        xmlns: {
            content: 'http://purl.org/rss/1.0/modules/content/',
            atom: 'http://www.w3.org/2005/Atom',
            dc: 'http://purl.org/dc/elements/1.1/',
        },
        trailingSlash: true,
        stylesheet: new URL('/pretty-feed-v3.xsl', context.site).toString(),
        items: await Promise.all(newsletter
            .map(async n => ({
            title: n.data.title,
            pubDate: n.data.publishDate,
            description: n.data.description?.length??0 > 1 ? n.data.description : `Newsletter vom ${n.data.publishDate.toLocaleDateString()}`,
            customData: getAuthorElement(n),
            link: `/newsletter/${n.slug}`,
            categories: n.data.categories,
            content: sanitizeHtml(await container.renderToString((await render(n)).Content), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'br']),
                transformTags: {
                    "img": function (tagName, attribs) {
                        if (!attribs.src.startsWith("http")){
                            attribs.src = new URL(attribs.src, context.site).toString();
                        }

                        return {
                            tagName: tagName,
                            attribs: attribs
                        }
                    },
                    "a": function (tagName, attribs) {
                        const link = attribs.href;
                        if (!link.startsWith("http")) {
                            attribs.href = new URL(link, context.site).toString();
                        }
                        return {tagName: tagName, attribs: attribs}
                    }
                }
            })
        }))),
        customData: `
            <language>de-de</language>
            <atom:link href="${new URL('/newsletter/', context.site)}" rel="self" type="application/rss+xml" />
        `,
    })
}