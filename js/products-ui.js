// Product UI interactions and functionality

// Function to get translated inquiry message
function getInquiryMessage(productType, selection) {
    // Get the translated product name
    const product = productData[productType];
    const productName = getTranslation(product.translationKey) || product.name;
    
    // Get translated country name
    const origin = product.origins[selection.originKey];
    const countryName = getTranslation(origin.countryTranslationKey) || origin.country;
    
    // Get translated message template
    const template = getTranslation('inquiry.message_template');
    
    if (template) {
        // Replace placeholders in the translated template
        return template
            .replace('{productName}', productName)
            .replace('{country}', countryName)
            .replace('{manufacturer}', selection.manufacturer);
    }
    
    // Fallback to English if translation is not available
    return `Dear Kakao Balkan Team,

I am interested in purchasing ${productName} from ${countryName} (${selection.manufacturer}).

Could you please provide me with:
- Detailed product specifications and technical data sheet
- Current pricing and minimum order quantities
- Availability and delivery timeframes
- Quality certificates and documentation
- Sample availability

I look forward to discussing this opportunity further.

Best regards,`;
}

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
    
    // Close language dropdown if it's open
    if (typeof closeLanguageDropdown === 'function') {
        closeLanguageDropdown();
    }
    
    // Remove overlay if exists
    const existingOverlay = document.querySelector('.dropdown-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
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
        dropdown.style.backgroundColor = '';
        button.classList.remove('active');
    } else {
        // Check if mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Create overlay for mobile
            const overlay = document.createElement('div');
            overlay.className = 'dropdown-overlay active';
            document.body.appendChild(overlay);
            
            // Add close button to dropdown
            if (!dropdown.querySelector('.dropdown-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'dropdown-close';
                closeBtn.innerHTML = '×';
                closeBtn.onclick = () => closeDropdown(productType);
                dropdown.appendChild(closeBtn);
            }
            
            // Close on overlay click
            overlay.onclick = () => closeDropdown(productType);
        }
        
        // Open current dropdown
        dropdown.style.display = 'block';
        dropdown.style.visibility = 'visible';
        dropdown.style.opacity = '1';
        dropdown.style.zIndex = '9999';
        dropdown.classList.add('active');
        button.classList.add('active');
    }
}

// Close dropdown function
function closeDropdown(productType) {
    const dropdown = document.getElementById(`origins-${productType}`);
    const button = document.querySelector(`[data-product="${productType}"] .btn-origins`);
    const overlay = document.querySelector('.dropdown-overlay');
    
    if (dropdown) {
        dropdown.classList.remove('active');
        dropdown.style.display = 'none';
    }
    
    if (button) {
        button.classList.remove('active');
    }
    
    if (overlay) {
        overlay.remove();
    }
}

// Close other dropdowns (for integration with language picker)
function closeOtherDropdowns() {
    document.querySelectorAll('.origins-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.style.display = 'none';
    });
    
    document.querySelectorAll('.btn-origins').forEach(button => {
        button.classList.remove('active');
    });
    
    // Remove overlay
    const overlay = document.querySelector('.dropdown-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Select origin and flip card
function selectOrigin(productType, originKey) {
    const product = productData[productType];
    const origin = product.origins[originKey];
    const card = document.querySelector(`[data-product="${productType}"]`);
    const selectedContainer = document.getElementById(`selected-${productType}`);
    
    // Get translated country name
    const countryName = getTranslation(origin.countryTranslationKey) || origin.country;
    
    // Store selection
    selectedProducts[productType] = {
        productName: getTranslation(product.translationKey) || product.name,
        originKey: originKey,
        country: countryName,
        manufacturer: origin.manufacturer,
        flag: origin.flag
    };
    
    // Show selected origin on back side
    selectedContainer.innerHTML = `
        <div class="origin-display">
            <span class="flag">${origin.flag}</span>
            <div class="info">
                <h5>${countryName}</h5>
                <p>${origin.manufacturer}</p>
            </div>
        </div>
    `;
    
    // Close dropdown immediately
    closeDropdown(productType);
    
    // Flip card
    card.classList.add('flipped');
    
    // Auto-scroll to show the entire flipped card (both mobile and desktop)
    setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardTop = cardRect.top + window.pageYOffset;
        const cardHeight = cardRect.height;
        
        if (isMobile) {
            // Mobile: scroll to show entire card with minimal top padding
            const targetScrollTop = cardTop - 20; // 20px padding from top
            const maxScrollNeeded = cardTop + cardHeight - viewportHeight + 20; // 20px padding from bottom
            
            // Use the scroll position that ensures entire card is visible
            const finalScrollTop = Math.min(targetScrollTop, maxScrollNeeded);
            
            window.scrollTo({
                top: Math.max(0, finalScrollTop),
                behavior: 'smooth'
            });
        } else {
            // Desktop: scroll to show entire card with more padding
            const targetScrollTop = cardTop - 50; // 50px padding from top
            const maxScrollNeeded = cardTop + cardHeight - viewportHeight + 50; // 50px padding from bottom
            
            // Use the scroll position that ensures entire card is visible
            const finalScrollTop = Math.min(targetScrollTop, maxScrollNeeded);
            
            window.scrollTo({
                top: Math.max(0, finalScrollTop),
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

// Send inquiry - scroll to contact form and fill it with translated message
function sendInquiry(productType) {
    const selection = selectedProducts[productType];
    
    if (!selection) {
        // Show alert in current language
        const alertMessage = getTranslation('inquiry.select_origin_first') || 'Please select an origin first.';
        alert(alertMessage);
        return;
    }
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Fill out the form after scrolling with translated message
        setTimeout(() => {
            const messageField = document.getElementById('message');
            
            if (messageField) {
                const message = getInquiryMessage(productType, selection);
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

// Update selected origins when language changes
function updateSelectedOrigins() {
    Object.keys(selectedProducts).forEach(productType => {
        const selection = selectedProducts[productType];
        const product = productData[productType];
        const origin = product.origins[selection.originKey];
        
        // Update the product name and country name in the selection
        selection.productName = getTranslation(product.translationKey) || product.name;
        selection.country = getTranslation(origin.countryTranslationKey) || origin.country;
        
        // Update the display if the card is flipped
        const card = document.querySelector(`[data-product="${productType}"]`);
        if (card && card.classList.contains('flipped')) {
            const selectedContainer = document.getElementById(`selected-${productType}`);
            if (selectedContainer) {
                selectedContainer.innerHTML = `
                    <div class="origin-display">
                        <span class="flag">${selection.flag}</span>
                        <div class="info">
                            <h5>${selection.country}</h5>
                            <p>${selection.manufacturer}</p>
                        </div>
                    </div>
                `;
            }
        }
    });
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

// Add to cart functionality (placeholder)
document.addEventListener('DOMContentLoaded', () => {
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
});

// Event listeners
document.addEventListener('click', function(event) {
    // Don't close if clicking inside the dropdown content or language picker
    if (!event.target.closest('.product-card') && 
        !event.target.closest('.origins-dropdown') && 
        !event.target.closest('.dropdown-overlay') &&
        !event.target.closest('.language-picker')) {
        
        closeOtherDropdowns();
    }
});

// Handle escape key to close dropdowns
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOtherDropdowns();
    }
});

// Prevent dropdown from closing when scrolling inside it
document.addEventListener('touchmove', function(event) {
    // Allow scrolling inside dropdown containers
    if (event.target.closest('.origins-container')) {
        return;
    }
    
    // Prevent body scrolling when dropdown is open on mobile
    const activeDropdown = document.querySelector('.origins-dropdown.active');
    if (activeDropdown && window.innerWidth <= 768) {
        event.preventDefault();
    }
}, { passive: false });

// Handle window resize to reposition dropdowns if needed
window.addEventListener('resize', function() {
    // Close all dropdowns on resize to prevent positioning issues
    closeOtherDropdowns();
});

// Listen for language changes and update products accordingly
document.addEventListener('DOMContentLoaded', function() {
    // Override the language change function to update products
    const originalChangeLanguage = window.changeLanguage;
    
    if (typeof originalChangeLanguage === 'function') {
        window.changeLanguage = async function(langCode) {
            // Call the original function
            await originalChangeLanguage(langCode);
            
            // Update selected origins after language change
            setTimeout(() => {
                updateSelectedOrigins();
            }, 100);
        };
    }
});



// Export functions for global access
window.showOrigins = showOrigins;
window.closeDropdown = closeDropdown;
window.selectOrigin = selectOrigin;
window.flipBack = flipBack;
window.sendInquiry = sendInquiry;
window.closeOtherDropdowns = closeOtherDropdowns;
window.updateSelectedOrigins = updateSelectedOrigins;