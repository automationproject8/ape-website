import { getPostBySlug, getAllSlugs, urlFor } from '@/sanity/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | APE Blog`,
    description: post.excerpt,
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-heading text-white text-3xl mt-10 mb-4"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading text-white text-2xl mt-8 mb-3"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#8fb3d4] text-base leading-relaxed font-light">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#4a7aa8] pl-6 italic text-[#8fb3d4] my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="space-y-2 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="space-y-2 my-4 list-decimal list-inside text-[#8fb3d4]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-2 text-[#8fb3d4] text-base leading-relaxed font-light">
        <span className="text-[#4a7aa8] mt-1 flex-shrink-0">›</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-white font-medium">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-lg overflow-hidden border border-[#2d5a8e]/30">
        <img src={urlFor(value).width(800).url()} alt={value.alt || ''} className="w-full object-cover" />
      </div>
    ),
  },
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <main>
      <Navbar />
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
              {post.category}
            </span>
            <span className="text-[#4a7aa8] text-xs">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="text-[#4a7aa8] text-xs">· {post.readTime}</span>
          </div>
          <h1 className="font-heading text-white leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {post.title}
          </h1>
          <p className="text-[#8fb3d4] text-lg leading-relaxed font-light max-w-2xl">{post.excerpt}</p>
          {post.mainImage && (
            <div className="mt-10 rounded-lg overflow-hidden border border-[#2d5a8e]/30 h-72 md:h-96">
              <img src={urlFor(post.mainImage).width(1200).height(600).url()} alt={post.title}
                className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #0d1f35 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-lg border border-[#2d5a8e]/30 p-8 md:p-12"
            style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.4), rgba(21,45,74,0.6))' }}>
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7aa8]/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#4a7aa8]/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7aa8]/40" />
            <div className="space-y-4">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </div>
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
        </div>
      </section>
      <Footer />
    </main>
  )
}
