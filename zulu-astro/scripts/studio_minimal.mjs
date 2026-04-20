import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // 1. Brutal Clean Background
  css = css.replace(/--bg-scene:([\s\S]*?)#050810;/m, "--bg-scene: #0a0a0a;");
  
  // Clean header tracking orbs
  css = css.replace(/header::before \{([\s\S]*?)z-index: 0;/m, "header::before { display: none;");
  css = css.replace(/animation: orbFloat 9s ease-in-out infinite alternate;/g, "");

  // 2. Strict Typography Hierarchy
  css = css.replace(/--ink:\s*#fcfcfc;([\s\S]*?)rgba\(45,212,191,0\.20\);/m, 
`--ink:        #ffffff;
  --ink-sub:    #888888;
  --ink-muted:  #555555;
  --blue:       #222222;
  --blue-text:  #a1a1aa;
  --blue-lt:    rgba(255,255,255,0.05);`);
  
  // I need to account for previous scripts which might have left 'rgba(255,255,255,0.92)' mapped instead of fcfcfc
  css = css.replace(/--ink:\s*rgba\(255,255,255,0\.92\);([\s\S]*?)rgba\(45,212,191,0\.20\);/m, 
`--ink:        #ffffff;
  --ink-sub:    #888888;
  --ink-muted:  #555555;
  --blue:       #222222;
  --blue-text:  #a1a1aa;
  --blue-lt:    rgba(255,255,255,0.05);`);

  // Metallic title
  css = css.replace(/linear-gradient\(135deg, #2DD4BF 0%, #0EA5E9 50%, #8B5CF6 100%\)/g, "linear-gradient(135deg, #ffffff 0%, #777777 100%)");

  // 3. Remove Glassmorphism (blurs)
  css = css.replace(/backdrop-filter:[^;]+;/g, '');
  css = css.replace(/-webkit-backdrop-filter:[^;]+;/g, '');

  // 4. Solid Cards & Containers
  css = css.replace(/background: rgba\(10,\s*15,\s*25,\s*0\.65\);/g, "background: #111111;"); // sidebar / detail
  css = css.replace(/background: rgba\(15,\s*20,\s*30,\s*0\.62\);/g, "background: #111111;"); // stats
  css = css.replace(/background: rgba\(15,\s*20,\s*30,\s*0\.44\);/g, "background: #111111;"); // mates / quote
  css = css.replace(/var\(--liq\)/g, "#111111"); // fallbacks
  css = css.replace(/background: rgba\(10,15,25,0\.62\);/g, "background: #111111;"); // hero badge
  css = css.replace(/background: rgba\(10,15,25,0\.58\);/g, "background: #111111;"); // close btn
  css = css.replace(/background: rgba\(15,20,30,0\.65\);/g, "background: #111111;"); // details

  // 5. Minimalist 1px Borders
  css = css.replace(/border: 1px solid var\(--liq-border\);/g, "border: 1px solid rgba(255,255,255,0.06);");
  css = css.replace(/border: 1px solid rgba\(255,255,255,0\.15\);/g, "border: 1px solid rgba(255,255,255,0.12);");

  // 6. Hover Adjustments
  css = css.replace(/background: rgba\(30,\s*40,\s*55,\s*0\.68\);/g, "background: #18181b; border-color: rgba(255,255,255,0.25);"); // mate hover
  css = css.replace(/background: rgba\(30,\s*40,\s*55,\s*0\.64\);/g, "background: #18181b; border-color: rgba(255,255,255,0.25);"); // committee hover
  css = css.replace(/background: rgba\(255,255,255,0\.06\);/g, "background: #18181b;"); // stat block hover

  // Strip arbitrary glossy overlays
  css = css.replace(/background: linear-gradient\(145deg, rgba\(255,255,255,0\.08\) 0%, transparent 55%\);/g, "display: none;");
  css = css.replace(/background: linear-gradient\(105deg, transparent 35%, rgba\(255,255,255,0\.38\) 50%, transparent 65%\);/g, "display: none;"); // sweeps

  // 7. Black and White Image Filter (Netflix Effect)
  css = css.replace(/filter: saturate\(0\.80\) brightness\(0\.88\);/g, "filter: grayscale(1) brightness(0.65);");
  css = css.replace(/filter: saturate\(1\.05\) brightness\(0\.95\);/g, "filter: grayscale(0) brightness(1.0);");
  css = css.replace(/filter: saturate\(0\.75\) brightness\(0\.80\);/g, "filter: grayscale(1) brightness(0.65);");
  css = css.replace(/filter: saturate\(1\) brightness\(0\.88\);/g, "filter: grayscale(0) brightness(1.0);");
  css = css.replace(/filter: saturate\(0\.85\) brightness\(0\.88\);/g, "filter: grayscale(1) brightness(0.65);");
  css = css.replace(/filter: saturate\(1\.05\) brightness\(0\.94\);/g, "filter: grayscale(0) brightness(1.0);");

  // Drop-shadow refinement
  css = css.replace(/box-shadow: 0 1px 0 rgba\(255,255,255,0\.12\) inset, 0 4px 16px rgba\(0,0,0,0\.06\);/g, "box-shadow: 0 8px 24px rgba(0,0,0,0.6);");
  css = css.replace(/box-shadow: 0 1px 0 rgba\(255,255,255,0\.12\) inset, 0 8px 32px rgba\(0,0,0,0\.07\), 0 2px 8px rgba\(0,0,0,0\.04\);/g, "box-shadow: 0 12px 36px rgba(0,0,0,0.5);");
  css = css.replace(/box-shadow:-1px 0 0 rgba\(255,255,255,0\.82\) inset, -24px 0 72px rgba\(0,0,0,0\.09\);/g, "box-shadow: -20px 0 60px rgba(0,0,0,0.8);");

  // Old accent gradients
  css = css.replace(/linear-gradient\(90deg, var\(--blue\), #0EA5E9, #8B5CF6\)/g, "linear-gradient(90deg, #111111, #333333, #111111)");
  css = css.replace(/linear-gradient\(180deg, var\(--blue\), #0EA5E9\)/g, "linear-gradient(180deg, #333333, #111111)");

  // Sidebar ::after 
  css = css.replace(/radial-gradient\(circle, rgba\(176,184,186,0\.10\), transparent 70%\)/g, "none");
  css = css.replace(/radial-gradient\(circle, rgba\(167,199,203,0\.12\), transparent 70%\)/g, "none");
  
  fs.writeFileSync(p, css, 'utf8');
  console.log('Processed minimal refactor:', p);
});
