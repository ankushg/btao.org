import path from "node:path";
import type { MarkdownInstance } from "astro";
import { Article, ArticleSchema } from "../../types";

export const slugFromFile = (file: string) => path.parse(file).name;
const urlFromContentUrl = (url: string) => {
  const { dir, name } = path.parse(url);
  return path.join(dir.replace("src/content", ""), name, "/");
};

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
}

export async function parseArticle({
  url,
  frontmatter,
}: MarkdownInstance<ArticleFrontmatter>): Promise<Article> {
  const { title, description, date } = frontmatter;

  return ArticleSchema.parse({
    url: urlFromContentUrl(url),
    title,
    description,
    date: new Date(date),
  }) as Article;
}

export function sortPosts(a: Article, b: Article) {
  return b.date.getTime() - a.date.getTime();
}
