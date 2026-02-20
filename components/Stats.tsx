'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1800
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          setCount(Math.floor(progress * target))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 40, suffix: '+', label: 'Expert Engineers', sub: 'Field & back-office' },
  { value: 7, suffix: '', label: 'European Countries', sub: 'International reach' },
  { value: 5, suffix: '', label: 'Core Business Areas', sub: 'Full-spectrum solutions' },
  { value: 2017, suffix: '', label: 'Year Founded', sub: 'Based in Ireland' },
]

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #1e3a5f 0%, #152d4a 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(45,90,142,0.1) 0%, transparent 50%, rgba(45,90,142,0.1) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#2d5a8e]/30">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 py-8 text-center group">
              <div
                className="font-heading text-white mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#8fb3d4] text-sm font-medium mb-0.5">{stat.label}</div>
              <div className="text-[#4a7aa8] text-xs tracking-wider">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
