// Smooth scrolling for all anchor links and update active link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        if (this.tagName === 'A') {
            this.classList.add('active');
        }
    });
});

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Set the initial theme based on local storage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Add event listener to the dark mode toggle button
document.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Toggle the visibility of the mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('visible');
}

// Add event listener to the mobile menu icon
document.querySelector('.mobile-menu-icon').addEventListener('click', toggleMenu);
