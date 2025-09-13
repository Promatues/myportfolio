// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.btn');
const heroTitle = document.querySelector('.hero-title');

// Navigation functionality
function setActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Add click handlers to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveLink(this);
        
        // Smooth scroll to section (if sections exist)
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Handle different button actions
        if (buttonText.includes('Get in Touch')) {
            handleGetInTouch();
        } else if (buttonText.includes('View My Work')) {
            handleViewWork();
        }
    });
});

// Contact functionality
function handleGetInTouch() {
    // Create a simple modal or redirect to contact
    const email = 'glenn@example.com';
    const subject = 'Let\'s work together!';
    const body = 'Hi Glenn,\n\nI\'d love to discuss a project with you.\n\nBest regards,';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Portfolio functionality
function handleViewWork() {
    // Simulate loading portfolio
    showNotification('Loading portfolio...');
    
    // In a real application, this would navigate to a portfolio page
    setTimeout(() => {
        showNotification('Portfolio coming soon!');
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '24px',
        background: type === 'info' ? '#4299e1' : '#e53e3e',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Parallax effect for hero background
function handleScroll() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
}

// Throttle scroll events for performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
    
    // Space or Enter to trigger focused button
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('btn')) {
        e.preventDefault();
        document.activeElement.click();
    }
});

// Mobile menu toggle (for future enhancement)
function createMobileMenu() {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 8px;
    `;
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            .nav {
                display: none !important;
            }
            .nav.active {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(26, 27, 58, 0.95);
                flex-direction: column;
                padding: 20px;
                gap: 16px;
                backdrop-filter: blur(10px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Insert before primary button
    const primaryBtn = header.querySelector('.btn-primary');
    header.insertBefore(mobileMenuBtn, primaryBtn);
}

// Initialize mobile menu
createMobileMenu();

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a subtle fade-in effect to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Glenn Portfolio - Initialized successfully! 🎬');