// Function to update footer legal links based on current section
function updateFooterLegalLinks(sectionId) {
    const faceEffectLegal = document.querySelector('.footer-legal-faceeffect');
    const weclickLegal = document.querySelector('.footer-legal-weclick');
    
    // Hide all legal sections by default
    if (faceEffectLegal) faceEffectLegal.style.display = 'none';
    if (weclickLegal) weclickLegal.style.display = 'none';
    
    // Show appropriate legal section based on current page
    if (sectionId === 'weclick-details') {
        if (weclickLegal) weclickLegal.style.display = 'block';
    }
    // Note: Face Effects legal will be shown on face-effects.html page
}

// Smooth Scroll Navigation with Section Visibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty hash links or dropdown toggles
        if (href === '#' && this.classList.contains('dropdown-toggle')) {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Hide all main sections
            document.querySelectorAll('.hero, .about-section, .weclick-details-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            // Use 'block' for weclick-details section, 'flex' for others
            if (targetId === 'weclick-details') {
                target.style.display = 'block';
            } else {
                target.style.display = 'flex';
            }
            
            // Update footer legal links
            updateFooterLegalLinks(targetId);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Don't add active class to dropdown items, but to the Products dropdown itself
            if (!this.classList.contains('dropdown-item')) {
                this.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo({
                behavior: 'smooth',
                top: 0
            });
        }
    });
});

// WeClick Learn More Button Handler
const weclickLearnMoreBtn = document.getElementById('weclick-learn-more');
if (weclickLearnMoreBtn) {
    weclickLearnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide all sections
        document.querySelectorAll('.hero, .about-section, .weclick-details-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show WeClick details section
        const weclickSection = document.getElementById('weclick-details');
        if (weclickSection) {
            weclickSection.style.display = 'block';
        }
        
        // Update footer legal links
        updateFooterLegalLinks('weclick-details');
        
        // Remove active from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Scroll to top
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
    });
}

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 15px rgba(43, 43, 43, 0.08)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Success
        showNotification('Welcome to our exclusive circle!', 'success');
        newsletterForm.reset();
        
        // In production, send to backend
        console.log('Newsletter subscription:', email);
    });
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 40px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #D4AF37, #FFD700)' : 'rgba(255, 0, 0, 0.9)'};
        color: ${type === 'success' ? '#0A0A0A' : '#fff'};
        padding: 16px 30px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add animation keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe team members
document.querySelectorAll('.team-member').forEach((member, index) => {
    member.style.opacity = '0';
    member.style.transform = 'translateY(50px)';
    member.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(member);
});

// Parallax Effect for Decorative Elements
const decorationCircles = document.querySelectorAll('.decoration-circle');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    decorationCircles.forEach((circle, index) => {
        const speed = 0.3 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px) scale(${1 + (scrolled * 0.0001)})`;
    });
});

// Cursor Glow Effect - Disabled
// const createGlowEffect = () => {
//     const glow = document.createElement('div');
//     glow.className = 'cursor-glow';
//     glow.style.cssText = `
//         position: fixed;
//         width: 300px;
//         height: 300px;
//         border-radius: 50%;
//         background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
//         pointer-events: none;
//         z-index: 9999;
//         transition: transform 0.2s ease;
//         display: none;
//     `;
//     document.body.appendChild(glow);
//     
//     let mouseX = 0;
//     let mouseY = 0;
//     
//     document.addEventListener('mousemove', (e) => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//         glow.style.display = 'block';
//         glow.style.left = `${mouseX - 150}px`;
//         glow.style.top = `${mouseY - 150}px`;
//     });
// };

// Enable glow effect on desktop - Disabled
// if (window.innerWidth > 1024) {
//     createGlowEffect();
// }

// Smooth Page Load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add magnetic effect to buttons
const magneticButtons = document.querySelectorAll('.btn-luxury, .btn-outline-luxury, .cta-btn, .newsletter-btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Enhanced Team Card Interactions - Click to Expand with Accordion Logic
function initializeTeamCards() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(card => {
        // Make cards explicitly clickable for iOS/Mac
        card.style.webkitTapHighlightColor = 'transparent';
        card.style.webkitTouchCallout = 'none';
        
        const handleCardClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyExpanded = card.classList.contains('expanded');
            
            // Close ALL cards first
            teamMembers.forEach(otherCard => {
                otherCard.classList.remove('expanded');
            });
            
            // If the clicked card wasn't expanded, expand it (accordion behavior)
            if (!isCurrentlyExpanded) {
                card.classList.add('expanded');
            }
        };
        
        // Add both click and touchend events for better Mac/iOS compatibility
        card.addEventListener('click', handleCardClick);
        card.addEventListener('touchend', handleCardClick);
    });
}

// Close all cards when clicking outside
function setupOutsideClickHandler() {
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.team-member')) {
            document.querySelectorAll('.team-member').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    };
    
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);
}

// Initialize team cards after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeTeamCards();
        setupOutsideClickHandler();
    });
} else {
    initializeTeamCards();
    setupOutsideClickHandler();
}

// Golden particles on scroll
const createScrollParticle = () => {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 0 0 10px #FFD700;
        animation: particleFade 1s ease forwards;
    `;
    
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${window.pageYOffset + Math.random() * window.innerHeight}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
};

// Add particle fade animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles on scroll (throttled)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            if (Math.random() > 0.9) { // 10% chance per scroll event
                createScrollParticle();
            }
            scrollTimeout = null;
        }, 100);
    }
});

// Founder card special hover effect
const founderCard = document.querySelector('.founder-card');
if (founderCard) {
    founderCard.addEventListener('mouseenter', () => {
        founderCard.style.borderColor = 'rgba(43, 43, 43, 0.3)';
        founderCard.style.boxShadow = '0 8px 30px rgba(43, 43, 43, 0.12)';
    });

    founderCard.addEventListener('mouseleave', () => {
        founderCard.style.borderColor = 'rgba(43, 43, 43, 0.1)';
        founderCard.style.boxShadow = '0 4px 15px rgba(43, 43, 43, 0.05)';
    });
}

// Add loaded class to images when they finish loading
document.addEventListener('DOMContentLoaded', () => {
    const teamImages = document.querySelectorAll('.member-image');
    
    teamImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
    
    // Handle hash navigation on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        
        if (targetSection) {
            // Hide all main sections
            document.querySelectorAll('.hero, .about-section, .weclick-details-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            if (hash === 'weclick-details') {
                targetSection.style.display = 'block';
            } else {
                targetSection.style.display = 'flex';
            }
            
            // Update footer legal links
            updateFooterLegalLinks(hash);
            
            // Scroll to top
            window.scrollTo({
                behavior: 'smooth',
                top: 0
            });
        }
    }
});

console.log('🎩 Yonder Wonder - Luxury Experience Loaded');