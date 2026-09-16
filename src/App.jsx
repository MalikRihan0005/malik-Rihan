import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Work from './components/Work';
import ProofMetrics from './components/ProofMetrics';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [introDismissed, setIntroDismissed] = useState(false);
  useScrollReveal();

  return (
    <div className="portfolio-app">
      <ScrollProgressBar />
      <CustomCursor />
      {!introDismissed && (
        <IntroScreen onComplete={() => setIntroDismissed(true)} />
      )}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Capabilities />
        <Experience />
        <Work />
        <ProofMetrics />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
