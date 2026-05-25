import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Cpu,
  Brain,
  Zap,
} from 'lucide-react';

import { skillCategories } from '../data/index.js';

const iconMap = {
  Layout,
  Server,
  Database,
  Cpu,
  Brain,
};

function SkillCard({ category, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  const Icon = iconMap[category.icon] || Zap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        glass-card
        rounded-2xl
        p-6
        h-full
        border
        border-white/6
        hover:border-white/12
        transition-all
        duration-300
        group
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`
            w-11
            h-11
            rounded-xl
            bg-gradient-to-br
            ${category.color}
            flex
            items-center
            justify-center
            shadow-lg
            flex-shrink-0
            group-hover:scale-110
            transition-transform
            duration-300
          `}
        >
          <Icon size={20} className="text-white" />
        </div>

        <div>
          <h3 className="font-display font-semibold text-white text-sm">
            {category.label}
          </h3>

          <p className="text-white/30 text-xs mt-0.5 font-mono">
            {category.skills.length} skills
          </p>
        </div>
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: index * 0.08 + i * 0.05 + 0.25,
            }}
            className="
              px-3
              py-1.5
              text-xs
              font-medium
              text-white/65
              bg-white/5
              border
              border-white/8
              rounded-lg
              hover:bg-white/10
              hover:text-white/90
              hover:border-white/15
              transition-all
              duration-200
              cursor-default
            "
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);

  const titleInView = useInView(titleRef, {
    once: true,
  });

  return (
    <section
      id="skills"
      className="
        relative
        py-28
        px-6
        overflow-hidden
      "
    >
      {/* Background Blur Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            bottom-0
            left-0
            w-96
            h-96
            bg-indigo-600/6
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/2
            right-0
            w-64
            h-64
            bg-cyan-600/5
            rounded-full
            blur-3xl
          "
        />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              border
              border-cyan-500/25
              bg-cyan-500/8
              mb-5
            "
          >
            <Zap size={12} className="text-cyan-400" />

            <span
              className="
                text-xs
                font-mono
                text-cyan-300/80
                tracking-wider
                uppercase
              "
            >
              Tech Stack
            </span>
          </div>

          <h2
            className="
              font-display
              text-4xl
              md:text-5xl
              font-bold
              text-white
              mb-5
            "
          >
            Skills & Technologies
          </h2>

          <p
            className="
              text-white/50
              text-base
              md:text-lg
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Technologies I work with and explore —
            constantly growing, always curious.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={cat.id}
              category={cat}
              index={i}
            />
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="text-center mt-14"
        >
          <p
            className="
              text-xs
              font-mono
              text-white/25
              tracking-wider
            "
          >
            Continuously expanding · Always building · Never stopping
          </p>
        </motion.div>

      </div>
    </section>
  );
}