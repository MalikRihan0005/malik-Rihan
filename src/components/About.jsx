import React, { useEffect, useRef } from 'react';
import { personalInfo, aboutFacts } from '../data/portfolioData';
import { Download, ArrowRight } from 'lucide-react';

export default function About() {
  const ringRef = useRef(null);

  useEffect(() => {
    let animId;
    const handleScroll = () => {
      if (!ringRef.current) return;
      const rect = ringRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH && rect.bottom > 0) {
        const progress = (winH - rect.top) / (winH + rect.height);
        ringRef.current.style.transform = `rotate(${progress * 360}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="pf-section-ink">
      <div className="wrap">
        <div className="pf-about-grid">
          {/* Left Column */}
          <div className="pf-about-left pf-reveal-left">
            <span className="pf-section-eyebrow mono">About</span>
            <h2 className="pf-section-title serif">The person behind the builds</h2>

            <div className="pf-about-copy">
              <p>{personalInfo.bio}</p>
              <p>{personalInfo.bioSecondary}</p>
            </div>

            <div className="pf-about-actions">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="pf-btn-primary"
              >
                <Download size={15} />
                Download résumé
              </a>
              <a href="#work" className="pf-btn-outline">
                Selected Work
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="pf-about-currently mono">
              <span className="pip" />
              <span>{personalInfo.openTo}</span>
            </div>
          </div>

          {/* Right Column: Rotating Text Ring & Profile Photo */}
          <div className="pf-about-right pf-reveal-right">
            <div className="pf-about-photo-wrap">
              <div ref={ringRef} className="pf-about-photo-ring" aria-hidden="true">
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <defs>
                    <path
                      id="about-ring-path"
                      d="M 12,100 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    fontSize="11.5"
                    fill="var(--ember)"
                    fontFamily="'JetBrains Mono', monospace"
                    style={{ letterSpacing: '3px' }}
                  >
                    <textPath href="#about-ring-path" startOffset="0%">
                      MALIK RIHAN ✦ SOFTWARE ENGINEER ✦ DEVOPS ✦ ISE ✦{' '}
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="pf-about-photo-circle">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pf-about-id">
              <span className="pf-about-id-name">{personalInfo.name}</span>
              <span className="pf-about-id-role mono">{personalInfo.kicker}</span>
            </div>

            <ul className="pf-about-facts">
              {aboutFacts.map((fact, idx) => (
                <li
                  key={fact.label}
                  className="pf-reveal-stagger"
                  style={{ '--delay': idx }}
                >
                  <span className="mono pf-about-fact-label">{fact.label}</span>
                  <span className="pf-about-fact-value">{fact.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
