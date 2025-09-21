document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwcH_VLBMBCq8BKsC7DEDl7BM0IKnbqvdX14aEJkWj9_OZiMGhPHXdai2KhJE6dvBBQMA/exec"; // <-- Paste the URL you just copied here

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        formStatus.className = 'form-status';
        formStatus.textContent = 'Submitting...';
        formStatus.style.opacity = 1;
        formStatus.style.transform = 'translateY(0)';

        const formData = new FormData(form);

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                body: formData,
            });

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
