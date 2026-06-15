// GSAP text reveal for hero/section headings (bottom-to-top clipPath)
// Usage: add 'reveal-heading' class to any element you want to animate
// Optionally, set data-reveal-delay (in seconds) for staggered effect

window.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') return;
  // Group headings by their parent section
  var sections = new Set();
  document.querySelectorAll('.reveal-heading').forEach(function(el) {
    var section = el.closest('section, .about-us-hero-section, .container, .main-header');
    if (section) sections.add(section);
    gsap.set(el, {opacity: 0, clipPath: 'inset(100% 0 0 0)'});
  });

  sections.forEach(function(section) {
    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var revealEls = entry.target.querySelectorAll('.reveal-heading');
        revealEls.forEach(function(el, idx) {
          var delay = parseFloat(el.getAttribute('data-reveal-delay')) || idx * 0.2;
          setTimeout(function() {
            gsap.to(el, {
              opacity: 1,
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power3.out'
            });
          }, delay * 1000);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    observer.observe(section);
  });
});
