import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pf-reveal-visible');
          // Once animated, optionally unobserve
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const selector = '.pf-reveal, .pf-reveal-stagger, .pf-reveal-left, .pf-reveal-right, .pf-reveal-scale';
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    // Handle dynamically mounted or rendered elements
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        '.pf-reveal:not(.pf-reveal-visible), .pf-reveal-stagger:not(.pf-reveal-visible), .pf-reveal-left:not(.pf-reveal-visible), .pf-reveal-right:not(.pf-reveal-visible), .pf-reveal-scale:not(.pf-reveal-visible)'
      );
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
