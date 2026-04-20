import fs from 'fs';

const paths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

paths.forEach(p => {
  if (!fs.existsSync(p)) return;
  
  let css = fs.readFileSync(p, 'utf8');

  // Root backgrounds
  css = css.replace(
/--bg-scene:([\s\S]*?)#fdfdfd;/m,
`--bg-scene:
    radial-gradient(ellipse at top left, rgba(67, 56, 202, 0.20), transparent 50%),
    radial-gradient(ellipse at top right, rgba(14, 165, 233, 0.15), transparent 55%),
    radial-gradient(ellipse at bottom left, rgba(45, 212, 191, 0.15), transparent 55%),
    radial-gradient(ellipse at bottom right, rgba(162, 28, 175, 0.15), transparent 50%),
    radial-gradient(ellipse at center, rgba(236, 72, 153, 0.10), transparent 60%),
    #050810;`
  );

  // Liquid Panels
  css = css.replace(
/--liq:\s*rgba\(255,\s*255,\s*255,\s*0\.55\);([\s\S]*?)--liq-inner:\s*rgba\(255,\s*255,\s*255,\s*0\.25\);/m,
`--liq:            rgba(20, 25, 40, 0.45);
  --liq-hover:      rgba(35, 45, 65, 0.65);
  --liq-deep:       rgba(10, 15, 25, 0.60);
  --liq-border:     rgba(255, 255, 255, 0.15);
  --liq-border-dim: rgba(255, 255, 255, 0.08);
  --liq-shine-t:    rgba(255, 255, 255, 0.25);
  --liq-inner:      rgba(255, 255, 255, 0.05);`
  );

  // Typography Palette
  css = css.replace(
/--ink:\s*rgba\(30,42,44,0\.88\);([\s\S]*?)rgba\(167,199,203,0\.18\);/m,
`--ink:        rgba(255,255,255,0.92);
  --ink-sub:    rgba(255,255,255,0.72);
  --ink-muted:  rgba(255,255,255,0.50);

  /* ── Accent ── */
  --blue:       #2DD4BF;
  --blue-text:  #67E8F9;
  --blue-lt:    rgba(45,212,191,0.20);`
  );

  // Hardcoded fixes for darker context
  css = css.replace(/rgba\(0,0,0,0\.58\)/g, "var(--ink)"); // hamburger lines
  css = css.replace(/rgba\(0,0,0,0\.82\)/g, "var(--ink)"); // h1 color
  css = css.replace(/#3b6268 0%, #4b7a82 40%, #7ca1a6 70%, #a7c7cb 100%/g, "#2DD4BF 0%, #0EA5E9 50%, #8B5CF6 100%"); // h1 gradient
  
  // Page Transition fix
  css = css.replace(/background: rgba\(255,255,255,0\.55\);([\s\S]*?)z-index: 99997;/g, `background: rgba(10,15,25,0.65);\n  backdrop-filter: var(--blur-heavy); -webkit-backdrop-filter: var(--blur-heavy);\n  z-index: 99997;`);
  
  // Sidebar fix
  css = css.replace(/background: rgba\(255,255,255,0\.56\);/g, "background: rgba(10, 15, 25, 0.65);");
  
  // Custom Close button
  css = css.replace(/background: rgba\(255,255,255,0\.58\);([\s\S]*?)border: 1px solid rgba\(255,255,255,0\.78\);/g, "background: rgba(10,15,25,0.58);\n  border: 1px solid rgba(255,255,255,0.28);");

  // Quotes quote symbol
  css = css.replace(/color: rgba\(0,0,0,0\.05\);/g, "color: rgba(255,255,255,0.08);");

  // Stats bar text background overlapping
  css = css.replace(/background: rgba\(255,255,255,0\.52\);/g, "background: rgba(15,20,30,0.62);");
  
  // Detail container fix
  css = css.replace(/background: rgba\(255,255,255,0\.50\);/g, "background: rgba(15,20,30,0.65);");

  // Quote cards background fix
  css = css.replace(/background: rgba\(255,255,255,0\.44\);/g, "background: rgba(15,20,30,0.44);");

  fs.writeFileSync(p, css, 'utf8');
  console.log('Successfully set Dark Theme on:', p);
});
