// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle main contact form
    const contactForm = document.getElementById('contactForm');
    
    // Handle footer contact form
    const footerForm = document.getElementById('footerContactForm');
    
    function handleFormSubmit(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fullNameInput = form.querySelector('input[name="fullName"]');
            const emailInput = form.querySelector('input[name="email"]');
            const phoneInput = form.querySelector('input[name="phoneNumber"]');
            const messageInput = form.querySelector('textarea[name="message"]');
            
            const formData = {
                fullName: fullNameInput ? fullNameInput.value : '',
                email: emailInput ? emailInput.value : '',
                phoneNumber: phoneInput ? phoneInput.value : '',
                message: messageInput ? messageInput.value : ''
            };
            
            let messageDiv = form.querySelector('#formMessage');
            
            // If no formMessage div in form, create one
            if (!messageDiv) {
                messageDiv = document.createElement('div');
                messageDiv.id = 'formMessage';
                messageDiv.style.cssText = 'display:none; margin-top: 10px; padding: 10px; border-radius: 4px;';
                form.parentNode.insertBefore(messageDiv, form.nextSibling);
            }
            
            try {
                const response = await fetch('https://sneha.dev.redmattertech.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    messageDiv.style.display = 'block';
                    messageDiv.style.backgroundColor = '#d4edda';
                    messageDiv.style.color = '#155724';
                    messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
                    form.reset();
                    
                    // Hide message after 3 seconds
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 3000);
                } else {
                    messageDiv.style.display = 'block';
                    messageDiv.style.backgroundColor = '#f8d7da';
                    messageDiv.style.color = '#721c24';
                    messageDiv.textContent = 'Error sending message. Please try again.';
                }
            } catch (error) {
                messageDiv.style.display = 'block';
                messageDiv.style.backgroundColor = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.textContent = 'Error: ' + error.message;
            }
        });
    }
    
    if (contactForm) {
        handleFormSubmit(contactForm);
    }
    
    if (footerForm) {
        handleFormSubmit(footerForm);
    }
});
