'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #1e3a5f 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Vertical decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2d5a8e] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Text */}
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <div className="section-line" />
              <span className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase font-medium">Who We Are</span>
            </div>

            <h2 className="reveal font-heading text-white mb-8 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Integrated Construction<br />
              <span style={{ color: '#8fb3d4' }}>Across Europe</span>
            </h2>

            <div className="reveal space-y-5 text-[#8fb3d4] leading-relaxed font-light">
              <p>
                Advanced Pro Engineering is a company specialized in providing <span className="text-white font-medium">integrated construction services</span> for telecommunications and energy infrastructure. We deliver turnkey projects through our own teams of engineers, technicians, and skilled personnel.
              </p>
              <p>
                We cover the entire execution chain — from construction and installation to <span className="text-white font-medium">maintenance and modernization</span>. Our 40+ experienced field and back-office engineers bring international expertise across seven European markets.
              </p>
            </div>

            <div className="reveal mt-10 flex flex-col sm:flex-row gap-6">
              {[
                { label: 'Engineers', value: '40+', sub: 'Field & back-office' },
                { label: 'Countries', value: '7', sub: 'European markets' },
                { label: 'Founded', value: '2017', sub: 'Ireland HQ' },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#2d5a8e] pl-4">
                  <div className="font-heading text-white text-3xl font-700" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{item.value}</div>
                  <div className="text-[#4a7aa8] text-xs tracking-widest uppercase mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="reveal relative">
            <div className="relative rounded-lg overflow-hidden border border-[#2d5a8e]/40 p-8"
              style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.8), rgba(45,90,142,0.3))' }}>

              {/* Radar animation */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border border-[#4a7aa8]/40" />
                <div className="absolute inset-4 rounded-full border border-[#4a7aa8]/30" />
                <div className="absolute inset-8 rounded-full border border-[#4a7aa8]/20" />
                <div className="absolute inset-12 rounded-full border border-[#4a7aa8]/15" />
                {/* Rotating radar sweep */}
                <div className="absolute inset-0 rounded-full animate-rotate-slow origin-center"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 270deg, rgba(74,122,168,0.15) 360deg)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#8fb3d4] animate-pulse" />
                </div>
                {/* Blip dots */}
                {[
                  { top: '15%', left: '60%' }, { top: '55%', left: '20%' },
                  { top: '70%', left: '70%' }, { top: '30%', left: '35%' },
                ].map((pos, i) => (
                  <div key={i} className="absolute w-2 h-2 rounded-full bg-[#5b8db8] animate-pulse-slow"
                    style={{ ...pos, animationDelay: `${i * 0.7}s` }} />
                ))}
              </div>

              <div className="text-center">
                <div className="font-heading text-white text-xl font-700 tracking-widest mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                  NETWORK COVERAGE
                </div>
                <div className="text-[#4a7aa8] text-xs tracking-[0.2em] uppercase">Germany · Austria · Italy · Netherlands · Ireland · Hungary · Romania</div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7aa8]/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#4a7aa8]/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7aa8]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
