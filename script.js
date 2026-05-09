document.querySelectorAll('[data-email]').forEach(el => {
  el.href = 'mailto:' + atob(el.dataset.email);
});

const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');

// Smooth scroll with dynamic header offset instead of hardcoded 100px
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

// Active nav state driven by scroll, not just click
const sections = document.querySelectorAll('#experience, #education, #certifications, #skills');

const observer = new IntersectionObserver(entries => {
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

sections.forEach(section => observer.observe(section));
