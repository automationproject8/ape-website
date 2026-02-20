'use client'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, hook this up to an API route or email service
    setSent(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d1f35 0%, #152d4a 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-[#2d5a8e]/20 rotate-45 animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-[#2d5a8e]/15 rotate-12 animate-pulse-slow delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <div className="section-line" />
              <span className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase font-medium">Get In Touch</span>
            </div>
            <h2 className="reveal font-heading text-white mb-6 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Let's Build<br /><span style={{ color: '#8fb3d4' }}>Together</span>
            </h2>
            <p className="reveal text-[#8fb3d4] leading-relaxed mb-10 font-light max-w-md">
              Whether you need telecom infrastructure, energy solutions, or engineering support — we'd love to discuss how APE can be your trusted supply partner.
            </p>

            <div className="reveal space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  ),
                  label: 'Email',
                  value: 'office@advancedproengineering.com',
                  href: 'mailto:office@advancedproengineering.com',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  ),
                  label: 'Phone',
                  value: '+40 779 312 760',
                  href: 'tel:+40779312760',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  ),
                  label: 'Headquarters',
                  value: 'Ireland',
                  href: '#',
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center border border-[#2d5a8e] text-[#4a7aa8] group-hover:border-[#4a7aa8] group-hover:text-[#8fb3d4] transition-all duration-300"
                    style={{ background: 'rgba(45,90,142,0.1)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[#4a7aa8] text-xs tracking-widest uppercase mb-0.5">{item.label}</div>
                    <div className="text-[#8fb3d4] group-hover:text-white transition-colors text-sm">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            <div className="relative rounded-lg border border-[#2d5a8e]/40 p-8"
              style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6), rgba(21,45,74,0.8))' }}>
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7aa8]/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#4a7aa8]/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7aa8]/60" />

              {sent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-heading text-white text-2xl mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>Message Sent</h3>
                  <p className="text-[#8fb3d4]">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading text-white text-2xl mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>Send a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Smith' },
                      { id: 'company', label: 'Company', type: 'text', placeholder: 'Acme Corp' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your project or requirements..."
                      required
                      className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors resize-none"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 rounded text-white font-medium tracking-[0.1em] uppercase text-sm"
                  >
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
