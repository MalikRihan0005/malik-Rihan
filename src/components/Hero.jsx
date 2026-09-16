import React, { useRef } from 'react';
import HeroBackground from './HeroBackground';
import HeroChat from './HeroChat';

export default function Hero() {
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightRef.current.style.setProperty('--sx', `${x}%`);
    spotlightRef.current.style.setProperty('--sy', `${y}%`);
  };

  return (
    <section id="hero" className="pf-hero pf-hero-interactive" onMouseMove={handleMouseMove}>
      {/* Chromatic Liquid Gradient Mesh Shader (Exact Match to Arsh Video 00:01 - 00:07) */}
      <HeroBackground />

      {/* Coordinate Grid with subtle noise */}
      <div className="pf-hero-grid" aria-hidden="true" />

      {/* Mouse Spotlight */}
      <div ref={spotlightRef} className="pf-hero-spotlight" aria-hidden="true" />

      {/* 4 Corner Disciplines Matching Video Exactly */}
      <div className="pf-discipline mono top-left">
        <span className="pip" />
        <span className="lbl">AI / ML</span>
      </div>

      <div className="pf-discipline mono top-right">
        <span className="pip" />
        <span className="lbl">FULL-STACK</span>
      </div>

      <div className="pf-discipline mono bottom-left">
        <span className="pip" />
        <span className="lbl">3D / WEBGL</span>
      </div>

      <div className="pf-discipline mono bottom-right">
        <span className="pip" />
        <span className="lbl">SYSTEMS</span>
      </div>

      {/* Hero Center Content */}
      <div className="wrap pf-hero-content-wrap">
        <h1 className="serif pf-hero-welcome">
          <span className="pf-welcome-line1">WELCOME TO THE</span>
          <span className="pf-welcome-line2">PORTFOLIO OF MALIK</span>
        </h1>

        {/* AI Chat Agent */}
        <HeroChat />
      </div>

      {/* Bottom Meta */}
      <div className="pf-hero-meta mono">
        <span style={{ textAlign: 'left', letterSpacing: '0.22em' }}>
          DAVANGERE · GMT+5:30
        </span>
      </div>
    </section>
  );
}
