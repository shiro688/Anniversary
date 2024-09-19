const startMusicButton = document.getElementById('start-music');
const backgroundMusic = document.getElementById('background-music');

// Event listener to start the music and navigate to index.html
startMusicButton.addEventListener('click', function () {
    if (backgroundMusic) {
        backgroundMusic.play().then(() => {
            // After playing music, navigate to index.html
            console.log('Music is playing');
            // Store music state in localStorage so it continues playing in index.html
            localStorage.setItem('musicPlaying', 'true');
            window.location.href = "pages/main_page.html"; // Redirect to index.html
        }).catch((error) => {
            console.error('Error playing music:', error);
        });
    }
});
