import fs from 'fs';

const JS_BLOCK = `
  /* ─── ENHANCED 3D STATS & SCRAMBLE COUNTER ──────── */
  document.querySelectorAll('.stat-item').forEach(card => {
    
    let isRevealed = false;
    
    // Magnetic 3D Tilt Hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * -12; // tilt degrees
      const tiltY = ((x - cx) / cx) * 12;
      
      card.style.transform = \`perspective(1000px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) scale3d(1.03, 1.03, 1.03)\`;
      card.style.transition = 'transform 0.1s linear';
      card.style.zIndex = 10;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.zIndex = 1;
    });

    // Scramble Data Counter
    const numEl = card.querySelector('.stat-num');
    if (!numEl) return;
    const targetStr = numEl.dataset.target;
    const targetVal = parseFloat(targetStr);
    const suffix = numEl.dataset.suffix || '';
    
    if (isNaN(targetVal)) return; // Exclude infinity symbols

    numEl.textContent = '0' + suffix;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isRevealed) {
        isRevealed = true;
        let count = 0;
        let frame = 0;
        
        const animate = () => {
          frame++;
          // Cyberpunk scramble phase
          if (frame < 20) {
             numEl.textContent = Math.floor(Math.random() * targetVal * 2) + suffix;
             requestAnimationFrame(animate);
             return;
          }
          
          // Exponential ease out phase
          count += (targetVal - count) * 0.08; 
          if (targetVal - count < 0.5) {
            numEl.textContent = targetVal + suffix;
            numEl.style.textShadow = '0 0 15px rgba(255,255,255,0.8)';
            numEl.style.transition = 'text-shadow 0.6s ease-out';
            setTimeout(() => numEl.style.textShadow = 'none', 100);
          } else {
            numEl.textContent = Math.ceil(count) + suffix;
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
        obs.unobserve(card);
      }
    });
    obs.observe(card);
  });
`;

const frPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js';
if (fs.existsSync(frPath)) {
  let fr = fs.readFileSync(frPath, 'utf8');
  // Strip out old linear counter
  fr = fr.replace(/\/\*\s*─── STATS COUNTER ANIMATION[\s\S]*?obs\.observe\(el\);\n\s*}\);/m, JS_BLOCK);
  fs.writeFileSync(frPath, fr);
}

const astroPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js';
if (fs.existsSync(astroPath)) {
  let fr2 = fs.readFileSync(astroPath, 'utf8');
  if (!fr2.includes('ENHANCED 3D STATS')) {
    fr2 = fr2.replace(/}\);$/, JS_BLOCK + '\\n});');
    fs.writeFileSync(astroPath, fr2);
  }
}

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');
  css = css.replace(/\.stat-item\s*{/, ".stat-item {\n  transform-style: preserve-3d;");
  fs.writeFileSync(p, css, 'utf8');
});
