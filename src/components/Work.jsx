import React from 'react';
import { projects } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export default function Work() {
  return (
    <section id="work" className="pf-section-ink" aria-label="Selected Developer Projects">
      <div className="wrap">
        <div className="pf-section-head pf-reveal">
          <div>
            <span className="pf-section-eyebrow mono">Selected work</span>
            <h2 className="pf-section-title serif">Production builds &amp; systems</h2>
          </div>
          <p className="pf-section-note">
            Multi-region cloud disaster recovery, enterprise FinOps cost remediation, zero-trust Kubernetes platforms, and high-availability systems.
          </p>
        </div>

        <div className="pf-work-grid" role="list">
          {projects.map((proj, idx) => (
            <article
              key={proj.id}
              className="pf-work-card pf-reveal-scale"
              role="listitem"
              style={{ '--delay': idx }}
            >
              <div className="pf-work-thumb" style={{ background: proj.gradient }}>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${proj.title} project`}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="pf-work-img"
                    loading="lazy"
                  />
                </a>
                <span className="pf-work-thumb-label">Project {proj.id}</span>
              </div>

              <div className="pf-work-info">
                <div>
                  <div className="pf-work-info-head">
                    <h3>{proj.title}</h3>
                    <span className="pf-work-year mono">{proj.year}</span>
                  </div>
                  <p className="pf-work-subtitle mono">{proj.subtitle}</p>
                  <p className="pf-work-desc">{proj.description}</p>
                </div>

                <div className="pf-work-foot">
                  <div className="pf-work-tags" aria-label="Technologies used">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.github}
                    className="pf-work-link mono"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
