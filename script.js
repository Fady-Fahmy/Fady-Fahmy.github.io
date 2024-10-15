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

