import fs from 'fs';

// 1. ADD CSS
const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // append bg-grid CSS
  const gridCss = `
/* ─── INTERACTIVE BACKGROUND GRID ─────────────────── */
.bg-grid {
  position: fixed; inset: 0; z-index: -2; pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 500px);
  -webkit-mask-image: radial-gradient(circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 500px);
}
.bg-glow-layer {
  position: fixed; inset: 0; z-index: -3; pointer-events: none;
  background: radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255,255,255,0.03), transparent 100%);
}
`;
  if (!css.includes('.bg-grid')) {
    css += '\n' + gridCss;
    fs.writeFileSync(p, css, 'utf8');
  }
});

// 2. ADD JAVASCRIPT
const jsBlocks = `
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
`;

const frPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js';
if (fs.existsSync(frPath)) {
  let fr = fs.readFileSync(frPath, 'utf8');
  if (!fr.includes('bg-grid')) {
    fr = fr.replace(/}\);$/, jsBlocks + '\\n});');
    fs.writeFileSync(frPath, fr);
  }
}

const astroPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js';
if (fs.existsSync(astroPath)) {
  let fr2 = fs.readFileSync(astroPath, 'utf8');
  if (!fr2.includes('bg-grid')) {
    fr2 = fr2.replace(/}\);$/, jsBlocks + '\\n});');
    fs.writeFileSync(astroPath, fr2);
  }
}

console.log('Successfully injected interactive background layer mappings.');
