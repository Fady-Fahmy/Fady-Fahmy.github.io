// Smooth scrolling for navigation links 
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Set the initial dark mode class based on a persisted theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Save dark mode state to localStorage
localStorage.setItem('theme', 'dark');

// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

