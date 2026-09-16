import React, { useState, useEffect, useRef } from 'react';
import { proofMetrics } from '../data/portfolioData';

function AnimatedNumber({ target, active, delay = 0 }) {
  const [val, setVal] = useState(0);
  const targetNum = parseInt(target, 10) || 0;

  useEffect(() => {
    if (!active) return;

    let startTime;
    let animId;
    const duration = 1400; // ms

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, Math.max(0, (elapsed - delay) / duration));

      if (progress > 0) {
        // easeOutExpo for ultra crisp deceleration
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setVal(Math.round(ease * targetNum));
      }

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setVal(targetNum);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [active, targetNum, delay]);

  return <span>{active ? val : target}</span>;
}

export default function ProofMetrics() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="pf-section-stone pf-proof-section">
      <div className="wrap">
        <div className="pf-proof-grid">
          {proofMetrics.map((item, idx) => (
            <div
              key={item.label}
              className="pf-proof-cell pf-reveal-stagger"
              style={{ '--delay': idx }}
              tabIndex={0}
            >
              <div className="pf-proof-num">
                <AnimatedNumber target={item.num} active={inView} delay={idx * 120} />
                {item.suffix && <span className="accent">{item.suffix}</span>}
              </div>
              <div className="pf-proof-label mono">{item.label}</div>
              <div className="pf-proof-note">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
