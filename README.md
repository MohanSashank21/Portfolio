# 🚀 Modern Portfolio Website

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A **FAANG-level modern portfolio** showcasing frontend expertise, full-stack projects, and competitive programming skills. Built with React, Vite, Tailwind CSS, and Framer Motion for stunning animations.

**[🌐 Live Demo](#)** | **[📧 Contact](#contact)** | **[💼 Projects](#projects)**

---

## ✨ Features

- ⚡ **Lightning-Fast Performance** — Vite-powered development, optimized builds, instant HMR
- 🎨 **Beautiful UI/UX** — Glassmorphism design, gradient accents, smooth animations with Framer Motion
- 📱 **Fully Responsive** — Perfect on mobile, tablet, and desktop devices
- 🎯 **SEO-Friendly** — Structured markup, meta tags, optimized for search engines
- 🔐 **Secure Contact Form** — EmailJS integration with environment variable protection
- 🎭 **Smooth Animations** — Framer Motion for engaging scroll & interaction effects
- 🌙 **Modern Stack** — React 18, Tailwind CSS 3, latest dependencies

---

## 🛠️ Tech Stack

### Frontend

- **React** 18.2 — UI library for building interactive components
- **Vite** 5.0 — Next-generation build tool with instant server start
- **Tailwind CSS** 3.4 — Utility-first CSS framework for rapid styling
- **Framer Motion** 11.0 — Animation library for smooth, performant transitions

### Tools & Libraries

- **EmailJS** — Serverless email service for contact form submissions
- **Lucide React** — Beautiful, consistent SVG icon library
- **PostCSS** — CSS transformations and autoprefixing
- **Autoprefixer** — Vendor prefix support for cross-browser compatibility

### Development

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager

---

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your EmailJS credentials:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5173`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
portfolio/
├── public/                     # Static assets
│   └── favicon.svg
├── src/
│   ├── components/             # React components
│   │   ├── Navbar.jsx          # Sticky glassmorphism navbar with smooth scrolling
│   │   ├── Hero.jsx            # Animated hero section with gradient text
│   │   ├── About.jsx           # About section with info cards
│   │   ├── Skills.jsx          # Skill categories with animated pills
│   │   ├── Projects.jsx        # Project showcase with filtering
│   │   ├── CodingProfiles.jsx  # Links to GitHub, LeetCode, Codeforces, LinkedIn
│   │   ├── Contact.jsx         # Contact form with EmailJS integration
│   │   ├── Resume.jsx          # Resume/CV section
│   │   ├── Footer.jsx          # Footer with social links
│   │   └── SectionDivider.jsx  # Decorative section separators
│   ├── data/
│   │   └── index.js            # Centralized data: skills, projects, profiles
│   ├── assets/                 # Images, icons, and other media
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles with Tailwind directives
│   └── main.jsx                # React DOM entry point
├── .env.example                # Template for environment variables
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vercel.json                 # Vercel deployment config
├── package.json                # Project metadata and dependencies
└── README.md                   # This file
```

---

## 🎨 Key Components

### Navbar

- Sticky header with glassmorphism effect
- Smooth navigation to page sections
- Responsive hamburger menu on mobile

### Hero Section

- Animated gradient text
- Call-to-action buttons
- Framer Motion entrance animations

### Skills Section

- Organized skill categories (Frontend, Backend, Databases, DSA)
- Gradient-colored skill pills
- Icon-based category headers

### Projects

- Showcase of full-stack and enterprise projects
- Project cards with descriptions, tech stack, and links
- GitHub and live demo links

### Contact Form

- EmailJS-powered email submission
- Client-side validation
- Success/error notifications

### Coding Profiles

- Direct links to GitHub, LeetCode, Codeforces, LinkedIn
- Profile descriptions and gradient styling

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get these values:**

1. Sign up at [EmailJS](https://www.emailjs.com)
2. Create a service (e.g., Gmail, Outlook)
3. Create an email template for contact form submissions
4. Copy the Service ID, Template ID, and Public Key from the dashboard

---

## 📦 Available Scripts

| Command           | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start development server with hot module reloading |
| `npm run build`   | Create optimized production build                  |
| `npm run preview` | Preview production build locally                   |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** — Automatic on every push to main

```bash
# Or deploy manually
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy

### Deploy to GitHub Pages

```bash
npm run build
# Push the dist/ folder to gh-pages branch
```

---

## 🎯 Customization

### Edit Content

Update skills, projects, and profiles in [src/data/index.js](src/data/index.js):

```javascript
export const skillCategories = [...]
export const projects = [...]
export const codingProfiles = [...]
```

### Modify Colors & Theme

Edit Tailwind configuration in [tailwind.config.js](tailwind.config.js)

### Change Fonts & Typography

Update font imports and classes in [src/index.css](src/index.css) and components

---

## 🤝 Contributing

Found a bug or want to suggest an improvement? Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact & Social

- 💼 **LinkedIn** — [Professional Profile](https://www.linkedin.com/in/mohansashank-prayaga/)
- 💻 **GitHub** — [@MohanSashank21](https://github.com/MohanSashank21)
- 🎯 **LeetCode** — [Problem Solver](https://leetcode.com/u/Mohan_Sashank21/)
- 🏆 **Codeforces** — [Competitive Programmer](https://codeforces.com/profile/mohansashank.p24)

---

## ⭐ Show Your Support

If you found this portfolio helpful or impressive, please give it a ⭐ star!

---

**Built with ❤️ by Mohan Sashank**
│ │ ├── CodingProfiles.jsx # LeetCode, GitHub, Codeforces, LinkedIn
│ │ ├── Projects.jsx # Project cards with demo links
│ │ ├── Resume.jsx # Resume download section
│ │ ├── Contact.jsx # Contact form + channels
│ │ ├── Footer.jsx # Footer with links
│ │ └── SectionDivider.jsx # Subtle section dividers
│ ├── data/
│ │ └── index.js # All content data (centralized)
│ ├── App.jsx # Root component
│ ├── main.jsx # React entry point
│ └── index.css # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json

````

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
````

## 📦 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 11** — Animations
- **Lucide React** — Icons
- **Google Fonts** — Syne + DM Sans + JetBrains Mono
