'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #152d4a 50%, #1e3a5f 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <img src="/logo1-ape.png" alt="APE" className="h-16 w-auto object-contain mx-auto mb-4" />
          <div className="text-[#4a7aa8] text-xs tracking-[0.3em] uppercase">Admin Panel</div>
        </div>

        {/* Card */}
        <div className="relative rounded-lg border border-[#2d5a8e]/40 p-8"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.8), rgba(21,45,74,0.9))' }}>
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7aa8]/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#4a7aa8]/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#4a7aa8]/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7aa8]/40" />

          <h1 className="font-heading text-white text-3xl mb-8 text-center"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
            Sign In
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="text-[#4a7aa8] text-xs tracking-widest uppercase block mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1f35]/60 border border-[#2d5a8e]/50 rounded px-4 py-3 text-white text-sm placeholder-[#2d5a8e] focus:outline-none focus:border-[#4a7aa8] transition-colors"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800/30 rounded px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded text-white font-medium tracking-[0.1em] uppercase text-sm disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-[#4a7aa8] text-xs hover:text-[#8fb3d4] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
