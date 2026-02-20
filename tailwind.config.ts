import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ape-navy': '#1e3a5f',
        'ape-dark': '#152d4a',
        'ape-blue': '#2d5a8e',
        'ape-slate': '#4a7aa8',
        'ape-light': '#8fb3d4',
        'ape-accent': '#5b8db8',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
