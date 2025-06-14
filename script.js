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
-----------------------------------------------------
<script>
const roles = [
  "Helping users reduce downtime.",
  "Protecting systems from evolving threats.",
  "Automating security workflows.",
  "Delivering Tier 1–2 support with care."
];
let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  if (i < roles.length) {
    if (!isDeleting && j <= roles[i].length) {
      current = roles[i].substring(0, j++);
    } else if (isDeleting && j > 0) {
      current = roles[i].substring(0, j--);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) i = (i + 1) % roles.length;
    }
    element.textContent = current;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();
</script>
