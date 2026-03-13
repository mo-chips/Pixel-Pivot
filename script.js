document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // --- Smooth Scroll for Nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('nav-active'); // Close mobile menu
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bg = document.getElementById('hero-bg');
        bg.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolledPercent + "%";

        // Back to Top visibility
        const btt = document.getElementById('backToTop');
        if (scrolled > 500) btt.style.display = "block";
        else btt.style.display = "none";
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // --- Accordion Logic ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = body.style.maxHeight;

            // Close others
            document.querySelectorAll('.accordion-body').forEach(b => b.style.maxHeight = null);
            
            if (!isOpen) {
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // --- Form Validation & Handling ---
    const contactForm = document.getElementById('main-contact-form');
    const status = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!validateEmail(email)) {
            status.innerText = "Error: Invalid coordinates (email).";
            status.style.color = "#ff00aa";
            return;
        }

        status.innerText = "Transmission successful. We will reach out shortly.";
        status.style.color = "#00d9ff";
        contactForm.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- Back to Top Click ---
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});