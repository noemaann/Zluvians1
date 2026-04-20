document.addEventListener("DOMContentLoaded", () => {

  /* ─── PAGE TRANSITION ──────────────────────────── */
  const transitionEl = document.createElement('div');
  transitionEl.className = 'page-transition';
  document.body.appendChild(transitionEl);

  // Exit animation on all internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        transitionEl.className = 'page-transition enter'; // pgIn animation
        setTimeout(() => { window.location.href = href; }, 480);
      });
    }
  });

  // Entry animation
  transitionEl.className = 'page-transition exit'; // pgOut animation

  /* Custom cursor JS logic removed */

  /* ─── PROGRESS BAR ─────────────────────────────── */
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  });

  /* ─── SIDEBAR TOGGLE ───────────────────────────── */
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

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
  if (hamburgerMenu) hamburgerMenu.addEventListener("click", toggleSidebar);
  if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFn);
  overlay.addEventListener('click', closeSidebarFn);

  /* ─── SCROLL REVEAL ────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.quote-card, .image-card, .mate-card, .committee-card, .detail-section, .stats-bar, .section-label'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay based on position in parent
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 60, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ─── IMAGE LABELS ─────────────────────────────── */
  document.querySelectorAll('.image-card').forEach((card, i) => {
    if (!card.querySelector('.img-label')) {
      const label = document.createElement('span');
      label.className = 'img-label';
      label.textContent = `No. ${String(i + 1).padStart(2, '0')}`;
      card.appendChild(label);
    }
  });

  /* ─── COMMITTEE CARD BODY WRAP ─────────────────── */
  document.querySelectorAll('.committee-card').forEach(card => {
    const children = Array.from(card.children);
    const img = children.find(c => c.tagName === 'IMG');
    const rest = children.filter(c => c.tagName !== 'IMG');
    if (img && rest.length && !card.querySelector('.committee-card-body')) {
      const body = document.createElement('div');
      body.className = 'committee-card-body';
      rest.forEach(el => body.appendChild(el));
      card.appendChild(body);
    }
  });

  /* ─── HOSTEL MATES DYNAMIC GENERATION ─────────── */
  const matesGrid = document.getElementById("matesGrid");
  if (matesGrid) {
    const mateNames = ["Jasim","Sanjay","Goutham D","Levin","Shinil","Althaf","Aashir","Noeman","Reyyan","Roshan","Nishal","Shibil","Arshad","Nithash","PP","Farseen","Aravind","Huzail","Adhin","Alan","Josekutty","Abhinav","Anuchind","Hrishi","Vaseem","Shabeel","Rasl","Adith","Shaz","Hamdan","Shon","Shemil","Amjad","Shahanad","Nihal","Geo","Sangeeth","Naseef","Anandhu","Sreedin","Faheem","Jayanth","Vaishnav","Sabith","Drupad","Goutham K","Akbar","Alphons","Shaheen","Yacoob","Aman","Adnan","Basim"];
    mateNames.forEach((name, index) => {
      const i = index + 1;
      const a = document.createElement("a");
      a.className = "mate-card";
      a.href = `member.html?id=${i}&name=${encodeURIComponent(name)}`;
      const imgSrc = encodeURI(`DP's/${name}.jpg`);
      a.innerHTML = `
        <img class="mate-photo" src="${imgSrc}" alt="${name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a3a28&color=f7f4ed&size=80'">
        <div class="mate-name">${name}</div>
      `;
      matesGrid.appendChild(a);
    });
  }

  /* ─── MEMBER PAGE ──────────────────────────────── */
  const urlParams = new URLSearchParams(window.location.search);
  const memberId = urlParams.get('id');
  const memberName = urlParams.get('name');

  if (memberId && memberName) {
    const titleEl = document.getElementById("galleryTitle");
    if (titleEl) titleEl.innerText = `${memberName}`;

    const dynamicGallery = document.getElementById("dynamicGallery");
    if (dynamicGallery) {
      for (let i = 1; i <= 6; i++) {
        const div = document.createElement("div");
        div.className = "image-card";
        div.innerHTML = `<img src="https://picsum.photos/400/300?random=${memberId * 10 + i}" alt="${memberName} photo ${i}">`;
        dynamicGallery.appendChild(div);
      }
    }
  }

  /* ─── COMMITTEE DETAIL ─────────────────────────── */
  const committeeDict = {
    "nithash": {
      name: "Nithash Committee",
      period: "August 2025 — November 2025",
      members: ["PP", "Shon", "Alan", "Sangeeth", "Aman"],
      achievements: "Nithash led the committee to organize the first mess without common starting troubles and attempted to implement hostel-wide Wi-Fi.",
      disadvantages: "Failure to distribute chicken equally, the occurrence of food corruption, and that the committee stepped down due to allegations of food corruption.",
      fallReason: "Stepped down due to allegations of food corruption."
    },
    "alphons": {
      name: "Alphons Committee",
      period: "November 2025 — February 2026",
      members: ["Alphons (Secretary)", "Goutham D", "Althaf", "Noeman", "Abhinav"],
      achievements: "Restored midnight canteen access. Repaired the long-broken washing machines in Block B.",
      disadvantages: "Budget shortfalls led to lack of sports equipment and inability to fund inter-hostel tournaments.",
      fallReason: "Term ended gracefully, though widely criticised for a chaotic farewell party."
    },
    "adnan": {
      name: "Adnan Committee",
      period: "February 2026 — May 2026",
      members: ["Adnan (Secretary)", "Basim", "Aman", "Yacoob", "Shaheen"],
      achievements: "Launched weekend gaming tournaments and fully renovated the TV room with new seating.",
      disadvantages: "Noise complaints from wardens spiked considerably. Warden relations hit an all-time low.",
      fallReason: "Dissolved at semester end as hostelites dispersed for summer holidays."
    }
  };

  const committeeId = urlParams.get('id');
  if (committeeId && committeeDict[committeeId]) {
    const data = committeeDict[committeeId];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('cName', data.name);
    set('cPeriod', data.period);
    set('cAchievements', data.achievements);
    set('cDisadvantages', data.disadvantages);
    set('cFallReason', data.fallReason);
    const cMembers = document.getElementById("cMembers");
    if (cMembers) {
      cMembers.innerHTML = "";
      data.members.forEach(m => {
        const li = document.createElement("li");
        li.innerText = m;
        cMembers.appendChild(li);
      });
    }
  }

  
  /* ─── ENHANCED 3D STATS & SCRAMBLE COUNTER ──────── */
  document.querySelectorAll('.stat-item').forEach(card => {
    
    let isRevealed = false;
    
    // Magnetic 3D Tilt Hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * -12; // tilt degrees
      const tiltY = ((x - cx) / cx) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.35s cubic-bezier(0.2, 1, 0.2, 1)';
      card.style.zIndex = 10;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 1.0s cubic-bezier(0.2, 1, 0.2, 1)';
      card.style.zIndex = 1;
    });

    // Scramble Data Counter
    const numEl = card.querySelector('.stat-num');
    if (!numEl) return;
    const targetStr = numEl.dataset.target;
    const targetVal = parseFloat(targetStr);
    const suffix = numEl.dataset.suffix || '';
    
    if (isNaN(targetVal)) return; // Exclude infinity symbols

    numEl.textContent = '0' + suffix;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isRevealed) {
        isRevealed = true;
        let count = 0;
        let frame = 0;
        
        const animate = () => {
          frame++;
          // Cyberpunk scramble phase
          if (frame < 40) {
             numEl.textContent = Math.floor(Math.random() * targetVal * 2) + suffix;
             requestAnimationFrame(animate);
             return;
          }
          
          // Exponential ease out phase
          count += (targetVal - count) * 0.03; 
          if (targetVal - count < 0.5) {
            numEl.textContent = targetVal + suffix;
            numEl.style.textShadow = '0 0 15px rgba(255,255,255,0.8)';
            numEl.style.transition = 'text-shadow 1.4s ease-out';
            setTimeout(() => numEl.style.textShadow = 'none', 350);
          } else {
            numEl.textContent = Math.ceil(count) + suffix;
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
        obs.unobserve(card);
      }
    });
    obs.observe(card);
  });


  
  /* ─── GLOBAL MOUSE TRACKING FOR BACKGROUND ─────── */
  window.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
  });
  /* ─── SCROLL HERO SEQUENCE ─────────────────────── */
  const scrollWrapper = document.querySelector('.scroll-hero-wrapper');
  const heroText = document.querySelector('.hero-text-content');
  const heroImg = document.querySelector('.hero-image-content');
  
  if (scrollWrapper && heroText && heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let progress = y / windowHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      const isMobile = window.innerWidth <= 700;
      
      if (isMobile) {
         const moveY = progress * -15;
         const textScale = 1 - (progress * 0.20); // texts shrink slightly on mobile
         heroText.style.transform = `translateY(${moveY}vh) scale(${textScale})`;
         
         heroImg.style.opacity = progress;
         const imgY = 100 * (1 - progress); 
         const imgScale = 0.9 + (0.1 * progress);
         heroImg.style.transform = `translateY(${imgY}px) scale(${imgScale})`;
      } else {
         const moveX = progress * -24; // text center moves to ~26vw left
         const textScale = 1 - (progress * 0.45); // texts shrink to 55% to fit perfectly side-by-side
         heroText.style.transform = `translateX(${moveX}vw) scale(${textScale})`;
         
         heroImg.style.opacity = progress;
         const imgX = 100 * (1 - progress); 
         const imgScale = 0.9 + (0.1 * progress);
         heroImg.style.transform = `translateY(-50%) translateX(${imgX}px) scale(${imgScale})`;
      }
    }, { passive: true });
  }

});
