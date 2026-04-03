// Fibreco Oy - Uudistettu skripti

document.addEventListener('DOMContentLoaded', function() {
    // Mobiilivalikon toiminnallisuus
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarRight = document.querySelector('.navbar-right');

    if (navbarToggle && navbarRight) {
        navbarToggle.addEventListener('click', function() {
            navbarRight.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });

        // Sulje valikko kun klikataan linkkiä
        navbarRight.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navbarRight.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });

        // Sulje valikko kun klikataan ulkopuolelle
        document.addEventListener('click', function(event) {
            if (!navbarToggle.contains(event.target) && !navbarRight.contains(event.target)) {
                navbarRight.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll-efekti (etusivulla)
    const navbar = document.querySelector('.navbar');
    const isHeroPage = navbar && navbar.classList.contains('navbar-hero');
    const isLightPage = navbar && navbar.classList.contains('light-page');

    if (navbar && isHeroPage && !isLightPage) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }, { passive: true });
    }

    // Scroll-reveal animaatiot
    const revealElements = document.querySelectorAll('.reveal');
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
    fadeElements.forEach(el => revealObserver.observe(el));

    // Lomakkeen validointi
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            let isValid = true;

            // Tarkista nimi
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = '#ef4444';
            } else if (nameInput) {
                nameInput.style.borderColor = '#e2e8f0';
            }

            // Tarkista sähköposti
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#ef4444';
                } else {
                    emailInput.style.borderColor = '#e2e8f0';
                }
            }

            // Tarkista viesti
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = '#ef4444';
            } else if (messageInput) {
                messageInput.style.borderColor = '#e2e8f0';
            }

            if (!isValid) {
                event.preventDefault();
            }
        });

        // Poista virheen korostus kun kenttää muokataan
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
            input.addEventListener('focus', function() {
                this.style.borderColor = '#1E5FCC';
            });
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#e2e8f0';
                }
            });
        });
    }

    // Smooth scroll anchor-linkeille
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
