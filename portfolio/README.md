# 🚀 Portfolio — IIIT Sri City | BTech CSE

A FAANG-level modern portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 🔐 EmailJS Setup

Create a `.env` file in the project root and add your EmailJS values. You can copy the example first:

```bash
cp .env.example .env
```

Then fill in:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```

The contact form now reads these values through Vite, so the keys are not hardcoded in `Contact.jsx`.

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky glassmorphism navbar
│   │   ├── Hero.jsx           # Animated hero with gradient text
│   │   ├── About.jsx          # About section with info cards
│   │   ├── Skills.jsx         # Skill categories with pills
│   │   ├── CodingProfiles.jsx # LeetCode, GitHub, Codeforces, LinkedIn
│   │   ├── Projects.jsx       # Project cards with demo links
│   │   ├── Resume.jsx         # Resume download section
│   │   ├── Contact.jsx        # Contact form + channels
│   │   ├── Footer.jsx         # Footer with links
│   │   └── SectionDivider.jsx # Subtle section dividers
│   ├── data/
│   │   └── index.js           # All content data (centralized)
│   ├── App.jsx                # Root component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Customization

All personal content is centralized in `src/data/index.js`:

- Update `codingProfiles` with your real usernames/URLs
- Update `projects` with your actual projects
- Update contact info in `Contact.jsx`
- Replace "Your Name" in `Hero.jsx` and `Footer.jsx`

## 🚀 Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub → vercel.com
# Push to GitHub → Import in Vercel dashboard → Deploy
# Build command: npm run build
# Output directory: dist
```

## 📦 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 11** — Animations
- **Lucide React** — Icons
- **Google Fonts** — Syne + DM Sans + JetBrains Mono
