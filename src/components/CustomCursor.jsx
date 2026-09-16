import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor for precision pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let animationId;
    let isVisible = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
        document.body.classList.add('pf-cursor-enabled');
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, .pf-chat-chip, .pf-work-card, .pf-nav-link, .pf-btn, .pf-cta-email'
      );
      cursor.classList.toggle('pf-cursor--active', isInteractive);
    };

    const onMouseDown = () => cursor.classList.add('pf-cursor--active');
    const onMouseUp = (e) => {
      const isInteractive = !!e.target?.closest(
        'a, button, [role="button"], input, textarea, select, .pf-chat-chip, .pf-work-card, .pf-nav-link, .pf-btn, .pf-cta-email'
      );
      if (!isInteractive) {
        cursor.classList.remove('pf-cursor--active');
      }
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (isVisible) cursor.style.opacity = '1';
    };

    const render = () => {
      // Butter-smooth 60fps lerp
      cursorX += (mouseX - cursorX) * 0.20;
      cursorY += (mouseY - cursorY) * 0.20;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationId);
      document.body.classList.remove('pf-cursor-enabled');
    };
  }, []);

  return <div ref={cursorRef} className="pf-cursor" aria-hidden="true" />;
}
