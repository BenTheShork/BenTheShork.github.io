// Animation and visual effects

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe process steps
    const processSteps = document.querySelectorAll('.step');
    processSteps.forEach(step => {
        observer.observe(step);
    });
    
    // Observe feature items
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        observer.observe(feature);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-bean');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.story-text, .contact-info, .products-header');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(element);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', async () => {
    const heroTitleMain = document.querySelector('.hero-title-main');
    const heroTitleAccent = document.querySelector('.hero-title-accent');
    
    if (heroTitleMain && heroTitleAccent) {
        let language = 'en';
        if(localStorage && localStorage.getItem('selectedLanguage') !== null)
            language = localStorage.getItem('selectedLanguage');
        try {
            // Load language file based on current language
            const response = await fetch(`languages/${language}.json`);
            const translations = await response.json();
            
            // Use the translations from the loaded file
            setTimeout(() => {
                typeWriter(heroTitleMain, translations.hero.title_main || 'Your Cocoa Source', 80);
            }, 500);
            
            setTimeout(() => {
                typeWriter(heroTitleAccent, translations.hero.title_accent || 'Kakao Balkan', 80);
            }, 2000);
            
        } catch (error) {
            console.error('Error loading language file:', error);
            // Fallback to default English text
            setTimeout(() => {
                typeWriter(heroTitleMain, 'Your Cocoa Source', 80);
            }, 500);
            
            setTimeout(() => {
                typeWriter(heroTitleAccent, 'Kakao Balkan', 80);
            }, 2000);
        }
    }
});

// Improved stats counter animation
function animateCounter(element, target, suffix = '', duration = 2000) {
    // Check if animation has already been triggered
    if (element.dataset.animated === 'true') {
        return;
    }
    
    // Mark as animated to prevent duplicate animations
    element.dataset.animated = 'true';
    
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Single stats observer to handle all counter animations
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach((element, index) => {
                // Get target value and suffix from data attributes if available
                let target = parseInt(element.dataset.target);
                let suffix = element.dataset.suffix || '';
                
                // If no data attributes, try to parse from current content
                if (!target) {
                    const currentText = element.textContent;
                    
                    // Extract number from text
                    const numberMatch = currentText.match(/[\d,]+/);
                    target = numberMatch ? parseInt(numberMatch[0].replace(/,/g, '')) : 0;
                    
                    // Extract suffix
                    suffix = currentText.replace(/[\d,\s]/g, '') || '+';
                }
                
                // Start animation with slight delay for visual effect
                setTimeout(() => {
                    animateCounter(element, target, suffix);
                }, index * 200);
            });
            
            // Unobserve after animation starts to prevent re-triggering
            statsObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize stats observers
document.addEventListener('DOMContentLoaded', () => {
    const statsContainers = document.querySelectorAll('.hero-stats, .facility-stats, .stats-container');
    statsContainers.forEach(container => {
        if (container) {
            statsObserver.observe(container);
        }
    });
});

// Reset function for development/testing
function resetCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(element => {
        element.dataset.animated = 'false';
    });
}

// Export functions for global access
window.typeWriter = typeWriter;
window.animateCounter = animateCounter;
window.resetCounters = resetCounters;