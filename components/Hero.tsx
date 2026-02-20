'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Animated radar/network canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Nodes (antenna tower network)
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update & draw nodes
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(143,179,212,0.5)'
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(74,122,168,${0.4 * (1 - dist / 140)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 50%, #1e3a5f 100%)' }}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Geometric diagonal accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <div className="w-full h-full" style={{
          background: 'linear-gradient(135deg, transparent 40%, #2d5a8e 40%, #4a7aa8 60%, transparent 60%)',
        }} />
      </div>

      {/* Triangle decorative shapes (from brand) */}
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-[#4a7aa8]/40 rotate-45 animate-pulse-slow" />
      <div className="absolute bottom-32 right-36 w-10 h-10 bg-[#2d5a8e]/20 rotate-45" />
      <div className="absolute top-32 right-16 w-8 h-8 border border-[#8fb3d4]/30 rotate-12 animate-pulse-slow delay-300" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Tag line */}
          <div className="animate-fade-in flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-[#4a7aa8]" />
            <span className="text-[#8fb3d4] text-xs tracking-[0.3em] uppercase font-medium">Established 2017 · Ireland</span>
          </div>

          {/* Main heading */}
          <h1
            className="animate-fade-up anim-init font-heading text-white leading-[0.9] mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.01em' }}
          >
            Advanced<br />
            <span style={{ color: '#8fb3d4' }}>Pro</span>{' '}
            Engineering
          </h1>

          <p className="animate-fade-up delay-200 anim-init text-[#8fb3d4] text-lg leading-relaxed mb-10 max-w-xl font-light">
            Supply partners for <strong className="text-white font-medium">telecommunications, energy</strong> and infrastructure solutions. We deliver turnkey projects across Europe with over 40 expert engineers on the ground.
          </p>

          <div className="animate-fade-up delay-400 anim-init flex flex-wrap gap-4">
            <a href="#services" className="btn-primary px-8 py-3.5 rounded text-white font-medium tracking-[0.08em] uppercase text-sm">
              <span>Our Services</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded text-[#8fb3d4] font-medium tracking-[0.08em] uppercase text-sm border border-[#2d5a8e] hover:border-[#4a7aa8] hover:text-white transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          {/* Country badges */}
          <div className="animate-fade-up delay-600 anim-init mt-12 flex flex-wrap gap-2">
            {['DE', 'AT', 'IT', 'NL', 'IE', 'HU', 'RO'].map((c) => (
              <span
                key={c}
                className="px-3 py-1 text-xs text-[#8fb3d4] border border-[#2d5a8e]/50 rounded tracking-widest"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800 anim-init">
        <span className="text-[#4a7aa8] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#4a7aa8] to-transparent" />
      </div>
    </section>
  )
}
