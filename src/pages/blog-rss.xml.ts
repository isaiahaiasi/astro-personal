import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// TODO: include full post content
// https://docs.astro.build/en/guides/rss/#including-full-post-content

const postImportResult = await getCollection("blog");
const posts = Object.values(postImportResult);

export const get = () => rss({
  title: "Isaiah's Blog",
  description: 'Programming foibles',
  site: import.meta.env.SITE,
  items: posts.map(({ data, slug }) => ({
    link: `/blog/${slug}`,
    title: data.title,
    description: data.description,
    pubDate: data.publishedAt,
  })),
  customData: `<language>en-us</language>`,
});
