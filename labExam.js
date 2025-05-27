// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('active');
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or use system preference
if(localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if(document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
    }
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const carouselInner = carousel.querySelector('.carousel-inner');
const carouselItems = carousel.querySelectorAll('.carousel-item');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');

let currentSlide = 0;
const totalSlides = carouselItems.length;

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update aria-hidden attributes for accessibility
    carouselItems.forEach((item, index) => {
        item.setAttribute('aria-hidden', index !== currentSlide);
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

// Add keyboard navigation for carousel
carousel.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') {
        prevBtn.click();
        prevBtn.focus();
    } else if(e.key === 'ArrowRight') {
        nextBtn.click();
        nextBtn.focus();
    }
});

// Virtual keyboard support
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });
});