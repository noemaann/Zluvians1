import fs from 'fs';

const paths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

paths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Fix white inset shadows framing the cards awkwardly
  css = css.replace(/rgba\(255,255,255,0\.95\)\s*inset/g, "rgba(255,255,255,0.12) inset");
  css = css.replace(/rgba\(255,255,255,0\.92\)\s*inset/g, "rgba(255,255,255,0.10) inset");
  css = css.replace(/rgba\(255,255,255,0\.98\)\s*inset/g, "rgba(255,255,255,0.15) inset");
  css = css.replace(/rgba\(255,255,255,0\.9\)\s*inset/g, "rgba(255,255,255,0.08) inset");
  css = css.replace(/rgba\(255,255,255,0\.85\)\s*inset/g, "rgba(255,255,255,0.06) inset");

  // Fix thick white borders around photos
  css = css.replace(/border: 2px solid rgba\(255,255,255,0\.88\);/g, "border: 2px solid rgba(255,255,255,0.15);");
  css = css.replace(/border-color: #fff;/g, "border-color: var(--blue-text);");
  css = css.replace(/border: 1px solid rgba\(255,255,255,0\.82\);/g, "border: 1px solid rgba(255,255,255,0.15);");
  css = css.replace(/border: 1px solid rgba\(255,255,255,0\.14\);/g, "border: 1px solid rgba(255,255,255,0.05);");

  // Fix old teal/grey light-mode gradients
  css = css.replace(/linear-gradient\(90deg,#a7c7cb,#c0cbcd,#dbe1e3,#b0b8ba,#a7c7cb\)/g, "linear-gradient(90deg, var(--blue), #0EA5E9, #8B5CF6)");
  css = css.replace(/linear-gradient\(90deg, #a7c7cb, #c0cbcd, #b0b8ba, #d8e4e9, #dbe1e3, #a7c7cb\)/g, "linear-gradient(90deg, var(--blue), #0EA5E9, #8B5CF6)");
  css = css.replace(/linear-gradient\(180deg, #a7c7cb, #b0b8ba\)/g, "linear-gradient(180deg, var(--blue), #0EA5E9)");
  css = css.replace(/linear-gradient\(180deg,#a7c7cb,#b0b8ba\)/g, "linear-gradient(180deg, var(--blue), #0EA5E9)");
  css = css.replace(/linear-gradient\(90deg,#a7c7cb,#c0cbcd,#b0b8ba,#d8e4e9,#dbe1e3,#a7c7cb\)/g, "linear-gradient(90deg, var(--blue), #0EA5E9, #8B5CF6)");

  // Hero badge background opaque white issue
  css = css.replace(/background: rgba\(255,255,255,0\.62\);/g, "background: rgba(10,15,25,0.62);");

  // List item dots still light teal
  css = css.replace(/background: #a7c7cb;/g, "background: var(--blue-text);");

  fs.writeFileSync(p, css, 'utf8');
});
