import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'ABOUT' },
    { href: '#work', label: 'WORK' },
    { href: '#capabilities', label: 'CAPABILITIES' },
    { href: '#contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav className={`pf-nav mono ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="pf-mark mono" aria-label="Home">
          <span className="dot" />
          MALIK RIHAN
        </a>

        <div className="pf-links mono">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="#contact" className="pf-nav-cta mono">
            LET'S TALK
          </a>

          <button
            className="pf-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="pf-mobile-drawer mono">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="pf-nav-cta mono"
            onClick={() => setMobileOpen(false)}
            style={{ marginTop: '16px' }}
          >
            LET'S TALK
          </a>
        </div>
      )}
    </>
  );
}
