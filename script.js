// ============================================
// DRUM DAD & BASS BOY - Homepage Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // --- Scroll animations ---
    const animateElements = document.querySelectorAll(
        '.section-header, .about-image, .about-text, .gen-card, .gen-shared, ' +
        '.music-card, .gallery-item, .booking-left, .booking-right, .stat'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = nav.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Ticker duplication for seamless loop ---
    const tickerInner = document.querySelector('.ticker-inner');
    if (tickerInner) {
        tickerInner.innerHTML += tickerInner.innerHTML;
    }

    // --- Hero parallax-like subtle effect on scroll ---
    const heroPersons = document.querySelectorAll('.hero-person');
    const heroCenter = document.querySelector('.hero-center');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            const factor = scrolled / heroHeight;
            heroPersons.forEach(person => {
                person.style.transform = `translateY(${scrolled * 0.15}px)`;
                person.style.opacity = 1 - factor * 0.5;
            });
            if (heroCenter) {
                heroCenter.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.1}px)`;
                heroCenter.style.opacity = 1 - factor * 0.8;
            }
        }
    });
});
