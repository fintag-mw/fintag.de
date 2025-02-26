import rss from "@astrojs/rss";
import {type CollectionEntry, getCollection, render} from 'astro:content';
import {compare} from "@utils.ts";
import sanitizeHtml from 'sanitize-html';
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { experimental_AstroContainer  as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";

type newsletterType = CollectionEntry<'newsletter'>;

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
        site: context.site,
        items: await Promise.all(newsletter
            .map(async n => ({
            title: n.data.title,
            pubDate: n.data.publishDate,
            description: n.data.description,
            author: n.data.author ?? n.data.authors?.join(', '),
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
                    }
                }
            })
        }))),
        customData: '<language>de-de</language>',
    })
}