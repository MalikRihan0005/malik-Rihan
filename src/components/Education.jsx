import React from 'react';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <div className="pf-education-block" style={{ marginBottom: '90px' }}>
      <div className="pf-section-head pf-reveal" style={{ marginBottom: '40px' }}>
        <div>
          <span className="pf-section-eyebrow mono">Academic Background</span>
          <h2 className="pf-section-title serif">Engineering foundations</h2>
        </div>
        <p className="pf-section-note">
          Rigorous academic training bridging electronics, embedded systems, and advanced information science algorithms.
        </p>
      </div>

      <div className="pf-edu-grid">
        {education.map((item, idx) => (
          <article
            key={item.degree}
            className="pf-edu-card pf-reveal-stagger"
            style={{ '--delay': idx }}
          >
            <span className="pf-edu-period mono">{item.period}</span>
            <h3>{item.degree}</h3>
            <p className="pf-edu-inst">
              {item.institution} · <span>{item.location}</span>
            </p>
            {item.grade && <span className="pf-edu-grade mono">{item.grade}</span>}
            <p className="pf-edu-details">{item.details}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
