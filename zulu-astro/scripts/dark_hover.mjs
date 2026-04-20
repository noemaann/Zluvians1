import fs from 'fs';

const paths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

paths.forEach(p => {
  if (!fs.existsSync(p)) return;
  
  let css = fs.readFileSync(p, 'utf8');

  // Mate card hover
  css = css.replace(/background: rgba\(255,255,255,0\.68\);/g, "background: rgba(30, 40, 55, 0.68);");
  
  // Committee card hover
  css = css.replace(/background: rgba\(255,255,255,0\.64\);/g, "background: rgba(30, 40, 55, 0.64);");
  
  // Committee card base
  css = css.replace(/background: rgba\(255,255,255,0\.44\);/g, "background: rgba(15,20,30,0.44);");
  
  // Stats item hover
  css = css.replace(/background: rgba\(255,255,255,0\.32\);/g, "background: rgba(255,255,255,0.06);");
  
  // Cursor ring hover
  css = css.replace(/background: rgba\(255,255,255,0\.42\);/g, "background: rgba(45, 212, 191, 0.22);");

  // Hero img gradient overlay
  css = css.replace(/background: linear-gradient\(to top, rgba\(255,255,255,0\.28\)/g, "background: linear-gradient(to top, rgba(0,0,0,0.48)");

  // Quotes card gradient overlay
  css = css.replace(/background: linear-gradient\(145deg, rgba\(255,255,255,0\.28\)/g, "background: linear-gradient(145deg, rgba(255,255,255,0.08)");

  fs.writeFileSync(p, css, 'utf8');
  console.log('Successfully patched hover states on:', p);
});
