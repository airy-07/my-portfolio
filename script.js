document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       THEME TOGGLE (DARK/LIGHT MODE)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    /* ==========================================
       MOBILE NAVIGATION MENU
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu-list');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileMenuBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    /* ==========================================
       SCROLL EFFECTS (NAVBAR SHADOW & ACTIVE STATE)
       ========================================== */
    const navbar = document.getElementById('main-navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link in Navbar based on current scroll position
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       TYPEWRITER EFFECT
       ========================================== */
    const typewriterElement = document.getElementById('typewriter-text');
    const roles = ['Hobbyist Coder', 'Coding Enthusiast', 'Tech Hobbyist'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at full word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            // Brief pause before typing next word
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter loop
    setTimeout(type, 1000);

    /* ==========================================
       SCROLL REVEAL & SKILL BAR ANIMATION
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate the bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    /* ==========================================
       PROJECTS FILTERING
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================
       CONTACT FORM SUBMIT (SIMULATION)
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        // Visual feedback for sending
        submitBtn.innerHTML = 'Mengirim... <i class="fa-solid fa-spinner fa-spin" style="margin-left: 8px;"></i>';
        submitBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            // Visual success feedback
            submitBtn.innerHTML = 'Terkirim! <i class="fa-solid fa-check" style="margin-left: 8px;"></i>';
            submitBtn.style.background = 'var(--accent-teal)';
            
            alert(`Terima kasih ${name}! Pesan Anda telah disimulasikan terkirim.\n\nDetail:\nEmail: ${email}\nPesan: "${message}"`);
            
            contactForm.reset();
            
            // Reset button to original state after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = 'Kirim Pesan <i class="fa-solid fa-paper-plane" style="margin-left: 8px;"></i>';
                submitBtn.style.background = 'var(--gradient-hero)';
                submitBtn.style.pointerEvents = 'auto';
            }, 3000);

        }, 1500);
    });
});
