import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Rocket, Brain, Target, Star, BookOpen } from 'lucide-react';

const Section = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const cards = [
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'BTech CSE at IIIT Sri City — maintaining a strong CGPA of 8.94 through the 3rd semester, with a focus on CS fundamentals and applied problem solving.',
    color: 'from-indigo-500/15 to-violet-500/10',
    border: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Rocket,
    title: 'Ambition',
    desc: 'Aiming to break into top-tier product companies as a full-stack engineer — building scalable, user-centric products that solve real-world problems.',
    color: 'from-violet-500/15 to-purple-500/10',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Target,
    title: 'Problem Solver',
    desc: 'Consistently practicing DSA on LeetCode and Codeforces — sharpening analytical thinking through algorithms, competitive programming and system design.',
    color: 'from-amber-500/15 to-orange-500/10',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section label */}
        <Section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/8 mb-5">
              <BookOpen size={12} className="text-indigo-400" />
              <span className="text-xs font-mono text-indigo-300/80 tracking-wider uppercase">About Me</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              The Story So Far
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A curious engineer in the making — blending creativity with logic to craft
              software that's both elegant and impactful.
            </p>
          </div>
        </Section>

        {/* Main intro card */}
        <Section>
          <div className="glass-card rounded-2xl p-8 md:p-10 mb-8 gradient-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                <Star size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-1">Who I Am</h3>
                <p className="text-white/40 text-sm">CS Engineer · Builder · Lifelong Learner</p>
              </div>
            </div>
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                I'm a second-year BTech Computer Science & Engineering student at{' '}
                <span className="text-white/90 font-medium">IIIT Sri City</span>, passionate
                about turning complex problems into clean, elegant solutions through code.
              </p>
              <p>
                My journey in tech started with curiosity about how things work under the hood.
                From writing my first HTML page to building full-stack applications with React and Node.js —
                every project has been a step toward becoming the engineer I aspire to be.
              </p>
              <p>
                I'm currently deepening my expertise in{' '}
                <span className="text-indigo-300 font-medium">Data Structures & Algorithms</span>,
                exploring the world of{' '}
                <span className="text-violet-300 font-medium">AI/ML</span>, and building
                production-quality web applications that scale.
              </p>
            </div>
          </div>
        </Section>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Section key={card.title}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`glass-card rounded-2xl p-6 h-full border ${card.border} bg-gradient-to-br ${card.color} cursor-default`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${card.iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display font-semibold text-white text-base mb-2">{card.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              </Section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
