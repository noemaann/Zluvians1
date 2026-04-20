import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Hide hero image badges
  css = css.replace(/\.hero-img-badge\s*{/g, ".hero-img-badge { display: none !important; ");
  
  // Hide gallery image labels
  css = css.replace(/\.img-label\s*{/g, ".img-label { display: none !important; ");

  fs.writeFileSync(p, css, 'utf8');
});
