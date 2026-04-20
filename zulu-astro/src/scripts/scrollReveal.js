document.addEventListener('DOMContentLoaded', () => {\n
  /* ─── MASSIVE SCROLL ANIMATIONS ────────────────── */
  const animClasses = ['.mate-card', '.committee-card', '.image-card', '.quote-card', '.stat-item'];
  const animElements = document.querySelectorAll(animClasses.join(', '));
  
  animElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 50px, 0) scale(0.96)';
    el.style.transition = 'opacity 1.4s cubic-bezier(0.2, 1, 0.2, 1), transform 1.4s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.4s, background 0.4s';
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
          entry.target.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }, revealDelay);
        revealDelay += 135; // stagger delay duration
        scrollObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => scrollObs.observe(el));
\n
  /* ─── RESPONSIVE BACKGROUND GRID ───────────────── */
  const gridDiv = document.createElement('div');
  gridDiv.className = 'bg-grid';
  document.body.prepend(gridDiv);
  
  const glowDiv = document.createElement('div');
  glowDiv.className = 'bg-glow-layer';
  document.body.prepend(glowDiv);
  
  window.addEventListener('mousemove', (e) => {
    // using requestAnimationFrame for butter smooth 120fps mouse tracking
    window.requestAnimationFrame(() => {
      gridDiv.style.setProperty('--mouse-x', e.clientX + 'px');
      gridDiv.style.setProperty('--mouse-y', e.clientY + 'px');
      glowDiv.style.setProperty('--mouse-x', e.clientX + 'px');
      glowDiv.style.setProperty('--mouse-y', e.clientY + 'px');
    });
  });
\n
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
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.35s cubic-bezier(0.2, 1, 0.2, 1)';
      card.style.zIndex = 10;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 1.0s cubic-bezier(0.2, 1, 0.2, 1)';
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
          if (frame < 40) {
             numEl.textContent = Math.floor(Math.random() * targetVal * 2) + suffix;
             requestAnimationFrame(animate);
             return;
          }
          
          // Exponential ease out phase
          count += (targetVal - count) * 0.03; 
          if (targetVal - count < 0.5) {
            numEl.textContent = targetVal + suffix;
            numEl.style.textShadow = '0 0 15px rgba(255,255,255,0.8)';
            numEl.style.transition = 'text-shadow 1.4s ease-out';
            setTimeout(() => numEl.style.textShadow = 'none', 350);
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
\n});