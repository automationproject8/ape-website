# Advanced Pro Engineering — Website

Official website for **Advanced Pro Engineering (APE)** — Supply partners for telecommunications, energy and infrastructure solutions.

Built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. Deployed on **Vercel**.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ape-website/
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Main page (imports all sections)
│   └── globals.css      # Global styles, animations, brand tokens
├── components/
│   ├── Navbar.tsx       # Sticky navigation
│   ├── Hero.tsx         # Animated hero with canvas network
│   ├── About.tsx        # Company overview + radar animation
│   ├── Stats.tsx        # Animated counters
│   ├── Services.tsx     # All 7 core business areas
│   ├── Contact.tsx      # Contact form + details
│   └── Footer.tsx       # Footer with links
├── public/              # Static assets (add logo, images here)
└── ...config files
```

---

## 🌐 Deploying to Vercel

### Option 1: Via Vercel Dashboard (recommended)

1. Push this repo to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js — click **Deploy**
5. Done! Your site is live.

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## 📤 Pushing to GitHub

```bash
# From inside the ape-website folder:
git init
git add .
git commit -m "Initial commit — APE website"
git branch -M main
git remote add origin https://github.com/automationproject8/ape-website.git
git push -u origin main
```

---

## ✏️ Customizing Content

- **Colors**: Edit CSS variables in `app/globals.css`
- **Content**: Edit text directly in each component in `components/`
- **Contact form**: Hook up `components/Contact.tsx` to an email API (e.g. Resend, SendGrid, or a Next.js API route)
- **Logo/images**: Place files in `/public` and reference as `/your-image.png`

---

© 2025 Advanced Pro Engineering
