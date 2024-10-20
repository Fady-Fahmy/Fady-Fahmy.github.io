const navLinks = document.querySelectorAll('nav ul li a'); 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 100; // Adjust this value based on your header height

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });

        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});


// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.innerText = 'Toggle Dark Mode';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('header, footer, section, h2, .nav-links a').forEach(element => {
        element.classList.toggle('dark-mode');
    });
});

// Back-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.id = 'back-to-top';
backToTopButton.innerText = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-bar .skill-level');
window.addEventListener('scroll', () => {
    skillBars.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillPosition < windowHeight) {
            skill.style.width = skill.dataset.level;
        }
    });
});

// Project card animation on load
const projectCards = document.querySelectorAll('.project-card');
window.addEventListener('load', () => {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fadeInUp');
        }, index * 150); // Stagger animations for each card
    });
});

// Intersection observer for adding/removing active class to navigation links
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
