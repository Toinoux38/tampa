document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slides');
    const wallpapers = document.querySelectorAll('.wallpaper');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const downloadBtn = document.getElementById('downloadBtn');
    const confirmationSound = document.getElementById('confirmationSound');
    const footerText = document.querySelector('.footer-text');
    let currentIndex = 0;
    let startX, currentX;

    const clickSound = new Audio('thanos.mp3'); // Add the path to your click sound file here

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; 
    });

    slider.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX; 
        const diffX = currentX - startX; 

        slider.style.transform = `translateX(${(currentIndex * -100) + (diffX / slider.clientWidth) * 100}%)`;
    });

    slider.addEventListener('touchend', (e) => {
        const diffX = currentX - startX; 

        if (diffX < -50) {
            showNextWallpaper();
        } else if (diffX > 50) {
            showPreviousWallpaper();
        } else {
            resetSliderPosition();
        }
    });

    function showNextWallpaper() {
        currentIndex = (currentIndex + 1) % wallpapers.length;
        updateSliderPosition();
    }

    function showPreviousWallpaper() {
        currentIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length;
        updateSliderPosition();
    }

    function updateSliderPosition() {
        slider.style.transition = 'transform 0.3s ease'; 
        slider.style.transform = `translateX(${currentIndex * -100}%)`;
    }

    function resetSliderPosition() {
        slider.style.transition = 'transform 0.3s ease';
        slider.style.transform = `translateX(${currentIndex * -100}%)`;
    }

    leftButton.addEventListener('click', () => {
        showPreviousWallpaper();
    });

    rightButton.addEventListener('click', () => {
        showNextWallpaper();
    });

    downloadBtn.addEventListener('click', () => {
        confirmationSound.play();
        downloadBtn.classList.add('downloading');

        setTimeout(() => {
            const currentWallpaper = wallpapers[currentIndex].src;
            const link = document.createElement('a');
            link.href = currentWallpaper;
            link.download = `wallpaper${currentIndex + 1}.jpg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            downloadBtn.classList.remove('downloading');

            // Smooth scroll to the footer text
            footerText.scrollIntoView({ behavior: 'smooth' });
    });

    // Add click event to each wallpaper to play sound
    
})});
