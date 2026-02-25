import { readFileSync } from 'fs'
import { join } from 'path'

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  content: string
}

export function getArticles(): Article[] {
  try {
    const data = readFileSync(join(process.cwd(), 'data', 'articles.json'), 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug)
}