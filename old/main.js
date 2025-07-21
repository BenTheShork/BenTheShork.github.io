// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150; // Offset for fixed navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

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

// Observe elements for animation
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

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

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

// Add to cart functionality (placeholder)
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        showNotification(`${productTitle} added to cart!`, 'success');
    });
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

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', async () => {
    const heroTitleMain = document.querySelector('.hero-title-main');
    const heroTitleAccent = document.querySelector('.hero-title-accent');
    
    if (heroTitleMain && heroTitleAccent) {
        let language = 'en';
        if(localStorage.getItem('selectedLanguage') !== null)
            language = localStorage.getItem(selectedLanguage);
        
        try {
            // Load language file based on current language
            const response = await fetch(`languages/${language}.json`);
            const translations = await response.json();
            
            // Use the translations from the loaded file
            setTimeout(() => {
                typeWriter(heroTitleMain, translations.heroTitleMain || 'Your Cocoa Source', 80);
            }, 500);
            
            setTimeout(() => {
                typeWriter(heroTitleAccent, translations.heroTitleAccent || 'Kakao Balkan', 80);
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


// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

const facilityStats = document.querySelector('.facility-stats');
if (facilityStats) {
    statsObserver.observe(facilityStats);
}

// Product Category Switching
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.product-category-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Remove active class from all buttons and sections
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categorySections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            button.classList.add('active');
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animate the section entrance
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                    targetSection.style.transition = 'all 0.6s ease-out';
                }, 50);
            }
        });
    });
});

// Facility Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const facilityImages = [
        {
            src: "2016_10_18_panorama_03.jpg",
            title: "Processing Floor Overview",
            description: "Our main production floor featuring state-of-the-art equipment for sorting, cleaning, and processing premium cacao beans.",
            alt: "Processing Floor Overview"
        },
        {
            src: "untitled-1.jpg",
            title: "Quality Control Laboratory",
            description: "Advanced testing facility where every batch undergoes rigorous analysis to ensure consistent quality and purity standards.",
            alt: "Quality Control Lab"
        },
        {
            src: "2016_10_18_07.jpg",
            title: "Precision Roasting Department",
            description: "Temperature-controlled roasting chambers with computerized monitoring systems for optimal flavor development.",
            alt: "Roasting Department"
        },
        {
            src: "2017_01_26_0049.jpg",
            title: "Automated Packaging Line",
            description: "Hygienic packaging system ensuring product freshness and maintaining quality from facility to customer.",
            alt: "Packaging Line"
        },
        {
            src: "2017_01_26_0026.jpg",
            title: "Climate-Controlled Storage",
            description: "Warehouse facility with optimal temperature and humidity controls to preserve cacao bean integrity.",
            alt: "Storage Warehouse"
        },
        {
            src: "2017_01_26_0056.jpg",
            title: "Research & Development Center",
            description: "Innovation laboratory where our team develops new products and refines existing processes.",
            alt: "Research & Development"
        }
    ];

    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Update main image
                const imageData = facilityImages[index];
                mainImage.innerHTML = `
                    <img src="${imageData.src}" alt="${imageData.alt}" class="main-facility-image">
                    <div class="image-overlay">
                        <h4>${imageData.title}</h4>
                        <p>${imageData.description}</p>
                    </div>
                `;
                
                // Add smooth transition effect
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Auto-cycle through images (optional)
    let currentImageIndex = 0;
    const autoChangeInterval = 8000; // 8 seconds

    function autoChangeImage() {
        const nextIndex = (currentImageIndex + 1) % facilityImages.length;
        const nextThumbnail = thumbnails[nextIndex];
        
        if (nextThumbnail) {
            nextThumbnail.click();
            currentImageIndex = nextIndex;
        }
    }

    // Start auto-cycle (uncomment to enable)
    // setInterval(autoChangeImage, autoChangeInterval);

    // Pause auto-cycle on hover
    if (mainImage) {
        mainImage.addEventListener('mouseenter', () => {
            // clearInterval(autoChangeInterval);
        });
        
        mainImage.addEventListener('mouseleave', () => {
            // Resume auto-cycle if needed
        });
    }
});

// Product and origin data
const productData = {
    powder: {
        name: "Natural Cocoa Powder",
        origins: {
            malaysia: { country: "Malaysia", manufacturer: "Guan Chong Cocoa Manufacturer", flag: "🇲🇾" },
            indonesia: { country: "Indonesia", manufacturer: "PT Golden Harvest Cocoa Indonesia", flag: "🇮🇩" },
            peru: { country: "Peru", manufacturer: "Machu Picchu Foods SA", flag: "🇵🇪" }
        }
    },
    liquor: {
        name: "Cocoa Liquor",
        origins: {
            ivory1: { country: "Côte d'Ivoire", manufacturer: "DIAKITE COCOA PRODUCTS SARL", flag: "🇨🇮" },
            ghana: { country: "Ghana", manufacturer: "Chocomac Ghana Limited", flag: "🇬🇭" },
            ivory2: { country: "Côte d'Ivoire", manufacturer: "Citract SA", flag: "🇨🇮" },
            peru: { country: "Peru", manufacturer: "Machu Picchu Foods SA", flag: "🇵🇪" }
        }
    },
    butter: {
        name: "Pure Cocoa Butter",
        origins: {
            venezuela1: { country: "Venezuela", manufacturer: "Cacaos Venezolanos de Calidad C.A.", flag: "🇻🇪" },
            venezuela2: { country: "Venezuela", manufacturer: "Procesadora Cacao Real", flag: "🇻🇪" },
            ivory: { country: "Côte d'Ivoire", manufacturer: "DIAKITE COCOA PRODUCTS SARL", flag: "🇨🇮" },
            peru: { country: "Peru", manufacturer: "Machu Picchu Foods SA", flag: "🇵🇪" },
            nigeria: { country: "Nigeria", manufacturer: "Johnwents Industries Limited", flag: "🇳🇬" },
            china: { country: "China", manufacturer: "Huadong Industrial Limited", flag: "🇨🇳" }
        }
    },
    cake: {
        name: "Cocoa Cake",
        origins: {
            usa: { country: "USA", manufacturer: "Savita Naturals LTD", flag: "🇺🇸" },
            venezuela: { country: "Venezuela", manufacturer: "Procesadora Cacao Real", flag: "🇻🇪" },
            ivory: { country: "Côte d'Ivoire", manufacturer: "DIAKITE COCOA PRODUCTS SARL", flag: "🇨🇮" },
            peru: { country: "Peru", manufacturer: "Machu Picchu Foods SA", flag: "🇵🇪" },
            nigeria: { country: "Nigeria", manufacturer: "Johnwents Industries Limited", flag: "🇳🇬" },
            china: { country: "China", manufacturer: "Huadong Industrial Limited", flag: "🇨🇳" }
        }
    }
};

// Store selected products
let selectedProducts = {};

// Show origins dropdown
function showOrigins(productType) {
    
    const dropdown = document.getElementById(`origins-${productType}`);
    const button = document.querySelector(`[data-product="${productType}"] .btn-origins`);
    const card = document.querySelector(`[data-product="${productType}"]`);
    
    if (!dropdown) {
        console.error('Dropdown not found for:', productType);
        return;
    }
    
    // Close other dropdowns first
    document.querySelectorAll('.origins-dropdown').forEach(d => {
        if (d.id !== `origins-${productType}`) {
            d.classList.remove('active');
            d.style.display = 'none';
        }
    });
    
    // Close other buttons
    document.querySelectorAll('.btn-origins').forEach(b => {
        if (b !== button) {
            b.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    const isCurrentlyActive = dropdown.classList.contains('active');
    
    if (isCurrentlyActive) {
        // Close current dropdown
        dropdown.classList.remove('active');
        dropdown.style.display = 'none';
        button.classList.remove('active');
    } else {
        // Open current dropdown
        dropdown.style.display = 'block';
        dropdown.classList.add('active');
        button.classList.add('active');
        
        // Auto-scroll if dropdown would be cut off
        setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const dropdownHeight = 500;
            const viewportHeight = window.innerHeight;
            const cardBottom = cardRect.bottom;
            
            if (cardBottom + dropdownHeight > viewportHeight) {
                const scrollOffset = (cardBottom + dropdownHeight) - viewportHeight + 50;
                window.scrollBy({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

// Select origin and flip card
function selectOrigin(productType, originKey) {
    const product = productData[productType];
    const origin = product.origins[originKey];
    const card = document.querySelector(`[data-product="${productType}"]`);
    const selectedContainer = document.getElementById(`selected-${productType}`);
    const dropdown = document.getElementById(`origins-${productType}`);
    const button = document.querySelector(`[data-product="${productType}"] .btn-origins`);
    
    // Store selection
    selectedProducts[productType] = {
        productName: product.name,
        originKey: originKey,
        country: origin.country,
        manufacturer: origin.manufacturer,
        flag: origin.flag
    };
    
    // Show selected origin on back side
    selectedContainer.innerHTML = `
        <div class="origin-display">
            <span class="flag">${origin.flag}</span>
            <div class="info">
                <h5>${origin.country}</h5>
                <p>${origin.manufacturer}</p>
            </div>
        </div>
    `;
    
    // Close dropdown immediately
    dropdown.classList.remove('active');
    dropdown.style.display = 'none';
    dropdown.style.backgroundColor = '';
    dropdown.style.border = '';
    button.classList.remove('active');
    
    // Flip card
    card.classList.add('flipped');
    
    // Auto-scroll to center the card
    setTimeout(() => {
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardTop = cardRect.top;
        const cardHeight = cardRect.height;
        const idealTop = (viewportHeight - cardHeight) / 3;
        
        if (cardTop > idealTop + 50 || cardTop < idealTop - 50) {
            const scrollOffset = cardTop - idealTop;
            window.scrollBy({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    }, 300);
}

// Flip card back to front
function flipBack(productType) {
    const card = document.querySelector(`[data-product="${productType}"]`);
    card.classList.remove('flipped');
}

// Send inquiry - scroll to contact form and fill it
function sendInquiry(productType) {
    const selection = selectedProducts[productType];
    
    if (!selection) {
        alert('Please select an origin first.');
        return;
    }
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Fill out the form after scrolling
        setTimeout(() => {
            const messageField = document.getElementById('message');
            
            if (messageField) {
                const message = `Dear Kakao Balkan Team,

I am interested in purchasing ${selection.productName} from ${selection.country} (${selection.manufacturer}).

Could you please provide me with:
- Detailed product specifications and technical data sheet
- Current pricing and minimum order quantities
- Availability and delivery timeframes
- Quality certificates and documentation
- Sample availability

I look forward to discussing this opportunity further.

Best regards,`;
                
                messageField.value = message;
                
                // Focus on the company field for user to start filling
                const companyField = document.getElementById('company');
                if (companyField) {
                    companyField.focus();
                }
            }
        }, 800);
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.product-card')) {
        document.querySelectorAll('.origins-dropdown').forEach(d => {
            d.classList.remove('active');
        });
        document.querySelectorAll('.btn-origins').forEach(b => {
            b.classList.remove('active');
        });
    }
});

// Handle escape key to close dropdowns
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.origins-dropdown').forEach(d => {
            d.classList.remove('active');
        });
        document.querySelectorAll('.btn-origins').forEach(b => {
            b.classList.remove('active');
        });
    }
});