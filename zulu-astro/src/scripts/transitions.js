document.addEventListener("astro:page-load", () => {
  let transitionEl = document.querySelector('.page-transition');
  if (!transitionEl) {
    transitionEl = document.createElement('div');
    transitionEl.className = 'page-transition';
    document.body.appendChild(transitionEl);
  }

  // Exit animation on all internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
      // Remove existing handlers to avoid duplicates in SPA
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', e => {
        e.preventDefault();
        transitionEl.className = 'page-transition enter'; // pgIn animation
        setTimeout(() => { window.location.href = href; }, 480);
      });
    }
  });

  // Entry animation
  transitionEl.className = 'page-transition exit'; // pgOut animation
});
