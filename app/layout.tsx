import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Advanced Pro Engineering | Telecom & Energy Infrastructure',
  description: 'Supply partners for telecommunications, energy and infrastructure solutions. Established 2017. Operating across Europe.',
  keywords: 'telecom infrastructure, fiber optic, 5G, energy networks, photovoltaic, BESS, steel structures, APE',
  openGraph: {
    title: 'Advanced Pro Engineering',
    description: 'Supply partners for telecommunications, energy and infrastructure solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
