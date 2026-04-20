import fs from 'fs';

const jsPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\fr.js',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\scripts\\scrollReveal.js'
];

jsPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let js = fs.readFileSync(p, 'utf8');

  // 1. Slow Entrance & Stagger waterfall
  js = js.replace(/opacity 0\.75s cubic-bezier\(0\.16, 1, 0\.3, 1\), transform 0\.75s cubic-bezier\(0\.16, 1, 0\.3, 1\)/g, "opacity 1.4s cubic-bezier(0.2, 1, 0.2, 1), transform 1.4s cubic-bezier(0.2, 1, 0.2, 1)");
  js = js.replace(/revealDelay \+= 65;/g, "revealDelay += 135;");
  
  // 2. Slow 3D Magnetic snap & release
  js = js.replace(/transform 0\.1s linear/g, 'transform 0.35s cubic-bezier(0.2, 1, 0.2, 1)');
  js = js.replace(/transform 0\.6s cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)/g, "transform 1.0s cubic-bezier(0.2, 1, 0.2, 1)");

  // 3. Slow frame scramble duration & ease curve
  js = js.replace(/frame < 20/g, "frame < 40");
  js = js.replace(/count \+= \(targetVal - count\) \* 0\.08;/g, "count += (targetVal - count) * 0.03;");
  js = js.replace(/text-shadow 0\.6s ease-out/g, "text-shadow 1.4s ease-out");
  js = js.replace(/setTimeout\(\(\) => numEl\.style\.textShadow = 'none', 100\);/g, "setTimeout(() => numEl.style.textShadow = 'none', 350);");

  fs.writeFileSync(p, js, 'utf8');
});

const cssPaths = [
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\act1_theme.css',
  'C:\\Users\\Shinil\\Downloads\\zulu_memories(reflectivee)\\zulu_site\\zulu-astro\\src\\styles\\act1_theme.css'
];

cssPaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  let css = fs.readFileSync(p, 'utf8');

  // Slow UI interactions utilizing a heavy inertia bezier
  css = css.replace(/transition: transform 0\.60s var\(--ease-expo\);/g, "transition: transform 1.0s cubic-bezier(0.2, 1, 0.2, 1);");
  css = css.replace(/animation: pgIn 0\.45s/g, "animation: pgIn 0.8s");
  css = css.replace(/animation: pgOut 0\.45s/g, "animation: pgOut 0.8s");

  css = css.replace(/transition: transform 0\.65s cubic-bezier\(0\.16, 1, 0\.3, 1\);/g, "transition: transform 1.4s cubic-bezier(0.2, 1, 0.2, 1);");

  css = css.replace(/transition: all 0\.4s var\(--ease-expo\);/g, "transition: all 0.8s cubic-bezier(0.2, 1, 0.2, 1);"); 
  css = css.replace(/transition: all 0\.48s var\(--ease-expo\);/g, "transition: all 0.8s cubic-bezier(0.2, 1, 0.2, 1);"); 
  css = css.replace(/transition: transform 0\.42s var\(--ease-expo\), box-shadow 0\.42s;/g, "transition: transform 0.8s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.8s;"); 
  css = css.replace(/transition: transform 0\.5s var\(--ease-expo\), box-shadow 0\.5s;/g, "transition: transform 0.8s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.8s;"); 
  
  css = css.replace(/transition: transform 0\.8s var\(--ease-expo\), filter 0\.5s;/g, "transition: transform 1.4s cubic-bezier(0.2, 1, 0.2, 1), filter 1.0s cubic-bezier(0.2, 1, 0.2, 1);");
  css = css.replace(/transition: filter 0\.55s, transform 0\.65s var\(--ease-expo\);/g, "transition: filter 1.0s cubic-bezier(0.2, 1, 0.2, 1), transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);");

  fs.writeFileSync(p, css, 'utf8');
});
