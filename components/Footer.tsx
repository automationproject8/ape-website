export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#2d5a8e]/30" style={{ background: '#0d1f35' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo5-ape.png"
                alt="Advanced Pro Engineering"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-[#4a7aa8] text-xs leading-relaxed font-light">
              Supply partners for telecommunications, energy and infrastructure solutions. Established 2017.
            </p>
          </div>

          <div>
            <div className="text-[#8fb3d4] text-xs tracking-[0.2em] uppercase font-medium mb-4">Navigation</div>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/#about' },
                { label: 'Services', href: '/#services' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[#4a7aa8] text-xs hover:text-[#8fb3d4] transition-colors">{item.label}</a>
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
