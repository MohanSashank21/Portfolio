import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Sparkles, MapPin, GraduationCap } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg"
    >
      {/* Animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl animate-float2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/4 rounded-full blur-3xl" />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [-12, 12, -12], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-16 w-16 h-16 border border-indigo-500/20 rounded-2xl rotate-12"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-28 left-12 w-10 h-10 border border-cyan-500/20 rounded-xl rotate-45"
        />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 left-10 w-6 h-6 bg-violet-500/15 rounded-full"
        />
        <motion.div
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/4 right-1/3 w-4 h-4 bg-cyan-500/15 rounded-full"
        />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <Sparkles size={12} className="text-indigo-400" />
          <span className="text-xs font-medium text-white/60 font-mono tracking-wider">
            Open to opportunities • Building & Learning
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div {...fadeUp(0.2)}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4">
            <span className="text-white/95">Hi, I'm</span>
            <br />
            <span className="animated-gradient-text">Mohan Sashank Prayaga</span>
          </h1>
        </motion.div>

        {/* Role tags */}
        <motion.div {...fadeUp(0.35)} className="flex flex-wrap items-center justify-center gap-2 mt-5 mb-6">
          {['Full Stack Developer', 'AI/ML Enthusiast', 'DSA Practitioner'].map((role) => (
            <span
              key={role}
              className="px-3 py-1 text-xs font-mono font-medium text-indigo-300/80 bg-indigo-500/8 border border-indigo-500/20 rounded-full"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.45)}
          className="text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-4 font-body"
        >
          BTech CSE student at{' '}
          <span className="text-white/80 font-medium">IIIT Sri City</span>, passionate
          about building scalable web applications, solving complex problems with elegant
          algorithms, and exploring the frontiers of AI/ML.
        </motion.p>

        {/* Info chips */}
        <motion.div {...fadeUp(0.5)} className="flex items-center justify-center gap-4 mb-10 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-indigo-400" />
            Chittoor, Andhra Pradesh
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1.5">
            <GraduationCap size={12} className="text-violet-400" />
            CGPA: 8.94 (3rd Semester)
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            View My Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="../Resume.pdf"
            download
            className="group flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white/80 text-sm font-medium rounded-xl hover:border-indigo-500/40 hover:text-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/20 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
