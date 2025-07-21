// Language Picker Functionality

// Language configuration (removed flags)
const languageConfig = {
    en: { name: 'English', code: 'EN' },
    sr: { name: 'Srpski', code: 'SR' },
};

// Current language state
let currentLanguage = 'en';
let translations = {};
let isInitialized = false;

// Hide language picker with fade-out effect
function hideLanguagePicker() {
    const languagePicker = document.querySelector('.language-picker');
    if (languagePicker) {
        languagePicker.style.opacity = '0';
        languagePicker.style.visibility = 'hidden';
        languagePicker.style.transition = 'opacity 0.6s ease-in-out, visibility 0.6s ease-in-out';
    }
}

// Show language picker with fade-in effect
function showLanguagePicker() {
    const languagePicker = document.querySelector('.language-picker');
    if (languagePicker) {
        languagePicker.style.visibility = 'visible';
        languagePicker.style.opacity = '1';
        
        // Add a subtle scale animation for extra effect
        languagePicker.style.transform = 'scale(0.95)';
        setTimeout(() => {
            languagePicker.style.transform = 'scale(1)';
            languagePicker.style.transition = 'opacity 0.6s ease-in-out, visibility 0.6s ease-in-out, transform 0.3s ease-out';
        }, 50);
    }
}

// Initialize language picker
async function initializeLanguagePicker() {
    hideLanguagePicker();
    setTimeout(() => {
        showLanguagePicker();
    }, 3000);
    
    // Get saved language from localStorage or default to 'en'
    currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Update UI to show current language
    updateCurrentLanguageDisplay();
    
    // Load translations for current language and apply them immediately
    await loadLanguage(currentLanguage);
    applyTranslations();
    
    // Populate language options
    populateLanguageOptions();
    
    isInitialized = true;
}

// Update current language display in button (no flags)
function updateCurrentLanguageDisplay() {
    const codeElement = document.getElementById('currentLang');
    const config = languageConfig[currentLanguage];
    
    if (codeElement && config) {
        codeElement.textContent = config.code;
    }
    
    // Hide the flag element if it exists
    const flagElement = document.getElementById('currentFlag');
    if (flagElement) {
        flagElement.style.display = 'none';
    }
}

// Populate language dropdown options (no flags)
function populateLanguageOptions() {
    const dropdown = document.querySelector('.language-dropdown-container');
    if (!dropdown) return;
    
    // Clear existing options
    dropdown.innerHTML = '';
    
    // Add each language option
    Object.keys(languageConfig).forEach(langCode => {
        const config = languageConfig[langCode];
        const option = document.createElement('div');
        option.className = `language-option ${langCode === currentLanguage ? 'current' : ''}`;
        option.onclick = () => changeLanguage(langCode);
        
        option.innerHTML = `
            <div class="language-option-left">
                <span class="language-name">${config.name}</span>
            </div>
            <span class="language-code">${config.code}</span>
        `;
        
        dropdown.appendChild(option);
    });
}

// Toggle language dropdown visibility
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const button = document.querySelector('.language-button');
    
    if (!dropdown || !button) return;
    
    // Close other dropdowns if any
    if (typeof closeOtherDropdowns === 'function') {
        closeOtherDropdowns();
    }
    
    // Toggle current dropdown
    const isActive = dropdown.classList.contains('active');
    
    if (isActive) {
        dropdown.classList.remove('active');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('active');
        button.classList.add('active');
    }
}

// Close language dropdown
function closeLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const button = document.querySelector('.language-button');
    
    if (dropdown) dropdown.classList.remove('active');
    if (button) button.classList.remove('active');
}

// Handle click events on language options
document.addEventListener('click', function(event) {
    const languageOption = event.target.closest('.language-option');
    const dropdown = document.getElementById('languageDropdown');
    
    if (languageOption && !dropdown.classList.contains('active')) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}, true);

// Change language
async function changeLanguage(langCode) {
    if (langCode === currentLanguage) {
        closeLanguageDropdown();
        return;
    }
    
    // Show loading state
    const picker = document.querySelector('.language-picker');
    if (picker) picker.classList.add('loading');
    
    try {
        // Load new language
        await loadLanguage(langCode);
        
        // Update current language
        currentLanguage = langCode;
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', langCode);
        
        // Update UI
        updateCurrentLanguageDisplay();
        populateLanguageOptions();
        
        // Apply translations to page
        applyTranslations();
        
        // Close dropdown
        closeLanguageDropdown();
        
    } catch (error) {
        console.error('Error changing language:', error);
        alert('Error loading language. Please try again.');
    } finally {
        // Remove loading state
        if (picker) picker.classList.remove('loading');
    }
}

// Load language JSON file
async function loadLanguage(langCode) {
    try {
        const response = await fetch(`languages/${langCode}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${langCode}.json (Status: ${response.status})`);
        }
        
        translations = await response.json();
    } catch (error) {
        console.error(`Error loading language ${langCode}:`, error);
        
        // Fallback to English if current language fails and it's not English
        if (langCode !== 'en') {
            try {
                const response = await fetch('languages/en.json');
                if (response.ok) {
                    translations = await response.json();
                    currentLanguage = 'en';
                    localStorage.setItem('selectedLanguage', 'en');
                } else {
                    translations = {};
                }
            } catch (fallbackError) {
                console.error('Error loading fallback English:', fallbackError);
                translations = {};
            }
        } else {
            // If English also fails, use empty translations
            translations = {};
        }
    }
}

// Apply translations to page elements
function applyTranslations() {
    if (!translations || Object.keys(translations).length === 0) {
        console.warn('No translations available to apply');
        return;
    }

    let translatedCount = 0;

    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (translation && translation !== key) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                // Don't change input values, only placeholders if specifically needed
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
            translatedCount++;
        }
    });
    
    // Translate elements with data-translate-html attribute (for HTML content)
    document.querySelectorAll('[data-translate-html]').forEach(element => {
        const key = element.getAttribute('data-translate-html');
        const translation = getTranslation(key);
        
        if (translation && translation !== key) {
            element.innerHTML = translation;
            translatedCount++;
        }
    });
    
    // Translate placeholder attributes
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        
        if (translation && translation !== key) {
            element.placeholder = translation;
            translatedCount++;
        }
    });
}

// Get translation by key with dot notation support
function getTranslation(key) {
    if (!key || !translations) {
        return key;
    }

    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return key as fallback
        }
    }
    
    return typeof value === 'string' ? value : key;
}

// Event listeners
document.addEventListener('click', function(event) {
    const languagePicker = event.target.closest('.language-picker');
    
    if (!languagePicker) {
        closeLanguageDropdown();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLanguageDropdown();
    }
});

// Initialize immediately when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguagePicker();
});

// Also initialize on window load as backup
window.addEventListener('load', function() {
    if (!isInitialized) {
        initializeLanguagePicker();
    }
});

// Re-apply translations when page content changes (for dynamic content)
function refreshTranslations() {
    if (isInitialized) {
        applyTranslations();
    }
}

// Export functions for use in other scripts
window.changeLanguage = changeLanguage;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.closeLanguageDropdown = closeLanguageDropdown;
window.refreshTranslations = refreshTranslations;
window.getTranslation = getTranslation;
window.getCurrentLanguage = () => currentLanguage;