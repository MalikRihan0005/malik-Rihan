import React from 'react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="journey" className="pf-section-ink">
      <div className="wrap">
        <div className="pf-section-head pf-reveal">
          <div>
            <span className="pf-section-eyebrow mono">Experience &amp; Journey</span>
            <h2 className="pf-section-title serif">Production environments &amp; hands-on learning</h2>
          </div>
          <p className="pf-section-note">
            Industry internships spanning enterprise cloud automation for BFSI clients and embedded systems software.
          </p>
        </div>

        <div className="pf-experience-timeline">
          {experiences.map((exp, idx) => (
            <article
              key={exp.role}
              className={`pf-exp-card ${idx % 2 === 0 ? 'pf-reveal-left' : 'pf-reveal-right'}`}
              style={{ '--delay': idx }}
            >
              <div className="pf-exp-head">
                <div>
                  <span className="pf-exp-period mono">{exp.period}</span>
                  <h3 className="pf-exp-role">{exp.role}</h3>
                  <p className="pf-exp-company">
                    {exp.company} · <span>{exp.location}</span>
                  </p>
                </div>
              </div>

              <ul className="pf-exp-list">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
