export const skillCategories = [
  { id: 'frontend', label: 'Frontend', icon: 'Layout', color: 'from-indigo-500 to-violet-500', skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS'] },
  { id: 'backend', label: 'Backend', icon: 'Server', color: 'from-cyan-500 to-blue-500', skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { id: 'database', label: 'Databases', icon: 'Database', color: 'from-emerald-500 to-teal-500', skills: ['MongoDB', 'MySQL'] },
  { id: 'dsa', label: 'DSA & Problem Solving', icon: 'Cpu', color: 'from-amber-500 to-orange-500', skills: ['Data Structures', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Binary Search'] },
  { id: 'corecs', label: 'Core Computer Science', icon: 'BookOpen', color: 'from-rose-500 to-pink-500', skills: ['OOPS', 'Computer Networking', 'Operating Systems', 'Theory of Computation'] },

];

export const codingProfiles = [
  { id: 'github', name: 'GitHub', description: 'Open source projects, contributions & code repositories', url: 'https://github.com/MohanSashank21', icon: 'Github', gradient: 'from-slate-800 to-gray-900', accentColor: '#e2e8f0', borderColor: 'hover:border-slate-400' },
  { id: 'leetcode', name: 'LeetCode', description: 'Daily problem solving — Arrays, DP, Graphs & more', url: 'https://leetcode.com/u/Mohan_Sashank21/', icon: 'Code2', gradient: 'from-orange-900/60 to-amber-900/60', accentColor: '#fbbf24', borderColor: 'hover:border-amber-400' },
  { id: 'codeforces', name: 'Codeforces', description: 'Competitive programming — Rated contests & practice', url: 'https://codeforces.com/profile/mohansashank.p24', icon: 'Trophy', gradient: 'from-blue-900/60 to-indigo-900/60', accentColor: '#60a5fa', borderColor: 'hover:border-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', description: 'Professional networking & career connections', url: 'https://www.linkedin.com/in/mohansashank-prayaga/', icon: 'Linkedin', gradient: 'from-blue-800/60 to-blue-900/60', accentColor: '#93c5fd', borderColor: 'hover:border-blue-300' },
];

export const projects = [
  {
    id: 1,
    title: 'Ware2Door',
    subtitle: 'Logistics Management System',
    description:
      'A scalable, enterprise-grade logistics platform that orchestrates the full shipment lifecycle — from warehouse intake to last-mile customer delivery — with real-time tracking and a modular microservice-ready backend.',
    features: [
      'End-to-end shipment tracking',
      'Warehouse inventory management',
      'Transit hub workflow engine',
      'Delivery agency & personnel management',
      'Multi-stage status update pipeline',
    ],
    tags: ['NestJS', 'TypeScript'],
    github: 'https://github.com/IIIT-Sricity-FSD-2024-2028/7_Ware2Door',
    demo: 'https://ware2door.vercel.app',
    status: 'Completed',
    accent: 'indigo',
    icon: 'Package',
    category: 'Enterprise · Full Stack',
  },
  {
    id: 2,
    title: 'Job Portal',
    subtitle: 'Full Stack Recruitment Platform',
    description:
      'A feature-rich MERN stack job portal that bridges job seekers and recruiters. From posting and discovering jobs to managing applications and profiles — a complete hiring ecosystem in one responsive platform.',
    features: [
      'JWT-based authentication system',
      'Recruiter dashboard & job postings',
      'Candidate application management',
      'Profile & resume management',
      'Responsive, accessible UI',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'],
        github: "https://github.com/MohanSashank21/Job-Portal-Tutorial-Based-",
    status: 'In progress',
    accent: 'emerald',
    icon: 'Briefcase',
    category: 'MERN Stack · Full Stack',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
