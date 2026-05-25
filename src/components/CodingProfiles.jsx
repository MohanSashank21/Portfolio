import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Code2, Trophy, Linkedin, ExternalLink, Terminal } from 'lucide-react';
import { codingProfiles } from '../data/index.js';

const iconMap = { Github, Code2, Trophy, Linkedin };

function ProfileCard({ profile, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[profile.icon] || Code2;

  return (
    <motion.a
      ref={ref}
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative glass-card rounded-2xl p-6 border border-white/8 overflow-hidden cursor-pointer transition-all duration-300 ${profile.borderColor} hover:shadow-2xl hover:shadow-black/40 block`}
      aria-label={`Visit ${profile.name} profile`}
    >
      {/* Gradient backdrop on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon + arrow */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
            <Icon size={22} style={{ color: profile.accentColor }} />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white/80 group-hover:bg-white/10 transition-all duration-300">
            <ExternalLink size={14} />
          </div>
        </div>

        {/* Name & handle */}
        <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-white">
          {profile.name}
        </h3>
        <p className="text-xs font-mono mb-3" style={{ color: profile.accentColor }}>
          {profile.handle}
        </p>
        <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
          {profile.description}
        </p>

        {/* Visit link indicator */}
        <div className="flex items-center gap-1.5 mt-5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: profile.accentColor }}>
          <span>Visit Profile</span>
          <ExternalLink size={11} />
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: profile.accentColor }}
      />
    </motion.a>
  );
}

export default function CodingProfiles() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="profiles" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 mb-5">
            <Terminal size={12} className="text-violet-400" />
            <span className="text-xs font-mono text-violet-300/80 tracking-wider uppercase">Find Me Online</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Coding Profiles
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Where I code, compete, collaborate and connect with the global dev community.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {codingProfiles.map((profile, i) => (
            <ProfileCard key={profile.id} profile={profile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
