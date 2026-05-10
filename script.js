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
const sections = document.querySelectorAll('#experience, #projects, #education, #certifications, #skills');

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
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Typing animation
const typingEl = document.querySelector('.hero-typing');
const phrases = ['IAM Specialist', 'IT Operations Engineer', 'Cloud Engineer ', 'Security Analyst'];
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
