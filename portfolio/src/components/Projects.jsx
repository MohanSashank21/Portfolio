import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Package,
  Briefcase,
  FolderOpen,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Zap,
} from 'lucide-react';
import { projects } from '../data/index.js';

// ─── Accent palette per project ──────────────────────────────────────────────
const accentMap = {
  indigo: {
    topBar: 'from-indigo-500 via-violet-500 to-indigo-600',
    wash: 'from-indigo-500/10 via-indigo-500/4 to-transparent',
    badge: 'bg-indigo-500/12 text-indigo-300 border-indigo-500/30',
    tag: 'bg-indigo-500/10 text-indigo-200/80 border-indigo-400/20 hover:bg-indigo-500/20 hover:text-indigo-100',
    categoryChip: 'bg-indigo-500/8 text-indigo-400/80 border-indigo-500/20',
    featureDot: 'bg-indigo-400',
    cta: 'from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-600/25 hover:shadow-indigo-500/40',
    glow: 'hover:shadow-indigo-500/12',
    hoverBorder: 'hover:border-indigo-500/30',
    iconBg: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/25',
    iconColor: 'text-indigo-400',
    orb: 'bg-indigo-500/6',
  },
  emerald: {
    topBar: 'from-emerald-500 via-teal-400 to-emerald-600',
    wash: 'from-emerald-500/10 via-emerald-500/4 to-transparent',
    badge: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/30',
    tag: 'bg-emerald-500/10 text-emerald-200/80 border-emerald-400/20 hover:bg-emerald-500/20 hover:text-emerald-100',
    categoryChip: 'bg-emerald-500/8 text-emerald-400/80 border-emerald-500/20',
    featureDot: 'bg-emerald-400',
    cta: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/25 hover:shadow-emerald-500/40',
    glow: 'hover:shadow-emerald-500/12',
    hoverBorder: 'hover:border-emerald-500/30',
    iconBg: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/25',
    iconColor: 'text-emerald-400',
    orb: 'bg-emerald-500/6',
  },
};

const iconMap = { Package, Briefcase };

// ─── Individual project card ──────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  const a = accentMap[project.accent] || accentMap.indigo;
  const Icon = iconMap[project.icon] || FolderOpen;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative glass-card rounded-2xl overflow-hidden border border-white/8 ${a.hoverBorder} transition-all duration-350 hover:shadow-2xl ${a.glow} flex flex-col`}
    >
      {/* Pixel-perfect top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${a.topBar} z-10`} />

      {/* Ambient wash from top */}
      <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${a.wash} pointer-events-none`} />

      {/* Floating orb accent */}
      <div className={`absolute -top-10 -right-10 w-36 h-36 ${a.orb} rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative flex flex-col flex-1 p-7">

        {/* ── Header row ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          {/* Icon block */}
          <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${a.iconBg} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
               style={{ width: 52, height: 52 }}>
            <Icon size={22} className={a.iconColor} />
          </div>

          {/* Status + category */}
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-full border ${a.badge} leading-none`}>
              {project.status}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-mono rounded-md border ${a.categoryChip} leading-none`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* ── Title block ─────────────────────────────────── */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-white text-2xl leading-tight mb-1 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-white/35 tracking-wide">{project.subtitle}</p>
        </div>

        {/* ── Description ─────────────────────────────────── */}
        <p className="text-white/55 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* ── Features list ───────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-3">
            <Zap size={11} className={`${a.iconColor} opacity-70`} />
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest">Key Features</p>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-sm text-white/55 group-hover:text-white/65 transition-colors duration-300">
                <CheckCircle2 size={13} className={`${a.iconColor} flex-shrink-0 mt-0.5 opacity-80`} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tech stack ──────────────────────────────────── */}
        <div className="mb-7">
          <div className="flex items-center gap-1.5 mb-3">
            <Layers size={11} className="text-white/30" />
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest">Tech Stack</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + i * 0.06 + 0.35 }}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg border cursor-default transition-all duration-200 ${a.tag}`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── Action buttons (pushed to bottom) ───────────── */}
        <div className="flex gap-3 mt-auto pt-2">
          <a
            href={project.github && (project.github.toString().startsWith('http') ? project.github : `https://${project.github}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white/60 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white hover:border-white/22 transition-all duration-200"
          >
            <Github size={14} />
            Source Code
          </a>
            {/* {
    //       project.status && project.status.toString().toLowerCase() === "completed" && (
    // <a
    //   href={project.demo && (project.demo.toString().startsWith('http') ? project.demo : `https://${project.demo}`)}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white bg-gradient-to-r ${project.cta} shadow-lg rounded-xl transition-all duration-250`}
    // >
    //   <ExternalLink size={13} />
    //   Live Demo
    // </a>
  )} */}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">

      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-indigo-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-violet-600/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/8 mb-5">
            <FolderOpen size={12} className="text-indigo-400" />
            <span className="text-xs font-mono text-indigo-300/80 tracking-wider uppercase">What I've Built</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Featured Projects
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Real-world applications built from scratch — shipping full-stack features,
            learning through complexity.
          </p>
        </motion.div>

        {/* ── Project cards grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── GitHub CTA ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 glass-card rounded-2xl px-8 py-6 border border-white/7">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight size={18} className="text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="font-display font-semibold text-white text-sm">More in progress</p>
                <p className="text-white/38 text-xs mt-0.5">Follow my GitHub for the latest builds</p>
              </div>
            </div>
            <a
              href="https://github.com/MohanSashank21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white/75 border border-white/12 rounded-xl hover:border-indigo-500/45 hover:text-white hover:bg-indigo-500/8 transition-all duration-200 whitespace-nowrap"
            >
              <Github size={14} />
              View GitHub Profile
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
