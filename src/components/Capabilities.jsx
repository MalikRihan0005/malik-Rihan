import React from 'react';
import { capabilitiesDeck } from '../data/portfolioData';

export default function Capabilities() {
  return (
    <section id="capabilities" className="pf-section-stone">
      <div className="wrap">
        <div className="pf-section-head pf-reveal">
          <div>
            <span className="pf-section-eyebrow mono">Capabilities deck</span>
            <h2 className="pf-section-title serif">What I bring to the table</h2>
          </div>
          <p className="pf-section-note">
            Six technical disciplines, one dependable engineering philosophy. From edge sensor prototypes to high-availability cloud deployments.
          </p>
        </div>

        <div className="pf-deck">
          {capabilitiesDeck.map((card, idx) => (
            <div
              key={card.number}
              className="pf-deck-card pf-reveal-stagger"
              style={{ '--delay': idx }}
            >
              <span className="pf-deck-num mono">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="pf-deck-tags">
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
