document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const lightSection = document.querySelector('.light-mode-wrapper');

    const navObserverOptions = {
        rootMargin: "-100px 0px 0px 0px", // Trigger when nav overlaps
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If we scroll DOWN into the light section
            if (entry.isIntersecting) {
                navbar.classList.add('nav-light-mode');
            } else {
                navbar.classList.remove('nav-light-mode');
            }
        });
    }, navObserverOptions);

    if (lightSection) {
        navObserver.observe(lightSection);
    }

    // Visual Parallax Effect (Simple)
    // Moves the placeholder visuals slightly on scroll for a detached/floating feel
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.article-visual').forEach((visual, index) => {
            const speed = 0.05 * (index % 2 === 0 ? 1 : -1);
            // visual.style.transform = `translateY(${scrollY * speed}px)`; 
            // Commented out to keep it "Quiet" - enable if user wants more motion
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
