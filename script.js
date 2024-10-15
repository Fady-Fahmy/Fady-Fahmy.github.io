const navLinks = document.querySelectorAll('nav ul li a');
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});


const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', toggleMenu);
}

// Set the initial theme based on local storage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    navMenu.classList.toggle('visible');
    const isExpanded = navMenu.classList.contains('visible');
    menuIcon.setAttribute('aria-expanded', isExpanded);
}

function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('visible');
}

/* CSS to handle menu visibility */
nav ul {
    display: none; /* Hide on small screens */
}

nav ul.visible {
    display: block; /* Show when toggled */
}

.mobile-menu-icon {
    cursor: pointer;
    font-size: 30px;
    display: none; /* Hide by default */
}

/* Show mobile menu icon on smaller screens */
@media (max-width: 768px) {
    .mobile-menu-icon {
        display: block;
    }
}

// Add event listener to the mobile menu icon
document.querySelector('.mobile-menu-icon').addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code here
});
