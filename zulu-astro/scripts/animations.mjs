import fs from 'fs';

const JS_BLOCK = `
  /* ─── MASSIVE SCROLL ANIMATIONS ────────────────── */
  const animClasses = ['.mate-card', '.committee-card', '.image-card', '.quote-card', '.stat-item'];
  const animElements = document.querySelectorAll(animClasses.join(', '));
  
  animElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.96)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, background 0.4s';
  });

  let revealDelay = 0;
  let lastIntersect = 0;
  const scrollObs = new IntersectionObserver((entries) => {
    const now = Date.now();
    if (now - lastIntersect > 150) revealDelay = 0; // reset delay if scrolling stopped briefly
    lastIntersect = now;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, revealDelay);
        revealDelay += 65; // stagger delay duration
        scrollObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => scrollObs.observe(el));
`;

const frPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js';
if (fs.existsSync(frPath)) {
  let fr = fs.readFileSync(frPath, 'utf8');
  fr = fr.replace(/}\);$/, JS_BLOCK + '\\n});');
  fs.writeFileSync(frPath, fr);
}

const astroPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js';
if (fs.existsSync(astroPath)) {
  fs.writeFileSync(astroPath, "document.addEventListener('DOMContentLoaded', () => {\\n" + JS_BLOCK + "\\n});");
}
