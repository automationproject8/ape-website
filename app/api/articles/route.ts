import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), 'data', 'articles.json')

function isAuthenticated(req: NextRequest) {
  return req.cookies.get('admin_auth')?.value === 'true'
}

function readArticles() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  } catch {
    return []
  }
}

function writeArticles(articles: unknown[]) {
  writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2))
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// GET — list all articles
export async function GET() {
  const articles = readArticles()
  return NextResponse.json(articles)
}

// POST — create new article
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const articles = readArticles()

  const newArticle = {
    slug: slugify(body.title),
    title: body.title,
    excerpt: body.excerpt,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: `${Math.ceil(body.content.split(' ').length / 200)} min read`,
    category: body.category,
    image: body.image || '',
    content: body.content,
  }

  // Check slug uniqueness
  const exists = articles.find((a: { slug: string }) => a.slug === newArticle.slug)
  if (exists) newArticle.slug = `${newArticle.slug}-${Date.now()}`

  articles.unshift(newArticle)
  writeArticles(articles)

  return NextResponse.json({ success: true, slug: newArticle.slug })
}

// PUT — update existing article
export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const articles = readArticles()
  const index = articles.findIndex((a: { slug: string }) => a.slug === body.slug)

  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  articles[index] = {
    ...articles[index],
    title: body.title,
    excerpt: body.excerpt,
    category: body.category,
    image: body.image || articles[index].image,
    content: body.content,
    readTime: `${Math.ceil(body.content.split(' ').length / 200)} min read`,
  }

  writeArticles(articles)
  return NextResponse.json({ success: true })
}

// DELETE — remove article
export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await req.json()
  const articles = readArticles()
  const filtered = articles.filter((a: { slug: string }) => a.slug !== slug)
  writeArticles(filtered)

  return NextResponse.json({ success: true })
}
