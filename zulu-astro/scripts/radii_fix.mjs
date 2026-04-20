import fs from 'fs';

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Tighten border radii for sleek geometry
  css = css.replace(/--r-sm:\s*10px;/g, "--r-sm: 4px;");
  css = css.replace(/--r-md:\s*16px;/g, "--r-md: 6px;");
  css = css.replace(/--r-lg:\s*22px;/g, "--r-lg: 8px;");
  css = css.replace(/--r-xl:\s*32px;/g, "--r-xl: 12px;");
  css = css.replace(/--r-2xl:\s*44px;/g, "--r-2xl: 16px;");

  fs.writeFileSync(p, css, 'utf8');
});
