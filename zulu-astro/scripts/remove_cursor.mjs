import fs from 'fs';

// 1. Fix CSS
const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Change cursor:none to cursor:pointer globally for interactable elements
  css = css.replace(/cursor:\s*none;/g, 'cursor: pointer;');

  // Strip cursor parameter completely from body to restore native default arrow
  css = css.replace(/body\s*{([\s\S]*?)}/, function(match, inner) {
    return "body {" + inner.replace(/cursor:\s*pointer;/, '') + "}";
  });

  // Overwrite existing styles with display none
  css = css.replace(/\.cursor-dot\s*{/, '.cursor-dot { display: none !important; ');
  css = css.replace(/\.cursor-ring\s*{/, '.cursor-ring { display: none !important; ');

  fs.writeFileSync(p, css, 'utf8');
});

// 2. Fix fr.js
const frPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js';
if (fs.existsSync(frPath)) {
  let fr = fs.readFileSync(frPath, 'utf8');
  const regex = /\/\*\s*─── CUSTOM CURSOR[\s\S]*?ring\.style\.top = y;\n\s*\}\);/m;
  fr = fr.replace(regex, '/* Custom cursor JS logic removed */');
  fs.writeFileSync(frPath, fr, 'utf8');
}

// 3. Fix cursor.js
const cursorPath = 'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\cursor.js';
if (fs.existsSync(cursorPath)) {
  fs.writeFileSync(cursorPath, '// Custom cursor removed per user request.\n', 'utf8');
}

console.log('Cursor perfectly reverted to standard system pointer across all projects.');
