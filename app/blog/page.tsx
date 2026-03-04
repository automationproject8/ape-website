import Link from 'next/link'
import { getAllPosts, urlFor } from '@/sanity/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Advanced Pro Engineering',
  description: 'Insights and expertise on telecom network construction, fiber optic deployment, 5G infrastructure, solar parks, and energy storage systems across Europe.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      <Navbar />
      <section className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 grid-pattern opacity-20" />
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

      <section className="py-24" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #0d1f35 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-[#4a7aa8]">No articles published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="service-card h-full rounded-lg border border-[#2d5a8e]/30 flex flex-col relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6), rgba(21,45,74,0.8))' }}>
                    <div className="w-full h-48 overflow-hidden bg-[#0d1f35]">
                      {post.mainImage ? (
                        <img src={urlFor(post.mainImage).width(600).height(300).url()} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#2d5a8e]">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />
                      <div className="flex items-center gap-3 mb-5">
                        <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase rounded border border-[#2d5a8e] text-[#4a7aa8]">
                          {post.category || 'General'}
                        </span>
                        <span className="text-[#4a7aa8] text-xs">{post.readTime}</span>
                      </div>
                      <h2 className="font-heading text-white text-xl leading-tight mb-3 group-hover:text-[#8fb3d4] transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                        {post.title}
                      </h2>
                      <p className="text-[#8fb3d4] text-sm leading-relaxed font-light flex-1 mb-6">{post.excerpt}</p>
                      <div className="section-line mb-5" />
                      <div className="flex items-center justify-between">
                        <span className="text-[#4a7aa8] text-xs">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="text-[#4a7aa8] text-xs group-hover:text-[#8fb3d4] transition-colors flex items-center gap-1">
                          Read more
                          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
