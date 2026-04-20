import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Strip old display:none blocks that targeted old shimmers to free up pseudo elements
  css = css.replace(/\.mate-card::before \{([\s\S]*?)\}/, "");
  css = css.replace(/\.committee-card::before \{([\s\S]*?)\}/, "");

  const shimmerCss = `
/* ─── OBSIDIAN GLASS SHIMMER ANIMATION ────────────── */
.mate-card::before, .committee-card::before, .image-card::before, .stat-item::before {
  content: ''; display: block !important;
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 5;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 52%, transparent 65%);
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: inherit;
}
.mate-card:hover::before, .committee-card:hover::before, .image-card:hover::before, .stat-item:hover::before {
  transform: translate3d(100%, 0, 0);
}
`;

  css += '\n' + shimmerCss;
  fs.writeFileSync(p, css, 'utf8');
});
