document.addEventListener('DOMContentLoaded', () => {
    // --- Event Handling ---
    const clickButton = document.getElementById('clickButton');
    const hoverArea = document.getElementById('hoverArea');
    const keypressInput = document.getElementById('keypressInput');
    const keypressOutput = document.getElementById('keypressOutput');
    const doubleClickButton = document.getElementById('doubleClickButton');
    const longPressButton = document.getElementById('longPressButton');
    const longPressMessage = document.getElementById('longPressMessage');

    clickButton.addEventListener('click', () => {
        alert('Button Clicked!');
    });

    hoverArea.addEventListener('mouseover', () => {
        hoverArea.style.backgroundColor = 'lightgreen';
    });

    hoverArea.addEventListener('mouseout', () => {
        hoverArea.style.backgroundColor = 'lightblue';
    });

    keypressInput.addEventListener('keypress', (event) => {
        keypressOutput.textContent = `You pressed: ${event.key}`;
    });

    doubleClickButton.addEventListener('dblclick', () => {
        alert('Secret Double Click Action!');
    });

    let longPressTimer;
    longPressButton.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => {
            longPressMessage.classList.remove('hidden');
        }, 1500); // Adjust time for long press (milliseconds)
    });

    longPressButton.addEventListener('mouseup', () => {
        clearTimeout(longPressTimer);
    });

    longPressButton.addEventListener('mouseout', () => {
        clearTimeout(longPressTimer);
    });

    // --- Interactive Elements ---
    const changeTextButton = document.getElementById('changeTextButton');
    const imageGallery = document.getElementById('imageGallery');
    const images = imageGallery.querySelectorAll('img');
    const prevImageButton = document.getElementById('prevImage');
    const nextImageButton = document.getElementById('nextImage');
    let currentImageIndex = 0;

    changeTextButton.addEventListener('click', () => {
        changeTextButton.textContent = 'Text Changed!';
    });

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    if (images.length > 0) {
        showImage(currentImageIndex); // Show the first image initially
        if (prevImageButton && nextImageButton) {
            prevImageButton.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(currentImageIndex);
            });

            nextImageButton.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            });
        }
    }

    const tabButtons = document.querySelectorAll('.tab-buttons .tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            // Deactivate all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Form Validation ---
    const myForm = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');

    myForm.addEventListener('submit', (event) => {
        let isValid = true;

        // Required field check for Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Password rules
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
            formMessage.textContent = 'Please correct the errors above.';
            formMessage.style.color = 'red';
        } else {
            formMessage.textContent = 'Form submitted successfully!';
            formMessage.style.color = 'green';
            // In a real scenario, you would submit the form data here
        }
    });

    // Bonus: Real-time feedback while typing (for password)
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password is too short.';
        } else {
            passwordError.textContent = '';
        }
    });
});