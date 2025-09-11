// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 20, 25, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.95)';
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
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

// Observe all service cards, plan cards, and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .plan-card, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hero video play/pause on visibility
const heroVideo = document.querySelector('.hero-video');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }
    });
}, { threshold: 0.5 });

if (heroVideo) {
    heroObserver.observe(heroVideo);
}

// Plan selection functionality
document.querySelectorAll('.plan-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const planName = e.target.closest('.plan-card').querySelector('h3').textContent;
        const planPrice = e.target.closest('.plan-card').querySelector('.amount').textContent;
        
        // Show selection feedback
        e.target.innerHTML = '<i class="fas fa-check"></i> Selected';
        e.target.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Reset other buttons
        document.querySelectorAll('.plan-card .btn').forEach(otherBtn => {
            if (otherBtn !== e.target) {
                const originalText = otherBtn.textContent.includes('Choose') ? 
                    otherBtn.textContent : `Choose ${otherBtn.closest('.plan-card').querySelector('h3').textContent}`;
                otherBtn.textContent = originalText;
                otherBtn.style.background = '';
            }
        });
        
        // You can add actual subscription logic here
        console.log(`Selected plan: ${planName} - $${planPrice}/month`);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            e.target.textContent = `Choose ${planName}`;
            e.target.style.background = '';
        }, 3000);
    });
});

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.background = 'linear-gradient(135deg, #2A3441, #232F3E)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'linear-gradient(135deg, #232F3E, #2A3441)';
    });
});

// Dynamic content updates for hero section
const heroTitles = [
    "Watch Unlimited Movies & TV Shows",
    "Discover Your Next Favorite Series",
    "Stream Premium Content Anywhere",
    "Experience Entertainment Like Never Before"
];

const heroSubtitles = [
    "Stream thousands of movies, TV series, and exclusive content. Start your journey today.",
    "From blockbuster movies to binge-worthy series, find something for everyone.",
    "Download and watch offline, or stream live on any device, anywhere you go.",
    "Join millions of viewers worldwide and unlock a world of entertainment."
];

let currentIndex = 0;

function updateHeroContent() {
    const titleElement = document.querySelector('.hero-title');
    const subtitleElement = document.querySelector('.hero-subtitle');
    
    titleElement.style.opacity = '0';
    subtitleElement.style.opacity = '0';
    
    setTimeout(() => {
        titleElement.textContent = heroTitles[currentIndex];
        subtitleElement.textContent = heroSubtitles[currentIndex];
        titleElement.style.opacity = '1';
        subtitleElement.style.opacity = '1';
        
        currentIndex = (currentIndex + 1) % heroTitles.length;
    }, 500);
}

// Update hero content every 5 seconds
setInterval(updateHeroContent, 5000);

// Handle video loading errors
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        console.log('Hero video failed to load, using fallback background');
        document.querySelector('.hero').style.background = 'linear-gradient(135deg, #0F1419 0%, #232F3E 50%, #00A8E1 100%)';
    });
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#F44336';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.email && !emailRegex.test(formObject.email)) {
                const emailInput = this.querySelector('[name="email"]');
                emailInput.style.borderColor = '#F44336';
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Log form data (for development)
                    console.log('Form submitted:', formObject);
                }, 2000);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
});

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
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 
                     type === 'error' ? 'linear-gradient(135deg, #F44336, #d32f2f)' : 
                     'linear-gradient(135deg, #2196F3, #1976D2)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(notificationStyles);