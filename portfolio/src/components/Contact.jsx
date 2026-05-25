import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MessageSquare, CheckCircle, MapPin } from 'lucide-react';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contacts = [
  { icon: Mail, label: 'Email', value: 'mohansashankprayaga@gmail.com', href: 'mailto:mohansashankprayaga@gmail.com', color: 'text-indigo-400', border: 'hover:border-indigo-500/40' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/your-profile', href: 'https://www.linkedin.com/in/mohansashank-prayaga-b2377436a', color: 'text-blue-400', border: 'hover:border-blue-400/40' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      alert('EmailJS is not configured. Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.');
      return;
    }

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      }
    )
  .then(() => {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    alert('Something went wrong. Please try again.');
  });
};

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/7 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/25 bg-rose-500/8 mb-5">
            <MessageSquare size={12} className="text-rose-400" />
            <span className="text-xs font-mono text-rose-300/80 tracking-wider uppercase">Get In Touch</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Let's Connect
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether it's a project, internship opportunity, or just a conversation about tech —
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Location */}
            <div className="glass-card rounded-2xl p-5 border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-indigo-400" />
                <p className="text-xs font-mono text-white/35 uppercase tracking-wider">Location</p>
              </div>
              <p className="text-white/80 text-sm font-medium">Chittoor, Andhra Pradesh</p>
              <p className="text-white/40 text-xs">India · Open to remote</p>
            </div>

            {/* Contact channels */}
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`glass-card rounded-2xl p-5 border border-white/8 ${c.border} transition-all duration-200 group flex items-center gap-4`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${c.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono text-white/35 mb-0.5">{c.label}</p>
                    <p className="text-white/70 text-sm truncate group-hover:text-white transition-colors">{c.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Availability note */}
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/15 bg-emerald-500/5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <p className="text-emerald-400 text-xs font-mono font-medium">Available for Opportunities</p>
              </div>
              <p className="text-white/40 text-xs mt-2 leading-relaxed">Internships, open-source collabs & freelance projects</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-7 border border-white/8 gradient-border h-full">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Send a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={30} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-lg">Message Sent!</p>
                    <p className="text-black text-sm mt-1">I'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-black placeholder-gray/25 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-black placeholder-gray/25 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi! I'd love to discuss an internship opportunity..."
                      className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-black placeholder-gray/25 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all duration-200 resize-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 transition-all duration-300"
                  >
                    <Send size={15} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
