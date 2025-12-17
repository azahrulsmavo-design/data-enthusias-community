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
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Placeholder
    });

    // --- Dynamic Headline Text ---
    const words = ["Data Enthusiast Community", "Data", "Insights", "Projects", "Stories", "Collaboration"];
    const dynamicElement = document.querySelector('.dynamic-word');
    if (dynamicElement) {
        let wordIndex = 0;
        setInterval(() => {
            dynamicElement.style.transition = 'opacity 0.5s ease';
            dynamicElement.style.opacity = '0';
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                dynamicElement.textContent = words[wordIndex];
                dynamicElement.style.opacity = '1';
            }, 500);
        }, 3000);
    }

    // --- Scatterplot Animation ---
    const scatterContainer = document.getElementById('scatterplot');
    if (scatterContainer) {
        const POINT_COUNT = 40;
        for (let i = 0; i < POINT_COUNT; i++) {
            const point = document.createElement('div');
            point.classList.add('scatter-point');

            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 5 + 3; // 3-8px
            const duration = Math.random() * 5 + 5; // 5-10s

            point.style.left = `${x}%`;
            point.style.top = `${y}%`;
            point.style.width = `${size}px`;
            point.style.height = `${size}px`;
            point.style.opacity = Math.random() * 0.5 + 0.3;
            point.style.animation = `floatPoint ${duration}s ease-in-out infinite`;
            point.style.animationDelay = `${Math.random() * 5}s`;

            if (Math.random() > 0.85) {
                point.style.background = '#3b82f6'; // Accent color points
            }

            scatterContainer.appendChild(point);
        }
    }

    // --- Carousel Logic ---
    const track = document.getElementById('carouselTrack');
    if (track) {
        const images = track.querySelectorAll('img');
        if (images.length > 0) {
            let currentIndex = 0;
            // Init
            images[0].classList.add('active');

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000); // 3 seconds per slide
        }
    }

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
