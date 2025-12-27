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

    async function getSessionsData() {
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
        return { data, usedSheet };
    }

    async function initSessions() {
        // Identify Page
        const homeContainer = document.getElementById('sessionsList');
        const allSessionsContainer = document.getElementById('allSessionsList');
        const detailContainer = document.getElementById('sessionDetailContent');

        if (!homeContainer && !allSessionsContainer && !detailContainer) return;

        const { data, usedSheet } = await getSessionsData();

        if (!data) {
            const msg = '<p class="text-muted">Gagal memuat jadwal (File not found).</p>';
            if (homeContainer) homeContainer.innerHTML = msg;
            if (allSessionsContainer) allSessionsContainer.innerHTML = msg;
            if (detailContainer) detailContainer.innerHTML = msg;
            return;
        }

        let sessions = data;

        // Sort
        if (usedSheet) {
            sessions = data.map(item => ({
                ...item,
                objDate: parseDate(item.date)
            })).sort((a, b) => a.objDate - b.objDate);
        } else {
            sessions = data.map(item => ({
                ...item,
                objDate: parseDate(item.date)
            })).sort((a, b) => a.objDate - b.objDate);
        }

        // --- RENDER LOGIC ---

        // 1. Home Page (Limit 5 Upcoming)
        if (homeContainer) {
            const upcoming = sessions.filter(item => {
                if (item.status) return item.status.toLowerCase() === 'upcoming';
                return true;
            }).slice(0, 5);

            if (upcoming.length === 0) {
                homeContainer.innerHTML = '<p class="text-muted">Belum ada sesi mendatang.</p>';
            } else {
                let featuredItem = upcoming.find(item => item.featured === "TRUE" || item.featured === true);
                if (!featuredItem) featuredItem = upcoming[0];
                const listItems = upcoming.filter(item => item !== featuredItem);

                let html = `
                    <div class="session-featured fade-up">
                        <div class="poster-container">
                            <a href="/session-detail.html?id=${featuredItem.id}">
                                <img src="${featuredItem.poster_url}" alt="${featuredItem.title}" loading="lazy">
                            </a>
                        </div>
                        <div class="session-content">
                            <div class="session-badges">
                                <span class="badge-featured">Featured Session</span>
                                <span class="badge-date">${featuredItem.date}</span>
                            </div>
                            <h3 class="card-title large"><a href="/session-detail.html?id=${featuredItem.id}" style="text-decoration:none; color:inherit;">${featuredItem.title}</a></h3>
                            <p class="card-subtitle">${featuredItem.subtitle}</p>
                            <div class="card-meta">
                                <span>⏰ ${featuredItem.time}</span>
                                <span>📍 ${featuredItem.location}</span>
                            </div>
                            <p class="card-desc">${featuredItem.description}</p>
                            <a href="/session-detail.html?id=${featuredItem.id}" class="btn-link large-link">Lihat Detail &rarr;</a>
                        </div>
                    </div>
                `;

                if (listItems.length > 0) {
                    html += `<div class="session-list-stack">`;
                    listItems.forEach((item, index) => {
                        html += `
                            <div class="session-list-item fade-up delay-${index}">
                                 <div class="poster-container small">
                                    <a href="/session-detail.html?id=${item.id}">
                                        <img src="${item.poster_url}" alt="${item.title}" loading="lazy">
                                    </a>
                                </div>
                                <div class="session-content compact">
                                    <h4 class="card-title small"><a href="/session-detail.html?id=${item.id}" style="text-decoration:none; color:inherit;">${item.title}</a></h4>
                                    <div class="card-meta compact">
                                        <span>📅 ${item.date}</span>
                                        <span>⏰ ${item.time}</span>
                                    </div>
                                    <p class="card-desc compact">${item.description}</p>
                                    <a href="/session-detail.html?id=${item.id}" class="btn-link small-link">Lihat Detail &rarr;</a>
                                </div>
                            </div>
                        `;
                    });
                    html += `</div>`;
                }
                homeContainer.innerHTML = html;

                // Re-init observer for delays
                setTimeout(() => {
                    const newAnimatedElements = homeContainer.querySelectorAll('.fade-up');
                    const existingObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) entry.target.classList.add('visible');
                        });
                    }, { threshold: 0.1 });
                    newAnimatedElements.forEach(el => existingObserver.observe(el));
                }, 100);
            }
        }

        // 2. All Sessions Page
        if (allSessionsContainer) {
            // Render all, maybe grouped by upcoming/past, but for now just a grid list
            // Or reuse the list stack style
            let html = `<div class="session-list-stack">`;
            sessions.forEach(item => {
                html += `
                    <div class="session-list-item">
                         <div class="poster-container small">
                            <a href="/session-detail.html?id=${item.id}">
                                <img src="${item.poster_url}" alt="${item.title}" loading="lazy">
                            </a>
                        </div>
                        <div class="session-content compact">
                            <h4 class="card-title small"><a href="/session-detail.html?id=${item.id}" style="text-decoration:none; color:inherit;">${item.title}</a></h4>
                            <div class="card-meta compact">
                                <span>📅 ${item.date}</span>
                                <span>⏰ ${item.time}</span>
                                <span>📍 ${item.location}</span>
                            </div>
                            <p class="card-desc compact">${item.description}</p>
                            <a href="/session-detail.html?id=${item.id}" class="btn-link small-link">Lihat Detail &rarr;</a>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            allSessionsContainer.innerHTML = html;
        }

        // 3. Detail Page
        if (detailContainer) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const session = sessions.find(s => s.id === id);

            if (!session) {
                detailContainer.innerHTML = '<p>Sesi tidak ditemukan.</p>';
            } else {
                detailContainer.innerHTML = `
                    <div class="session-featured" style="grid-template-columns: 1fr; gap: 2rem;">
                         <div class="poster-container" style="max-width: 400px; margin: 0 auto;">
                            <img src="${session.poster_url}" alt="${session.title}">
                        </div>
                        <div class="session-content">
                             <div class="session-badges">
                                <span class="badge-featured" style="background:var(--accent-color);">${session.type}</span>
                                <span class="badge-date">${session.date}</span>
                            </div>
                            <h1 class="card-title" style="font-size: 2.5rem; margin-top: 1rem;">${session.title}</h1>
                            <p class="card-subtitle" style="font-size: 1.2rem;">${session.subtitle}</p>
                            
                             <div class="card-meta" style="font-size: 1rem;">
                                <span>⏰ ${session.time}</span>
                                <span>📍 ${session.location}</span>
                            </div>
                            
                            <div style="margin-top: 2rem; white-space: pre-wrap; line-height: 1.8; font-size: 1.1rem; color: var(--text-dark-muted);">
                                ${session.description}
                            </div>
                            
                            <div style="margin-top: 3rem;">
                                <a href="${session.link}" class="btn-solid" target="_blank">Daftar / Ikut Sesi</a>
                            </div>
                        </div>
                    </div>
                 `;
            }
        }
    }

    // Initial load
    initSessions();
});
