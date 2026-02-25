import ArticleForm from '@/components/ArticleForm'
import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'

interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  content: string
}

export default function EditArticlePage({ params }: { params: { slug: string } }) {
  let articles: Article[] = []
  try {
    articles = JSON.parse(readFileSync(join(process.cwd(), 'data', 'articles.json'), 'utf-8'))
  } catch {
    notFound()
  }

  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  return <ArticleForm mode="edit" initialData={article} />
}
