'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = ['About', 'Services', 'Contact']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#152d4a]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
              <circle cx="30" cy="30" r="28" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.5" />
              <circle cx="30" cy="30" r="20" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.4" />
              <circle cx="30" cy="30" r="12" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.3" />
              <path d="M30 2 L30 58M2 30 L58 30M8 8 L52 52M52 8 L8 52" stroke="#8fb3d4" strokeWidth="0.8" opacity="0.4" />
              <circle cx="30" cy="30" r="4" fill="#8fb3d4" />
            </svg>
          </div>
          <div>
            <div className="font-heading text-white text-xl font-700 tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>APE</div>
            <div className="text-[#8fb3d4] text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5">Advanced Pro Engineering</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link text-[#8fb3d4] hover:text-white text-sm tracking-[0.15em] uppercase font-medium transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary px-5 py-2 rounded text-white text-sm tracking-[0.1em] uppercase font-medium"
          >
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#8fb3d4] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#152d4a]/98 backdrop-blur-md border-t border-[#2d5a8e]/30 px-6 py-6 flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#8fb3d4] hover:text-white text-sm tracking-[0.15em] uppercase font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary px-5 py-2 rounded text-white text-sm tracking-[0.1em] uppercase font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            <span>Get in Touch</span>
          </a>
        </div>
      )}
    </nav>
  )
}
