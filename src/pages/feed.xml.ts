import rss from "@astrojs/rss";
import type { MarkdownInstance } from "astro";
import { ArticleFrontmatter, slugFromFile } from "./articles/_utils";

function sortPosts(a, b) {
  return (
    Number(new Date(b.frontmatter.publishDate)) -
    Number(new Date(a.frontmatter.publishDate))
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  date.setUTCHours(0);
  return date;
}

export const get = () => {
  const allPosts: MarkdownInstance<ArticleFrontmatter>[] = Object.values(
    import.meta.glob("../content/articles/*.mdx", { eager: true })
  );
  const sortedPosts = allPosts.sort((a, b) => sortPosts(a, b));

  return rss({
    // `<title>` field in output xml
    title: "Tao Bojlén",
    // `<description>` field in output xml
    description: "Software engineering, philosophy, and security.",
    stylesheet: "/rss/pretty-feed-v3.xsl",
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: sortedPosts.map((post) => ({
      link: `/articles/${slugFromFile(post.url)}`,
      title: post.frontmatter.title,
      pubDate: formatDate(post.frontmatter.date),
    })),
    customData: "<language>en-us</language>",
  });
};
