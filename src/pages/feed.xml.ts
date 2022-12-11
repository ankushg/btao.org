import rss from "@astrojs/rss";
import type { MarkdownInstance } from "astro";
import { parse } from "date-fns";
import type { ArticleFrontmatter } from "./articles/_utils";

const postImportResult = import.meta.glob("../content/articles/*.mdx", {
  eager: true,
}) as Record<string, MarkdownInstance<ArticleFrontmatter>>;
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
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
    items: posts.map((post) => ({
      link: post.url || import.meta.env.SITE,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
    })),
    customData: "<language>en-us</language>",
  });
