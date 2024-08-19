document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slides');
    const wallpapers = document.querySelectorAll('.wallpaper');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const downloadBtn = document.getElementById('downloadBtn');
    const confirmationSound = document.getElementById('confirmationSound');
    const cowSound = document.getElementById('cowSound');
    const cowArea = document.getElementById('cowArea');
    const body = document.body;
    let clickCount = 0;
    let currentIndex = 0;
    let startX, currentX;

    // Handle touch start
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Get the initial touch position
    });

    // Handle touch move
    slider.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX; // Get the current touch position
        const diffX = currentX - startX; // Calculate the difference

        // Translate the slider based on the touch movement
        slider.style.transform = `translateX(${(currentIndex * -100) + (diffX / slider.clientWidth) * 100}%)`;
    });

    // Handle touch end
    slider.addEventListener('touchend', (e) => {
        const diffX = currentX - startX; // Calculate the final difference

        if (diffX < -50) {
            showNextWallpaper(); // Swipe left
        } else if (diffX > 50) {
            showPreviousWallpaper(); // Swipe right
        } else {
            // Reset the position
            resetSliderPosition();
        }
    });

    // Show next wallpaper
    function showNextWallpaper() {
        currentIndex = (currentIndex + 1) % wallpapers.length;
        updateSliderPosition();
    }

    // Show previous wallpaper
    function showPreviousWallpaper() {
        currentIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length;
        updateSliderPosition();
    }

    // Update slider position
    function updateSliderPosition() {
        slider.style.transition = 'transform 0.3s ease'; // Smooth transition
        slider.style.transform = `translateX(${currentIndex * -100}%)`;
    }

    // Reset slider position if not swiping enough
    function resetSliderPosition() {
        slider.style.transition = 'transform 0.3s ease'; // Smooth transition
        slider.style.transform = `translateX(${currentIndex * -100}%)`;
    }

    // Add functionality to navigation buttons
    leftButton.addEventListener('click', () => {
        showPreviousWallpaper();
    });

    rightButton.addEventListener('click', () => {
        showNextWallpaper();
    });

    // Download current wallpaper with delay
    downloadBtn.addEventListener('click', () => {
        // Play the confirmation sound
        confirmationSound.play();

        // Show "Downloading..." text
        downloadBtn.classList.add('downloading');

        // Wait for 1 second before initiating the download
        setTimeout(() => {
            // URL of the wallpaper to be downloaded
            const currentWallpaper = wallpapers[currentIndex].src;
            const link = document.createElement('a');
            link.href = currentWallpaper;
            link.download = `wallpaper${currentIndex + 1}.jpg`;

            // Append the link to the body and trigger click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Reset the button text and style after the download
            downloadBtn.classList.remove('downloading');
        }, 1000); // 1-second delay
    });

    // Load the Lottie animations
    const lottieArrow = lottie.loadAnimation({
        container: document.getElementById('lottie-arrow'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './arrow.json' // the path to the lottie animation json
    });

    const lottieMoo = lottie.loadAnimation({
        container: document.getElementById('lottie-moo'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './moo.json' // the path to the lottie animation json
    });

    // Function to check if the footer is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play the Lottie animation when the footer is in view
                lottieArrow.play();
                // Unobserve after playing the animation once
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px' // Adjust root margin to trigger slightly earlier
    });

    // Observe the footer element
    const footer = document.querySelector('.footer');
    if (footer) {
        observer.observe(footer);
    }

    // Handle click on the cow area
    cowArea.addEventListener('click', () => {
            cowSound.play();
            lottieMoo.goToAndStop(0, true); // Reset to first frame
            lottieMoo.play(); // Play animation
            document.getElementById('lottie-moo').style.display = 'block';
        
        
    });
});




