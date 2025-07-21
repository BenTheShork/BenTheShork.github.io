// Main initialization and coordination script
// This file coordinates the loading and initialization of all modules

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kakao Balkan website initialized');
    
    // Initialize all modules in the correct order
    initializeModules();
});

function initializeModules() {
    // Language picker is initialized automatically via its own event listeners
    
    // Check if all required elements are loaded
    const requiredElements = [
        '.hamburger',
        '.nav-menu',
        '#contactForm'
    ];
    
    const allElementsLoaded = requiredElements.every(selector => {
        return document.querySelector(selector) !== null;
    });
    
    if (!allElementsLoaded) {
        console.warn('Some required elements not found, retrying in 100ms');
        setTimeout(initializeModules, 100);
        return;
    }
    
    // Initialize navigation if not already done
    if (!window.navigationInitialized) {
        // Navigation module handles its own initialization
        window.navigationInitialized = true;
    }
    
    // Initialize animations
    if (typeof observer !== 'undefined') {
        console.log('Animations module loaded');
    }
    
    // Initialize contact form
    if (document.getElementById('contactForm')) {
        console.log('Contact form module loaded');
    }
    
    // Initialize facility gallery
    if (document.getElementById('mainImage')) {
        console.log('Facility gallery module loaded');
    }
    
    // Initialize products
    if (typeof productData !== 'undefined') {
        console.log('Products module loaded');
    }
}

// Global error handler for development
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// Export for debugging
window.initializeModules = initializeModules;