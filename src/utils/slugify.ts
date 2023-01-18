export function slugify(frontmatter: Record<string, any>) {
  const slug = frontmatter.slug ?? frontmatter.title;
  return encodeURIComponent(slug.toLowerCase().split(" ").join("-"));
}
