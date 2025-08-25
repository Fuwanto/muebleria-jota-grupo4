document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    function toggleMenu() {
        const isOpen = mainNav.classList.contains('active');
        
        if (isOpen) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        } else {
            mainNav.classList.add('active');
            menuToggle.classList.add('active');
            body.style.overflow = 'hidden'; 
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024) { 
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (window.innerWidth < 1024) { 
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    mainNav.addEventListener('touchmove', function(event) {
        if (window.innerWidth < 1024 && mainNav.classList.contains('active')) {
            event.preventDefault();
        }
    }, { passive: false });
});
