import { getArticles, getArticleBySlug } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} | APE Blog`,
    description: article.excerpt,
  }
}

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      elements.push(<div key={key++} className="h-4" />)
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="font-heading text-white text-2xl mt-8 mb-3"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
          {trimmed.replace('### ', '')}
        </h3>
      )
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="font-heading text-white text-3xl mt-10 mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
          {trimmed.replace('## ', '')}
        </h2>
      )
    } else if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex items-start gap-2 text-[#8fb3d4] text-base leading-relaxed font-light">
          <span className="text-[#4a7aa8] mt-1 flex-shrink-0">›</span>
          <span dangerouslySetInnerHTML={{ __html: trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') }} />
        </li>
      )
    } else {
      elements.push(
        <p key={key++} className="text-[#8fb3d4] text-base leading-relaxed font-light"
          dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') }} />
      )
    }
  }
  return elements
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const otherArticles = getArticles().filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-[#4a7aa8] text-xs tracking-widest uppercase mb-8 hover:text-[#8fb3d4] transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase rounded border border-[#2d5a8e] text-[#4a7aa8]">
              {article.category}
            </span>
            <span className="text-[#4a7aa8] text-xs">{article.date}</span>
            <span className="text-[#4a7aa8] text-xs">· {article.readTime}</span>
          </div>

          <h1 className="font-heading text-white leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {article.title}
          </h1>

          <p className="text-[#8fb3d4] text-lg leading-relaxed font-light max-w-2xl">
            {article.excerpt}
          </p>

          {/* Hero image */}
          <div className="mt-10 rounded-lg overflow-hidden border border-[#2d5a8e]/30 h-72 md:h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #0d1f35 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-lg border border-[#2d5a8e]/30 p-8 md:p-12"
            style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.4), rgba(21,45,74,0.6))' }}>
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7aa8]/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#4a7aa8]/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7aa8]/40" />

            <div className="space-y-4">
              {renderContent(article.content)}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-[#2d5a8e]/40 p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(45,90,142,0.2), rgba(30,58,95,0.4))' }}>
            <h3 className="font-heading text-white text-2xl mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
              Need an Experienced Engineering Partner?
            </h3>
            <p className="text-[#8fb3d4] mb-6 font-light">
              Advanced Pro Engineering delivers turnkey telecom and energy infrastructure projects across Europe.
            </p>
            <Link href="/#contact" className="btn-primary inline-block px-8 py-3 rounded text-white font-medium tracking-[0.08em] uppercase text-sm">
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* More articles */}
          {otherArticles.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="section-line" />
                <span className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase font-medium">More Articles</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="group">
                    <div className="service-card rounded-lg border border-[#2d5a8e]/30 p-6"
                      style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6), rgba(21,45,74,0.8))' }}>
                      <span className="text-[#4a7aa8] text-[10px] tracking-widest uppercase">{a.category} · {a.readTime}</span>
                      <h4 className="font-heading text-white text-lg mt-2 leading-tight group-hover:text-[#8fb3d4] transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                        {a.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
