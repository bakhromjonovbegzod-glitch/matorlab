import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleCatalog from './components/VehicleCatalog';
import Engine3DSection from './components/Engine3DSection';
import LearningSection from './components/LearningSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const SECTION_IDS = ['bosh-sahifa', 'avtomobillar', 'dvigatellar', 'bilim', 'yangiliklar', 'aloqa'];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('motorlab-theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const [activeSection, setActiveSection] = useState('bosh-sahifa');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('motorlab-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={handleToggleTheme} />
      <main>
        <Hero />
        <VehicleCatalog />
        <Engine3DSection />
        <LearningSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
