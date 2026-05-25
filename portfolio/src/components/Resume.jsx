import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, Eye, GraduationCap, Briefcase } from 'lucide-react';

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="resume" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-5">
            <FileText size={12} className="text-emerald-400" />
            <span className="text-xs font-mono text-emerald-300/80 tracking-wider uppercase">Résumé</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            My Resume
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            A snapshot of my education, skills and projects — updated and ready to share.
          </p>
        </motion.div>

        {/* Resume card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-2xl border border-white/8 overflow-hidden gradient-border"
        >
          {/* Card header */}
          <div className="p-8 border-b border-white/6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Mohan Sashank Prayaga — CV</h3>
                  <p className="text-white/40 text-sm font-mono">BTech CSE · IIIT Sri City · 2026</p>
                </div>
              </div>
              <span className="px-3 py-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
                Updated 2026
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {[
              { icon: GraduationCap, label: 'Education', value: 'BTech CSE — IIIT Sri City', sub: 'CGPA: 8.94 (3rd Semester)', color: 'text-indigo-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/35 mb-0.5">{item.label}</p>
                    <p className="text-white/85 text-sm font-medium">{item.value}</p>
                    <p className="text-white/40 text-xs">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="p-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/resume.pdf"
              download
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <Download size={16} />
              Download Resume (PDF)
            </a>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
