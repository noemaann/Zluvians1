document.addEventListener("astro:page-load", () => {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const sidebar = document.getElementById("sidebar");

  if (!hamburgerMenu || !sidebar) return;

  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    sidebar.classList.add("active");
    hamburgerMenu.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebarFn() {
    sidebar.classList.remove("active");
    hamburgerMenu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    if (sidebar.classList.contains("active")) {
      closeSidebarFn();
    } else {
      openSidebar();
    }
  }

  // Use cloneNode hack to avoid multiple event listeners if running on page transitions
  const newHamburger = hamburgerMenu.cloneNode(true);
  hamburgerMenu.parentNode.replaceChild(newHamburger, hamburgerMenu);
  newHamburger.addEventListener("click", toggleSidebar);

  overlay.addEventListener('click', closeSidebarFn);
});
