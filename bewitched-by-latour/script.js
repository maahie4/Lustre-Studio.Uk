/* -------------------------------------------------
   Core interactivity (vanilla JS)
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  /* Mobile navigation toggle */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');

  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  /* Smooth scroll for anchor links (fallback for older browsers) */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // close mobile menu after click
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  /* Simple form submission – just shows an alert (static placeholder) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you! Your inquiry has been received.');
      form.reset();
    });
  }
});
