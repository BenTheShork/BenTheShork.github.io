// Contact form handling and notification system with EmailJS integration

emailjs.init("t_xA6BbmjiQEmi5qs");

const contactForm = document.getElementById('contactForm');

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
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
    
    // Get submit button for loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Prepare email data for EmailJS
        const emailData = {
            from_name: data.name,
            from_email: data.email,
            company: data.company || 'Not specified',
            message: data.message,
            to_email: 'igor.sergejev@kakaobalkan.rs'
        };
        
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_l8dbsaa',    
            'template_keb2kvo',   
            emailData
        );
        
        // Show success notification
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Failed to send email:', error);
        
        // More detailed error logging
        if (error.status) {
            console.error('Error status:', error.status);
        }
        if (error.text) {
            console.error('Error text:', error.text);
        }
        
        // Show error notification with more details
        let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
        
        // Provide more specific error messages based on common issues
        if (error.status === 400) {
            errorMessage = 'Invalid request. Please check all fields and try again.';
        } else if (error.status === 401) {
            errorMessage = 'Email service authentication failed. Please try again later.';
        } else if (error.status === 402) {
            errorMessage = 'Email service quota exceeded. Please try again later.';
        }
        
        showNotification(errorMessage, 'error');
        
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Alternative method using emailjs.sendForm (you can try this instead)
function sendEmailAlternative(e) {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // This method sends the form directly without manual data preparation
    emailjs.sendForm('service_l8dbsaa', 'template_keb2kvo', contactForm)
        .then(function(response) {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        })
        .finally(function() {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

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

// Export functions for global access
window.showNotification = showNotification;