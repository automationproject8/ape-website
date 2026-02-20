'use client'
import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '📡',
    title: 'Telecom Network Construction',
    description: 'We design and implement fixed and mobile telecom infrastructure end-to-end.',
    items: ['Fiber Optic Networks (FTTH / Backbone)', 'Copper Networks', 'Mobile Network Infrastructure (2G–5G)', 'Equipment Installation & Integration', 'Telecom Civil Works'],
    color: '#2d5a8e',
  },
  {
    icon: '⚡',
    title: 'Power Networks',
    description: 'Construction and modernization works for power infrastructure at all voltage levels.',
    items: ['LV / MV Networks', 'Electrical Grid Connections', 'Transformer Substations', 'Underground & Overhead Cabling', 'Maintenance Works'],
    color: '#3a6fa0',
  },
  {
    icon: '☀️',
    title: 'Photovoltaic (PV) Park Construction',
    description: 'Comprehensive services for utility-scale and commercial solar projects.',
    items: ['Structure & PV Panel Mounting', 'Inverter Installation', 'DC & AC Cabling', 'Transformer Stations', 'Commissioning'],
    color: '#2d5a8e',
  },
  {
    icon: '🔋',
    title: 'Battery Energy Storage Systems',
    description: 'Modern energy storage solutions for grid stability and energy independence.',
    items: ['BESS Container Installation', 'Electrical & SCADA Integration', 'Grid Connection', 'Testing & Commissioning'],
    color: '#3a6fa0',
  },
  {
    icon: '🏭',
    title: 'Steel Structures & Metal Constructions',
    description: 'We manufacture and assemble steel structures for various industrial applications.',
    items: ['Industrial Warehouses & Halls', 'Equipment Support Structures', 'Technical Platforms', 'Custom Metal Fabrications'],
    color: '#2d5a8e',
  },
  {
    icon: '🪜',
    title: 'Industrial Scaffolding Installation',
    description: 'Expert scaffolding and access solutions for industrial and energy sites.',
    items: ['Industrial & Façade Access Systems', 'Specialized Scaffolding for Energy Sites', 'Qualified Assembly & Disassembly', 'Short and Long-Term Equipment Rental'],
    color: '#3a6fa0',
  },
  {
    icon: '🤖',
    title: 'Automations & Integrated AI Solutions',
    description: 'Business process automation across operational and management workflows.',
    items: ['Custom Business Applications', 'Digital Workflow & Documentation Management', 'System Integration with Cloud & IT', 'AI-Based Analytics & Optimization'],
    color: '#2d5a8e',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      }),
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #152d4a 0%, #0d1f35 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-[#4a7aa8]" />
            <span className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase font-medium">What We Do</span>
            <div className="w-10 h-px bg-[#4a7aa8]" />
          </div>
          <h2 className="reveal font-heading text-white leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Core Business <span style={{ color: '#8fb3d4' }}>Areas</span>
          </h2>
          <p className="reveal text-[#8fb3d4] mt-4 max-w-xl mx-auto font-light">
            From radio towers to solar parks — we deliver infrastructure that powers modern Europe.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal service-card relative rounded-lg border border-[#2d5a8e]/30 p-7 ${i === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6), rgba(21,45,74,0.8))' }}
            >
              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />

              <div className="text-3xl mb-4">{service.icon}</div>
              <h3
                className="font-heading text-white text-xl mb-2 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {service.title}
              </h3>
              <p className="text-[#8fb3d4] text-sm mb-5 leading-relaxed font-light">{service.description}</p>

              <div className="section-line mb-4" />

              <ul className="space-y-1.5">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[#7aa8cc] text-xs leading-relaxed">
                    <span className="text-[#4a7aa8] mt-0.5 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
