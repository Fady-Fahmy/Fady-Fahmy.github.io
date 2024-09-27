// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Smooth scroll into view
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active link
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Highlight the active section while scrolling
window.addEventListener('scroll', () => {
    let currentSection = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 50) { // Adjust the offset value if needed
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href').substring(1) === currentSection) {
            anchor.classList.add('active');
        }
    });
});

// Toggle dark mode functionality
const darkModeToggle = document.querySelector('.dark-mode-btn');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('header, footer, section').forEach(element => {
        element.classList.toggle('dark-mode');
    });
    
    // Change button text based on the mode
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Dark mode persistence across sessions (Optional feature)
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelectorAll('header, footer, section').forEach(element => {
        element.classList.add('dark-mode');
    });
    darkModeToggle.textContent = 'Light Mode';
}

darkModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
