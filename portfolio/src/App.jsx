import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import CodingProfiles from './components/CodingProfiles';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero */}
        <Hero />

        <SectionDivider />

        {/* About */}
        <About />

        <SectionDivider />

        {/* Skills */}
        <Skills />

        <SectionDivider />

        {/* Coding Profiles */}
        <CodingProfiles />

        <SectionDivider />

        {/* Projects */}
        <Projects />

        <SectionDivider />

        {/* Resume */}
        <Resume />

        <SectionDivider />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
