import Link from 'next/link'
import { articles } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Advanced Pro Engineering',
  description: 'Insights and expertise on telecom network construction, fiber optic deployment, 5G infrastructure, solar parks, and energy storage systems across Europe.',
}

export default function BlogPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          style={{ background: 'linear-gradient(135deg, transparent 40%, #2d5a8e 40%, #4a7aa8 60%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-[#4a7aa8]" />
            <span className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase font-medium">Industry Insights</span>
          </div>
          <h1 className="font-heading text-white mb-4 leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            APE <span style={{ color: '#8fb3d4' }}>Blog</span>
          </h1>
          <p className="text-[#8fb3d4] max-w-xl font-light leading-relaxed">
            Expert perspectives on telecom infrastructure, energy construction, and engineering across Europe.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #0d1f35 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <article className="service-card h-full rounded-lg border border-[#2d5a8e]/30 p-7 flex flex-col relative"
                  style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6), rgba(21,45,74,0.8))' }}>

                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />

                  {/* Category & meta */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase rounded border border-[#2d5a8e] text-[#4a7aa8]">
                      {article.category}
                    </span>
                    <span className="text-[#4a7aa8] text-xs">{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-white text-xl leading-tight mb-3 group-hover:text-[#8fb3d4] transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#8fb3d4] text-sm leading-relaxed font-light flex-1 mb-6">
                    {article.excerpt}
                  </p>

                  <div className="section-line mb-5" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#4a7aa8] text-xs">{article.date}</span>
                    <span className="text-[#4a7aa8] text-xs group-hover:text-[#8fb3d4] transition-colors flex items-center gap-1">
                      Read more
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
