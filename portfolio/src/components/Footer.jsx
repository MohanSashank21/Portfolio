import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Heart, Mail } from 'lucide-react';
import { navLinks } from '../data/index.js';

const socials = [
  { icon: Github, href: 'https://github.com/MohanSashank21', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohansashank-prayaga/', label: 'LinkedIn' },
 
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 py-12 px-6">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Code2 size={13} className="text-white" />
              </div>
              <span className="font-display font-bold text-sm text-white/80">
                dev<span className="text-gradient">.</span>portfolio
              </span>
            </div>
            <p className="text-xs text-white/30 font-mono">BTech CSE · IIIT Sri City · 2026</p>
          </div>

          {/* Quick links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-white/35 hover:text-white/75 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-white/35 hover:text-white/80 hover:border-indigo-500/30 transition-all duration-200"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20 font-mono">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}
