if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Project tabs
document.querySelectorAll('.proj-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.proj-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('proj-' + tab.dataset.proj).classList.add('active');
  });
});

// Experience tabs
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navEl = document.querySelector('nav');

if (navToggle && navEl) {
  navToggle.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!navEl.contains(e.target) && !navToggle.contains(e.target)) {
      navEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('[data-email]').forEach(el => {
  el.href = 'mailto:' + atob(el.dataset.email);
});

const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');

// Smooth scroll with dynamic header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    e.preventDefault();
    const top = targetElement.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Active nav state driven by scroll
const sections = document.querySelectorAll('#experience, #projects, #skills, #education, #certifications');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, {
  rootMargin: `-${header.offsetHeight}px 0px -60% 0px`,
  threshold: 0
});

sections.forEach(section => navObserver.observe(section));

// Scroll fade-in for cards and sections
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.fade-in').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add('visible');
  } else {
    fadeObserver.observe(el);
  }
});

// Typing animation
const typingEl = document.querySelector('.hero-typing');
const phrases = ['Identity & Access Management Specialist', 'IT Operations Engineer', 'Cloud Engineer', 'Security Analyst'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (deleting) {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
    setTimeout(typeLoop, 40);
  } else {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  }
}

if (typingEl) typeLoop();

// Back-to-top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Certifications carousel
(function () {
  const outer   = document.querySelector('.cert-track-outer');
  const track   = document.querySelector('.cert-track');
  const slides  = Array.from(document.querySelectorAll('.cert-slide'));
  const prevBtn = document.querySelector('.cert-prev');
  const nextBtn = document.querySelector('.cert-next');
  const dotsWrap = document.querySelector('.cert-dots');

  if (!outer || !slides.length) return;

  const GAP = 12;
  let currentPage = 0;

  function perPage() { return window.innerWidth <= 640 ? 2 : 4; }
  function totalPages() { return Math.ceil(slides.length / perPage()); }
  function slideWidth() { return (outer.clientWidth - GAP * (perPage() - 1)) / perPage(); }

  function setSlideSizes() {
    const w = slideWidth();
    slides.forEach(s => { s.style.width = w + 'px'; });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const btn = document.createElement('button');
      btn.className = 'cert-dot' + (i === currentPage ? ' active' : '');
      btn.setAttribute('aria-label', 'Page ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function updateState() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages() - 1;
    dotsWrap.querySelectorAll('.cert-dot').forEach((d, i) =>
      d.classList.toggle('active', i === currentPage)
    );
  }

  function goTo(page) {
    currentPage = Math.max(0, Math.min(page, totalPages() - 1));
    const offset = currentPage * (outer.clientWidth + GAP);
    track.style.transform = `translateX(-${offset}px)`;
    updateState();
  }

  prevBtn.addEventListener('click', () => goTo(currentPage - 1));
  nextBtn.addEventListener('click', () => goTo(currentPage + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentPage = 0;
      setSlideSizes();
      buildDots();
      goTo(0);
    }, 200);
  });

  setSlideSizes();
  buildDots();
  goTo(0);
})();
