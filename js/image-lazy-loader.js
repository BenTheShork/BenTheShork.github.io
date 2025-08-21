/**
 * Image Lazy Loader for Kakao Balkan Website
 * Preloads only background images, lazy loads everything else
 */

class ImageLazyLoader {
    constructor() {
        this.imageObserver = null;
        this.loadedImages = new Set();
        this.backgroundsLoaded = false;
        this.init();
    }

    init() {
        // Immediately preload background images
        this.preloadBackgroundImages();
        
        // Wait for DOM to be ready for other images
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLazyLoading());
        } else {
            this.setupLazyLoading();
        }
    }

    preloadBackgroundImages() {
        // Preload hero background image immediately
        const heroBackground = new Image();
        heroBackground.onload = () => {
            console.log('Hero background loaded');
            this.backgroundsLoaded = true;
        };
        
        // Add your hero background image path here
        heroBackground.src = 'images/background/cacao-background.jpg.jpg';
        
        // Preload any other critical background images
        const additionalBackgrounds = [
            
        ];
        
        additionalBackgrounds.forEach(bgPath => {
            const bgImg = new Image();
            bgImg.src = bgPath;
        });
    }

    setupLazyLoading() {
        // Setup intersection observer for lazy loading
        this.createObserver();
        
        // Setup ALL images (including critical ones) for lazy loading
        this.setupImages();
        
        // Start loading visible images after background is ready
        this.waitForBackgroundThenStart();
    }

    waitForBackgroundThenStart() {
        const checkAndStart = () => {
            if (this.backgroundsLoaded) {
                // Small delay to ensure smooth experience
                setTimeout(() => this.loadVisibleImages(), 100);
            } else {
                setTimeout(checkAndStart, 50);
            }
        };
        checkAndStart();
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '100px', // Start loading 100px before image comes into view
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);
    }

    setupImages() {
        // Get ALL images and set them up for lazy loading
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Skip if already processed or has no src
            if (img.dataset.lazyProcessed || (!img.src && !img.dataset.src)) return;
            
            // Store original src in data-src if not already there
            if (img.src && !img.dataset.src) {
                img.dataset.src = img.src;
            }
            
            // Set placeholder immediately
            img.src = this.createPlaceholder(img);
            
            // Add loading class and mark as processed
            img.classList.add('lazy-loading');
            img.dataset.lazyProcessed = 'true';
            
            // Observe for intersection
            this.imageObserver.observe(img);
        });
    }

    createPlaceholder(img) {
        // Create a minimal, lightweight SVG placeholder
        const width = img.offsetWidth || img.width || 400;
        const height = img.offsetHeight || img.height || 300;
        
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="#f8f9fa"/>
                <circle cx="${width/2}" cy="${height/2}" r="20" fill="none" stroke="#dee2e6" stroke-width="2" opacity="0.5">
                    <animate attributeName="stroke-dasharray" values="0 126;126 126;0 126" dur="2s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `)}`;
    }

    loadVisibleImages() {
        // Load images that are currently visible or close to being visible
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200;
            
            if (isVisible && !this.loadedImages.has(img.dataset.src)) {
                this.loadImage(img);
            }
        });
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const imageUrl = img.dataset.src;
            if (!imageUrl || this.loadedImages.has(imageUrl)) {
                resolve(img);
                return;
            }

            const tempImg = new Image();
            
            tempImg.onload = () => {
                // Replace placeholder with actual image
                img.src = imageUrl;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                
                this.loadedImages.add(imageUrl);
                resolve(img);
            };
            
            tempImg.onerror = () => {
                console.warn(`Failed to load image: ${imageUrl}`);
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
                reject(new Error(`Failed to load ${imageUrl}`));
            };
            
            tempImg.src = imageUrl;
        });
    }

    // Public method to manually load an image
    forceLoadImage(selector) {
        const img = document.querySelector(selector);
        if (img && img.dataset.src) {
            return this.loadImage(img);
        }
        return Promise.reject(new Error('Image not found'));
    }

    // Public method to preload specific images
    preloadImages(selectors) {
        const promises = [];
        selectors.forEach(selector => {
            const images = document.querySelectorAll(selector);
            images.forEach(img => {
                if (img.dataset.src) {
                    promises.push(this.loadImage(img).catch(() => {}));
                }
            });
        });
        return Promise.allSettled(promises);
    }

    // Method to update background image path (call this if needed)
    updateBackgroundPath(imagePath) {
        const bgImg = new Image();
        bgImg.onload = () => {
            console.log(`Background image loaded: ${imagePath}`);
        };
        bgImg.src = imagePath;
    }
}

// CSS for smooth transitions and placeholders
const lazyLoadCSS = `
    .lazy-loading {
        filter: blur(2px);
        opacity: 0.7;
        transition: all 0.3s ease;
    }
    
    .lazy-loaded {
        filter: none;
        opacity: 1;
    }
    
    .lazy-error {
        opacity: 0.3;
        background-color: #f5f5f5;
        position: relative;
    }
    
    .lazy-error::after {
        content: "⚠️ Image unavailable";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        color: #666;
        background: rgba(255,255,255,0.9);
        padding: 5px 10px;
        border-radius: 4px;
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = lazyLoadCSS;
document.head.appendChild(styleSheet);

// Initialize the lazy loader
const lazyLoader = new ImageLazyLoader();

// Make it globally available for manual control
window.ImageLazyLoader = lazyLoader;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageLazyLoader;
}