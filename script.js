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