import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="pf-cta" aria-label="Contact Malik Rihan">
      <div className="wrap pf-reveal">
        <span
          className="pf-section-eyebrow mono"
          style={{ display: 'block', marginBottom: '20px' }}
        >
          ✦ Get in touch
        </span>

        <h2 className="serif">
          Got an opportunity<br />worth <em>building?</em>
        </h2>

        <p>
          Tell me what you're working on — I’m always open to discussing software engineering roles,
          DevOps cloud opportunities, or high-impact projects.
        </p>

        {/* Large interactive email matching Arsh's signature style */}
        <div style={{ marginTop: '46px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="pf-cta-email"
            title="Click to send email"
          >
            {personalInfo.email}
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="pf-contact-pill mono"
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              fontSize: '11px',
              letterSpacing: '0.12em',
              background: copied ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              borderColor: copied ? '#4ade80' : 'rgba(255, 255, 255, 0.18)',
              color: copied ? '#4ade80' : 'var(--paper)',
              transition: 'all 0.25s ease',
            }}
          >
            {copied ? <Check size={12} color="#4ade80" /> : <Copy size={12} color="var(--ember)" />}
            {copied ? 'EMAIL COPIED TO CLIPBOARD' : 'COPY EMAIL'}
          </button>
        </div>

        {/* Meta Pills */}
        <div className="pf-contact-meta-pills mono" style={{ marginTop: '36px', justifyContent: 'center' }}>
          <a href={`tel:${personalInfo.phone}`} className="pf-contact-pill">
            <Phone size={13} color="var(--ember)" />
            {personalInfo.phone}
          </a>
          <span className="pf-contact-pill">
            <MapPin size={13} color="var(--ember)" />
            {personalInfo.location} · GMT+5:30
          </span>
          <a
            href="/Malik_Rihan_Resume.pdf"
            download="Malik_Rihan_Resume.pdf"
            className="pf-contact-pill"
            style={{ color: 'var(--ember)', borderColor: 'var(--ember)' }}
          >
            Download Résumé
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
