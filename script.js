// FibreCo Oy - Yhteinen skripti

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
                nameInput.style.borderColor = '#d1d5db';
            }

            // Tarkista sähköposti
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#ef4444';
                } else {
                    emailInput.style.borderColor = '#d1d5db';
                }
            }

            // Tarkista viesti
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = '#ef4444';
            } else if (messageInput) {
                messageInput.style.borderColor = '#d1d5db';
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // Kortit animoituvat sisään kun tulevat näkyviin
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.card-animated').forEach(card => {
        observer.observe(card);
    });

    // Fade-in animaatiot sisältöelementeille
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Navbar scroll-efekti (etusivulla)
    const navbarHero = document.querySelector('.navbar-hero');
    if (navbarHero) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbarHero.classList.add('navbar-scrolled');
            } else {
                navbarHero.classList.remove('navbar-scrolled');
            }
        });
    }
});
