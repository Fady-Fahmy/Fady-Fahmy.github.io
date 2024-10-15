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

// Create the dot cursor element
const dotCursor = document.createElement('div');
dotCursor.classList.add('dot-cursor');
document.body.appendChild(dotCursor);

// Update dot position as mouse moves
document.addEventListener('mousemove', (e) => {
    dotCursor.style.left = `${e.pageX}px`;
    dotCursor.style.top = `${e.pageY}px`;
});

// Optional: Enlarge the dot on click
document.addEventListener('click', () => {
    dotCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    setTimeout(() => {
        dotCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
});
