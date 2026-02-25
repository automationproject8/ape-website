'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Article {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/articles')
      .then((r) => r.json())
      .then((data) => { setArticles(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(slug)

    const res = await fetch('/api/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })

    if (res.ok) {
      setArticles(articles.filter((a) => a.slug !== slug))
    } else if (res.status === 401) {
      router.push('/admin')
    }
    setDeleting(null)
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Top bar */}
      <header className="relative z-10 border-b border-[#2d5a8e]/30 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(21,45,74,0.9)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-4">
          <img src="/logo1-ape.png" alt="APE" className="h-10 w-auto object-contain" />
          <div>
            <div className="text-white text-sm font-medium">Admin Panel</div>
            <div className="text-[#4a7aa8] text-xs">Blog Management</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-[#4a7aa8] text-xs hover:text-[#8fb3d4] transition-colors">
            View site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-[#4a7aa8] text-xs hover:text-red-400 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-white text-4xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
              Blog Articles
            </h1>
            <p className="text-[#4a7aa8] text-sm mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''} published</p>
          </div>
          <Link href="/admin/new"
            className="btn-primary px-6 py-3 rounded text-white font-medium tracking-[0.08em] uppercase text-sm flex items-center gap-2">
            <span>+ New Article</span>
          </Link>
        </div>

        {/* Articles list */}
        {loading ? (
          <div className="text-center py-20 text-[#4a7aa8]">Loading...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-[#4a7aa8] text-lg mb-4">No articles yet</div>
            <Link href="/admin/new" className="text-[#8fb3d4] hover:text-white transition-colors text-sm">
              Create your first article →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.slug}
                className="relative rounded-lg border border-[#2d5a8e]/30 p-6 flex items-start justify-between gap-6"
                style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.5), rgba(21,45,74,0.7))' }}>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase rounded border border-[#2d5a8e] text-[#4a7aa8]">
                      {article.category}
                    </span>
                    <span className="text-[#4a7aa8] text-xs">{article.date}</span>
                    <span className="text-[#4a7aa8] text-xs">· {article.readTime}</span>
                  </div>
                  <h2 className="font-heading text-white text-xl leading-tight mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                    {article.title}
                  </h2>
                  <p className="text-[#4a7aa8] text-sm line-clamp-1">{article.excerpt}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <a href={`/blog/${article.slug}`} target="_blank"
                    className="px-4 py-2 text-xs text-[#4a7aa8] border border-[#2d5a8e]/50 rounded hover:border-[#4a7aa8] hover:text-[#8fb3d4] transition-all">
                    View
                  </a>
                  <Link href={`/admin/edit/${article.slug}`}
                    className="px-4 py-2 text-xs text-[#4a7aa8] border border-[#2d5a8e]/50 rounded hover:border-[#4a7aa8] hover:text-[#8fb3d4] transition-all">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.slug, article.title)}
                    disabled={deleting === article.slug}
                    className="px-4 py-2 text-xs text-red-400/60 border border-red-900/30 rounded hover:border-red-400/50 hover:text-red-400 transition-all disabled:opacity-40"
                  >
                    {deleting === article.slug ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
