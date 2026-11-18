// Sections fade and slide up the first time they scroll into view
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const items = document.querySelectorAll('.section-title, .term-head, .timeline-entry, .resume-entry, .footer-contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
})();
