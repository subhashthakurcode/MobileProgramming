// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

// Create overlay element if it doesn't exist
let overlay = document.querySelector('.mobile-nav-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('mobile-nav-overlay');
    document.body.appendChild(overlay);
}

// Toggle mobile navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    preventBodyScroll();
}

// Open mobile navigation
function openMobileNav() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    preventBodyScroll();
}

// Close mobile navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    preventBodyScroll();
}

// Hamburger click event
hamburger.addEventListener('click', toggleMobileNav);

// Close button click event
const mobileNavClose = document.querySelector('.mobile-nav-close');
if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
}

// Close menu when clicking overlay
overlay.addEventListener('click', closeMobileNav);

// Close menu when clicking a navigation link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileNav();
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu on window resize (if resized to desktop)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    }, 250);
});

// Prevent body scroll when mobile menu is open
function preventBodyScroll() {
    if (window.innerWidth <= 768) {
        if (mobileNav.classList.contains('active')) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    }
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 12px 16px;
        margin-bottom: 1rem;
        border-radius: 8px;
        font-size: 0.95rem;
        background-color: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
        color: ${type === 'success' ? '#065f46' : '#991b1b'};
        border: 1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'};
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other sections
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutContent = document.querySelector('.about-content');
    const contactContent = document.querySelector('.contact-content');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutContent);
    }
    
    if (contactContent) {
        contactContent.style.opacity = '0';
        contactContent.style.transform = 'translateY(30px)';
        contactContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactContent);
    }
});
