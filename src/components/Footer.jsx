import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pf-footer mono">
      <div className="wrap pf-footer-row">
        <span>© {personalInfo.year} {personalInfo.name}</span>

        <div className="pf-footer-links">
          <a
            href={personalInfo.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`}>Email</a>
          <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </div>

        <a href="#hero" onClick={scrollToTop} className="pf-back-to-top">
          <span>Back to top</span>
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
