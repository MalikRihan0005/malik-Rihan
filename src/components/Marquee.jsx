import React from 'react';
import { marqueeItems } from '../data/portfolioData';

export default function Marquee() {
  const allItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="pf-marquee-section" aria-hidden="true">
      <div className="pf-marquee-track">
        {allItems.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
