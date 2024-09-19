const quotes = [
    // Romantic Quotes
    "Love is composed of a single soul inhabiting two bodies. – Aristotle",
    "In all the world, there is no heart for me like yours. – Maya Angelou",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams. – Dr. Seuss",
    "I love you not only for what you are, but for what I am when I am with you. – Roy Croft",
    "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love. – Gabriel Garcia Marquez",

    // Anniversary Quotes
    "Forever is a long time, but I wouldn't mind spending it by your side.",
    "The best thing to hold onto in life is each other. – Audrey Hepburn",
    "I wish there was a word more than ‘love’ to convey what I feel for you.",
    "Every love story is beautiful, but ours is my favorite.",
    "Whatever our souls are made of, yours and mine are the same. – Emily Brontë"
];

const heartContainer = document.querySelector('.heart-container');
const quoteElement = document.getElementById('love-quote');
const button = document.getElementById('new-quote');
const anniversaryMessageElement = document.getElementById('anniversary-message');
const volumeSlider = document.getElementById('volume-slider');
const backgroundMusic = document.getElementById('background-music');

// Function to change the quote
function changeQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Function to create random hearts that float up from the screen edges
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Randomly decide which side (left, right, or bottom) the heart will start from
    const randomStart = Math.random();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (randomStart < 0.33) {
        // Start from the bottom
        heart.style.left = Math.random() * windowWidth + 'px';
        heart.style.bottom = '-40px'; // Start slightly off-screen
    } else if (randomStart < 0.66) {
        // Start from the left side
        heart.style.left = '-40px'; // Off-screen left
        heart.style.top = Math.random() * windowHeight + 'px';
    } else {
        // Start from the right side
        heart.style.right = '-40px'; // Off-screen right
        heart.style.top = Math.random() * windowHeight + 'px';
    }

    // Append the heart to the heart container
    heartContainer.appendChild(heart);

    // Set up the removal of the heart after its animation completes
    setTimeout(() => {
        heart.remove();
    }, 7000); // Remove after 7 seconds (matches animation duration)
}

// Create hearts at random intervals
setInterval(createHeart, 50); // Adjust this value for more or fewer hearts

// Function to display the message text by text
function displayMessage(message, element, delay = 35) {
    let index = 0;
    element.textContent = ''; // Clear previous content
    element.classList.remove('hidden'); // Make sure the message element is visible

    function typeLetter() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            setTimeout(typeLetter, delay);
        }
    }

    typeLetter();
}

// Display the anniversary message
const anniversaryMessage = `Hey Sofia My Love,

Happy anniversary! Time really flies when you’re with someone as amazing as you. It’s been 2 months now that we have reached our anniversary and your birthday is just around the corner! Time really flies when I’m having fun and with you every day is just the best. 😊

... (message truncated for brevity)
`;

// Display the message
displayMessage(anniversaryMessage, anniversaryMessageElement);

// Add event listener to the button
button.addEventListener('click', changeQuote);

// Function to update slider background based on the volume level
function updateSliderBackground() {
    const value = volumeSlider.value;
    const max = volumeSlider.max;
    const percentage = (value / max) * 100;
    volumeSlider.style.background = `linear-gradient(
        to right,
        #ff69b4 ${percentage}%,
        #ddd ${percentage}%)
    `;
}

// Initialize slider background on page load
updateSliderBackground();

// Update slider background on input change
volumeSlider.addEventListener('input', updateSliderBackground);

// Change the quote when the page loads
window.onload = function() {
    // Check if the page was reloaded
    if (performance.navigation.type === 1) {
        // If page was refreshed, redirect to the index/home page
        window.location.href = '../index.html';  // Replace with the correct path to your home page
        return;
    }

    changeQuote();  // Randomly change the quote on page load

    // Initialize volume if the music is playing
    if (localStorage.getItem('musicPlaying') === 'true') {
        backgroundMusic.play().catch((error) => {
            console.error('Error playing background music:', error);
        });

        // Initialize volume
        backgroundMusic.volume = volumeSlider.value;

        // Update volume and slider background when slider changes
        volumeSlider.addEventListener('input', function () {
            backgroundMusic.volume = volumeSlider.value;
            updateSliderBackground(); // Update slider background color
        });

        // Initialize the slider background
        updateSliderBackground();
    }
};
