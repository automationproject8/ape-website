export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#2d5a8e]/30" style={{ background: '#0d1f35' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <circle cx="30" cy="30" r="28" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="30" cy="30" r="20" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="30" cy="30" r="12" stroke="#4a7aa8" strokeWidth="1.5" opacity="0.3" />
                  <path d="M30 2 L30 58M2 30 L58 30M8 8 L52 52M52 8 L8 52" stroke="#8fb3d4" strokeWidth="0.8" opacity="0.4" />
                  <circle cx="30" cy="30" r="4" fill="#8fb3d4" />
                </svg>
              </div>
              <div>
                <div className="font-heading text-white text-lg font-700 tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>APE</div>
                <div className="text-[#4a7aa8] text-[9px] tracking-[0.15em] uppercase leading-none mt-0.5">Advanced Pro Engineering</div>
              </div>
            </div>
            <p className="text-[#4a7aa8] text-xs leading-relaxed font-light">
              Supply partners for telecommunications, energy and infrastructure solutions. Established 2017.
            </p>
          </div>

          {/* Services quick links */}
          <div>
            <div className="text-[#8fb3d4] text-xs tracking-[0.2em] uppercase font-medium mb-4">Services</div>
            <ul className="space-y-2">
              {['Telecom Network Construction', 'Power Networks', 'PV Park Construction', 'BESS', 'Steel Structures', 'AI Solutions'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[#4a7aa8] text-xs hover:text-[#8fb3d4] transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[#8fb3d4] text-xs tracking-[0.2em] uppercase font-medium mb-4">Contact</div>
            <div className="space-y-2 text-[#4a7aa8] text-xs">
              <p>office@advancedproengineering.com</p>
              <p>+40 779 312 760</p>
              <p>Headquarters: Ireland</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {['DE', 'AT', 'IT', 'NL', 'IE', 'HU', 'RO'].map((c) => (
                <span key={c} className="px-2 py-0.5 text-[10px] text-[#4a7aa8] border border-[#2d5a8e]/50 rounded tracking-widest">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#2d5a8e]/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#2d5a8e] text-xs tracking-wider">
            © {currentYear} Advanced Pro Engineering. All rights reserved.
          </div>
          <div className="text-[#2d5a8e] text-xs tracking-wider">
            Telecom · Energy · Infrastructure
          </div>
        </div>
      </div>
    </footer>
  )
}
