document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const scriptUrl = "https://script.google.com/macros/s/AKfycbztO7c7Qxbn4mSTvrtfg3x9pFVxhIE5YcesjNQRkfQZQHO1JmGhgabr5Er0tG_rWVrMmQ/exec";

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        formStatus.className = 'form-status';
        formStatus.textContent = 'Submitting your information...';
        formStatus.style.opacity = 1;
        formStatus.style.transform = 'translateY(0)';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Convert data to a URL search string
        const queryString = new URLSearchParams(data).toString();

        try {
            const response = await fetch(`${scriptUrl}?${queryString}`);
            const result = await response.json();

            if (result.status === 'success') {
                formStatus.textContent = '🎉 Your information has been submitted successfully!';
                formStatus.classList.add('success');
                form.reset();
            } else {
                throw new Error(result.message || 'An unexpected error occurred.');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            formStatus.textContent = `Submission failed: ${error.message}`;
            formStatus.classList.add('error');
        }
    });
});