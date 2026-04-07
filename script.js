// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Simple smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show More toggles
    function setupShowMore(btnId, elementsClass) {
        const btn = document.getElementById(btnId);
        if(btn) {
            btn.addEventListener('click', () => {
                const hiddenElements = document.querySelectorAll(elementsClass);
                hiddenElements.forEach(el => {
                    el.classList.remove('hidden-item');
                    observer.observe(el);
                });
                btn.style.display = 'none';
            });
        }
    }

    setupShowMore('exp-show-more', '.exp-hidden');
    setupShowMore('proj-show-more', '.proj-hidden');
    setupShowMore('infra-show-more', '.infra-hidden');
});
