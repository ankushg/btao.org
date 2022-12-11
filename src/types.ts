import { z } from "zod";

export interface Article {
  url: string;
  title: string;
  description?: string;
  date: Date;
}

export const ArticleSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
});
