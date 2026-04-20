import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // 1. Offload glassy shimmer sweep from costly generic 'left' calculations to dedicated 'transform: translateX()'
  css = css.replace(/position: absolute; top: 0; left: -100%; width: 100%; height: 100%;([\s\S]*?)transition: left 0\.55s var\(--ease-expo\);/m, 
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%;\n  transform: translate3d(-100%, 0, 0);\n$1transition: transform 0.55s var(--ease-expo);");
  css = css.replace(/\.mate-card:hover::before { left: 100%; }/g, ".mate-card:hover::before { transform: translate3d(100%, 0, 0); }");

  // 2. Offload heavy Sidebar pane from full-page layout recalculations 'right: -440px' to isolated hardware 'transform' layer
  css = css.replace(/position: fixed; top: 0; right: -440px;/g, "position: fixed; top: 0; right: 0; transform: translate3d(100.5%, 0, 0);");
  css = css.replace(/transition: right 0\.60s var\(--ease-expo\);/g, "transition: transform 0.60s var(--ease-expo);");
  css = css.replace(/\.sidebar\.active\s*{ right: 0; }/g, ".sidebar.active { transform: translate3d(0, 0, 0); }");

  // 3. Inject CSS Performance Directives to isolate cards into GPU composite loops
  const hardwareHints = "will-change: transform, opacity;\n  backface-visibility: hidden;\n  transform-style: preserve-3d;";
  css = css.replace(/\.mate-card\s*{/g, ".mate-card {\n  " + hardwareHints);
  css = css.replace(/\.committee-card\s*{/g, ".committee-card {\n  " + hardwareHints);
  css = css.replace(/\.image-card\s*{/g, ".image-card {\n  " + hardwareHints);
  css = css.replace(/\.quote-card\s*{/g, ".quote-card {\n  " + hardwareHints);

  fs.writeFileSync(p, css, 'utf8');
});

// 4. Force JavaScript Parallax and Observer animations to use strictly 3D transforms
const frPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js';
if (fs.existsSync(frPath)) {
  let fr = fs.readFileSync(frPath, 'utf8');
  fr = fr.replace(/heroH1\.style\.transform = `translateY\(\${y \* 0\.15}px\)`/g, "heroH1.style.transform = `translate3d(0, ${y * 0.15}px, 0)`");
  fr = fr.replace(/translateY\(50px\)/g, "translate3d(0, 50px, 0)");
  fr = fr.replace(/translateY\(0\)/g, "translate3d(0, 0, 0)");
  fs.writeFileSync(frPath, fr);
}

const astroPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js';
if (fs.existsSync(astroPath)) {
  let sc = fs.readFileSync(astroPath, 'utf8');
  sc = sc.replace(/translateY\(50px\)/g, "translate3d(0, 50px, 0)");
  sc = sc.replace(/translateY\(0\)/g, "translate3d(0, 0, 0)");
  fs.writeFileSync(astroPath, sc);
}

console.log('Animation pipeline successfully offloaded to composite hardware rendering layer.');
