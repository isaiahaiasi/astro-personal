import rss from '@astrojs/rss';
import { slugify } from '../utils/slugify';

// TODO: include full post content
// https://docs.astro.build/en/guides/rss/#including-full-post-content

const postImportResult = import.meta.glob('../content/blog/**/*.md', { eager: true });
const posts = Object.values(postImportResult);

export const get = () => rss({
  title: "Isaiah's Blog",
  description: 'Programming foibles',
  site: import.meta.env.SITE,
  items: posts.map(({ frontmatter }: any) => ({
    link: `/blog/${slugify(frontmatter)}`,
    title: frontmatter.title,
    description: frontmatter.description,
    pubDate: frontmatter.publishedAt,
  })),
  customData: `<language>en-us</language>`,
});
