const navLinks = document.querySelectorAll('nav ul li a');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 100;

        // Fix 1: Guard against missing target element
        if (!targetElement) return;

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });

        // Fix 2: Only update active if this link is a nav link
        navLinks.forEach(link => link.classList.remove('active'));
        if (this.closest('nav ul li')) {
            this.classList.add('active');
        }
    });
});

const text = "Who Am I ?";
const target = document.getElementById("typing-text");
let index = 0;

function type() {
    // Fix 3: Guard against missing element
    if (!target) return;

    if (index < text.length) {
        target.textContent += text[index];
        index++;
        setTimeout(type, 120);
    }
}

type();