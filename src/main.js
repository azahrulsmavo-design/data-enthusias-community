import { fetchSessionsFromSheet } from './sheetApi.js';

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations (Replay Enabled)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Helper: Parse Indonesian Date "27 Januari 2025" -> Date Object
    function parseDate(dateStr) {
        if (!dateStr) return new Date(8640000000000000); // Far future
        const monthMap = {
            'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
            'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
        };
        const parts = dateStr.split(' ');
        if (parts.length < 3) return new Date();
        const day = parseInt(parts[0]);
        const month = monthMap[parts[1]] || 0;
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger Scramble if it's the target
                const scrambleEl = entry.target.querySelector('.scramble-text');
                if (scrambleEl) {
                    playScramble(scrambleEl);
                }
            } else {
                // Replay: Remove class when out of view
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .reveal-left');
    animatedElements.forEach(el => observer.observe(el));

    // Scramble Text Function
    function playScramble(element) {
        if (element.dataset.animating === "true") return;
        element.dataset.animating = "true";

        const originalText = element.textContent;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@&";
        let iterations = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return alphabet[Math.floor(Math.random() * alphabet.length)];
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.dataset.animating = "false";
            }

            iterations += 1 / 3; // Speed
        }, 30);
    }

    // Auto-Observe parents of specific elements if needed
    // (Already handled by adding classes in HTML)

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const lightSection = document.querySelector('.light-mode-wrapper');

    let navObserver = null;

    function initNavObserver() {
        if (navObserver) navObserver.disconnect();

        // Different logic for desktop (top nav) vs mobile (bottom nav)
        const isMobile = window.innerWidth <= 768;
        const navObserverOptions = {
            // If mobile, trigger when light section hits bottom of viewport. 
            // If desktop, trigger when light section hits top (with offset).
            rootMargin: isMobile ? "0px 0px -50px 0px" : "-100px 0px 0px 0px",
            threshold: 0
        };

        navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
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
    }

    // Init and listen for resize
    initNavObserver();
    window.addEventListener('resize', initNavObserver);

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

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
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
    // --- Date & Session Logic ---
    function parseDate(dateStr) {
        if (!dateStr) return new Date();

        // Check for "YYYY-MM-DD" format
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return new Date(dateStr);
        }

        const months = {
            'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 'Mei': '05', 'Juni': '06',
            'Juli': '07', 'Agustus': '08', 'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
        };
        const parts = dateStr.split(' ');
        if (parts.length < 3) return new Date();
        const day = parts[0].padStart(2, '0');
        const month = months[parts[1]] || '01';
        const year = parts[2];
        return new Date(`${year}-${month}-${day}`);
    }

    async function fetchSessions() {
        const listContainer = document.getElementById('sessionsList');
        if (!listContainer) return;

        let data = null;
        let usedSheet = false;

        // 1. Try Google Sheets
        try {
            data = await fetchSessionsFromSheet();
            if (data && Array.isArray(data)) {
                usedSheet = true;
                console.log("Loaded sessions from Google Sheets");
            }
        } catch (e) {
            console.warn("Sheet fetch failed or not configured", e);
        }

        // 2. Fallback to local JSON
        if (!data) {
            const paths = ['/sessions.json', './sessions.json', 'public/sessions.json'];
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        data = await response.json();
                        console.log(`Loaded sessions from ${path} (fallback)`);
                        break;
                    }
                } catch (e) {
                    console.warn(`Failed to load from ${path}`, e);
                }
            }
        }

        if (!data) {
            listContainer.innerHTML = '<p class="text-muted">Gagal memuat jadwal (File not found).</p>';
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let upcoming;

        if (usedSheet) {
            // Sheet data is already filtered "upcoming" and sorted by date string
            // just map to add objDate for consistency if needed, though rendering just uses .date string
            upcoming = data.map(item => ({
                ...item,
                objDate: parseDate(item.date)
            }));

            // Re-sort to be safe using the Date object logic which handles Indonesian months if present in future
            // (The sheet API sorts by string comparison of YYYY-MM-DD which is correct, but let's be robust)
            upcoming.sort((a, b) => a.objDate - b.objDate);
        } else {
            // JSON data needs full processing
            upcoming = data
                .map(item => ({ ...item, objDate: parseDate(item.date) }))
                // Filter by status if available, fallback to include all (logic from before)
                .filter(item => {
                    if (item.status) return item.status.toLowerCase() === 'upcoming';
                    return true;
                })
                .sort((a, b) => a.objDate - b.objDate);
        }

        // Slice to max 5
        upcoming = upcoming.slice(0, 5);

        if (upcoming.length === 0) {
            listContainer.innerHTML = '<p class="text-muted">Belum ada sesi mendatang.</p>';
            return;
        }

        let featuredItem = upcoming.find(item => item.featured === "TRUE" || item.featured === true);
        if (!featuredItem) featuredItem = upcoming[0];

        const listItems = upcoming.filter(item => item !== featuredItem);
        let html = '';

        // Featured
        html += `
                <div class="session-featured fade-up">
                    <div class="poster-container">
                        <img src="${featuredItem.poster_url}" alt="${featuredItem.title}" loading="lazy">
                    </div>
                    <div class="session-content">
                        <div class="session-badges">
                            <span class="badge-featured">Featured Session</span>
                            <span class="badge-date">${featuredItem.date}</span>
                        </div>
                        <h3 class="card-title large">${featuredItem.title}</h3>
                        <p class="card-subtitle">${featuredItem.subtitle}</p>
                        <div class="card-meta">
                            <span>⏰ ${featuredItem.time}</span>
                            <span>📍 ${featuredItem.location}</span>
                        </div>
                        <p class="card-desc">${featuredItem.description}</p>
                        <a href="${featuredItem.link}" class="btn-link large-link">Ikut Sesi &rarr;</a>
                    </div>
                </div>
            `;

        // List
        if (listItems.length > 0) {
            html += `<div class="session-list-stack">`;
            listItems.forEach((item, index) => {
                html += `
                        <div class="session-list-item fade-up delay-${index}">
                             <div class="poster-container small">
                                <img src="${item.poster_url}" alt="${item.title}" loading="lazy">
                            </div>
                            <div class="session-content compact">
                                <h4 class="card-title small">${item.title}</h4>
                                <div class="card-meta compact">
                                    <span>📅 ${item.date}</span>
                                    <span>⏰ ${item.time}</span>
                                </div>
                                <p class="card-desc compact">${item.description}</p>
                                <a href="${item.link}" class="btn-link small-link">Ikut Sesi &rarr;</a>
                            </div>
                        </div>
                    `;
            });
            html += `</div>`;
        }
        listContainer.innerHTML = html;

        // Observe new elements for animation
        setTimeout(() => {
            const newAnimatedElements = listContainer.querySelectorAll('.fade-up');
            const existingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            newAnimatedElements.forEach(el => existingObserver.observe(el));
        }, 100);

    }

    // Initial load
    fetchSessions();

    // Polling every 2 minutes
    setInterval(fetchSessions, 120_000);
});
