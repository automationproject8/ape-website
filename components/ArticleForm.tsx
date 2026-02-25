'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ArticleFormProps {
  mode: 'new' | 'edit'
  initialData?: {
    slug: string
    title: string
    excerpt: string
    category: string
    image: string
    content: string
  }
}

const CATEGORIES = ['Telecom', 'Energy', 'Infrastructure', 'Technology', 'Company News']

export default function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [category, setCategory] = useState(initialData?.category || 'Telecom')
  const [image, setImage] = useState(initialData?.image || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      setError('Title, excerpt and content are required.')
      return
    }
    setSaving(true)
    setError('')

    const res = await fetch('/api/articles', {
      method: mode === 'new' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: initialData?.slug,
        title, excerpt, category, image, content,
      }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else if (res.status === 401) {
      router.push('/admin')
    } else {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
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
            <div className="text-[#4a7aa8] text-xs">{mode === 'new' ? 'New Article' : 'Edit Article'}</div>
          </div>
        </div>
        <Link href="/admin/dashboard" className="text-[#4a7aa8] text-xs hover:text-[#8fb3d4] transition-colors">
          ← Back to dashboard
        </Link>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-white text-4xl"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
            {mode === 'new' ? 'New Article' : 'Edit Article'}
          </h1>
          <div className="text-[#4a7aa8] text-xs">{wordCount} words · ~{readTime} min read</div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title..."
              className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-base placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Excerpt * <span className="normal-case text-[#2d5a8e]">(shown on blog cards)</span></label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary of the article..."
              className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors resize-none"
            />
          </div>

          {/* Category + Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4a7aa8] transition-colors"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Image <span className="normal-case text-[#2d5a8e]">(filename from /public)</span></label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/my-image.jpg"
                className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
              />
            </div>
          </div>

          {/* Image preview */}
          {image && (
            <div className="rounded-lg overflow-hidden border border-[#2d5a8e]/30 h-40">
              <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          {/* Content */}
          <div>
            <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">
              Content * <span className="normal-case text-[#2d5a8e]">(use ## for headings, ### for subheadings, - for bullet points, **bold**)</span>
            </label>
            <textarea
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`## Main Heading\n\nYour article content here...\n\n### Subheading\n\nMore content...\n\n- Bullet point one\n- Bullet point two`}
              className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors resize-y font-mono leading-relaxed"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded px-4 py-3">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary px-8 py-3 rounded text-white font-medium tracking-[0.08em] uppercase text-sm disabled:opacity-50"
            >
              <span>{saving ? 'Saving...' : mode === 'new' ? 'Publish Article' : 'Save Changes'}</span>
            </button>
            <Link href="/admin/dashboard"
              className="px-6 py-3 text-sm text-[#4a7aa8] border border-[#2d5a8e]/50 rounded hover:border-[#4a7aa8] hover:text-[#8fb3d4] transition-all">
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
