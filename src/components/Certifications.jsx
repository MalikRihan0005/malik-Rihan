import React from 'react';
import { certifications } from '../data/portfolioData';
import { ArrowUpRight, Award } from 'lucide-react';
import Education from './Education';

export default function Certifications() {
  return (
    <section id="certifications" className="pf-section-ink">
      <div className="wrap">
        {/* Education First */}
        <Education />

        {/* Continuous Learning / Certifications */}
        <div className="pf-section-head pf-reveal">
          <div>
            <span className="pf-section-eyebrow mono">Continuous Learning</span>
            <h2 className="pf-section-title serif">Specializations &amp; credentials</h2>
          </div>
          <p className="pf-section-note">
            Hands-on technical certifications in generative AI, deep learning on edge devices, AI-assisted engineering, and database modeling.
          </p>
        </div>

        <div className="pf-cert-grid">
          {certifications.map((cert, idx) => (
            <article
              key={cert.id}
              className="pf-cert-card pf-reveal-stagger"
              style={{ '--delay': idx % 4 }}
            >
              <span className="pf-cert-num mono">{cert.id}</span>

              <div className="pf-cert-info">
                <p className="pf-cert-issuer mono">{cert.issuer}</p>
                <h3 className="pf-cert-title">{cert.title}</h3>
                <p className="pf-cert-desc">{cert.description}</p>
              </div>

              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-cert-link"
                  aria-label={`Open ${cert.title} certificate`}
                  title="View Certificate PDF"
                >
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <div
                  className="pf-cert-link"
                  style={{ opacity: 0.35, cursor: 'default' }}
                  title="Curriculum Completed"
                >
                  <Award size={16} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
