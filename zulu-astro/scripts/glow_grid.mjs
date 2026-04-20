import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  const spotlightCss = `
/* ─── INTERACTIVE SPOTLIGHT GLOW & GRID ──────────── */
body::before {
  content: ''; position: fixed; inset: 0; z-index: -3; pointer-events: none;
  background: radial-gradient(circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(45,212,191,0.08), rgba(139,92,246,0.06) 30%, transparent 80%);
  transition: opacity 0.5s;
}
body::after {
  content: ''; position: fixed; inset: 0; z-index: -2; pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at var(--mouse-x, -500px) var(--mouse-y, -500px), black 0%, transparent 500px);
  -webkit-mask-image: radial-gradient(circle at var(--mouse-x, -500px) var(--mouse-y, -500px), black 0%, transparent 500px);
}
`;
  if (!css.includes('INTERACTIVE SPOTLIGHT')) {
    fs.appendFileSync(p, '\\n' + spotlightCss, 'utf8');
  }
});

const jsPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js'
];

const mouseTrackJs = `
  /* ─── GLOBAL MOUSE TRACKING FOR BACKGROUND ─────── */
  window.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
  });
`;

jsPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let js = fs.readFileSync(p, 'utf8');
  if (!js.includes('GLOBAL MOUSE TRACKING')) {
    js = js.replace('/* ─── PARALLAX ON HERO ─────────────────────────── */', mouseTrackJs + '\\n\\n  /* ─── PARALLAX ON HERO ─────────────────────────── */');
    fs.writeFileSync(p, js, 'utf8');
  }
});
