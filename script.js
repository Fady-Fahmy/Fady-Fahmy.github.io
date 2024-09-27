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

// Toggle dark mode functionality
const darkModeToggle = document.querySelector('.dark-mode-btn');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Apply dark mode class to all relevant elements
    document.querySelectorAll('header, footer, nav, section').forEach(element => {
        element.classList.toggle('dark-mode');
    });
    
    // Update text for the dark mode toggle button
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    
    // Ensure the icons and text are visible in dark mode
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.toggle('dark-mode');
    });
});

// Dark mode persistence across sessions
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    
    document.querySelectorAll('header, footer, nav, section').forEach(element => {
        element.classList.add('dark-mode');
    });
    
    darkModeToggle.textContent = 'Light Mode';
}

// Save dark mode state to localStorage when toggled
darkModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
