// State management
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
let touchStartX = 0;
let touchEndX = 0;

// Image list for carousel
const imageList = [
    'IMG_1252.jpg', 'IMG_1902.jpg', 'IMG_2059.jpg', 'IMG_2070.jpg',
    'IMG_2077.jpg', 'IMG_2266.jpg', 'IMG_2314.jpg', 'IMG_2352.jpg',
    'IMG_2355.jpg', 'IMG_2468.jpg', 'IMG_2484.jpg', 'IMG_2492.jpg',
    'IMG_2519.jpg', 'IMG_2526.jpg', 'IMG_2531.jpg', 'IMG_2532.jpg',
    'IMG_2537.jpg', 'IMG_2587.jpg', 'IMG_2604.jpg', 'IMG_2644.jpg',
    'IMG_2651.jpg', 'IMG_2668.jpg', 'IMG_2702.jpg', 'IMG_2741.jpg',
    'IMG_3134.jpg', 'IMG_3245.jpg', 'IMG_3405.jpg', 'PXL_20250912_231951776.jpg',
    'PXL_20250913_144321013.TS-000.MP.jpg', 'PXL_20250913_150705075.TS-000.MP.jpg',
    'finalBear.jpg'
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSlide1();
    setupTouchGestures();
    initProgressDots();
    updateProgressBar();
});

// Initialize progress dots
function initProgressDots() {
    const progressDotsContainer = document.getElementById('progressDots');
    const totalSlides = slides.length;
    const numDots = totalSlides;

    // Create a dot for each slide
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i === 0) dot.classList.add('active');
        progressDotsContainer.appendChild(dot);
    }
}

// Progress bar update
function updateProgressBar() {
    const progress = ((currentSlideIndex + 1) / slides.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Update progress dots - only the current one is active
    const dots = document.querySelectorAll('.progress-dot');

    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Slide navigation
function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;

    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[index];

    currentSlide.classList.remove('active');
    currentSlide.classList.add('prev');

    nextSlide.classList.remove('prev');
    nextSlide.classList.add('active');

    currentSlideIndex = index;
    updateProgressBar();

    // Initialize slide-specific functionality
    if (index === 1) initSlide2();
    if (index === 2) initSlide2_5(); // Collage slide
    if (index === 3) initSlide3();
    if (index === 4) initSlide4();
    if (index === 5) initGameIntro();
    if (index === 6) initGameChoice1(); // Gift 1 reveal
    if (index === 8) initGameChoice2(); // Gift 2 reveal
    if (index === 10) initGameChoice3(); // Gift 3 reveal
    if (index === 11) initSummary(); // Summary slide
}

function nextSlide() {
    goToSlide(currentSlideIndex + 1);
}

// Touch gestures
function setupTouchGestures() {
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    // Only allow swipe on certain slides
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && canSwipeNext()) {
            // Swipe left (next)
            nextSlide();
        }
    }
}

function canSwipeNext() {
    // Disable swipe on slides with buttons or interactive elements
    const noSwipeSlides = [0, 2, 5, 6, 7, 8, 9, 10];
    return !noSwipeSlides.includes(currentSlideIndex);
}

// SLIDE 1: Welcome with Confetti
function initSlide1() {
    // Trigger confetti on load
    setTimeout(() => {
        launchConfetti();
    }, 500);

    // Continue button
    const continueBtn = document.querySelector('#slide1 .tap-continue');
    continueBtn.addEventListener('click', () => {
        nextSlide();
    });
}

function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4facfe', '#a8edea'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// SLIDE 2: Memory Montage
function initSlide2() {
    const montageContainer = document.getElementById('montageContainer');
    const music = document.getElementById('carouselMusic');

    // Start playing music
    music.play().catch(e => {
        console.log('Music autoplay prevented:', e);
    });

    // Fast montage
    let montageIndex = 0;
    const montageInterval = setInterval(() => {
        if (montageIndex < imageList.length) {
            const img = document.createElement('img');
            img.src = `./images/${imageList[montageIndex]}`;
            img.className = 'montage-image';
            montageContainer.innerHTML = '';
            montageContainer.appendChild(img);
            montageIndex++;
        } else {
            clearInterval(montageInterval);
            // Move to collage slide
            setTimeout(() => {
                nextSlide();
            }, 300);
        }
    }, 100);
}

// SLIDE 2.5: Memory Collage
function initSlide2_5() {
    const collageGrid = document.getElementById('collageGrid');

    // Create collage with all images
    imageList.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `./images/${img}`;
        collageGrid.appendChild(imgElement);
    });

    // Auto-advance after 3 seconds
    setTimeout(() => {
        nextSlide();
    }, 3000);
}

let currentCarouselIndex = 0;

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Build carousel items
    imageList.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        const image = document.createElement('img');
        image.src = `./images/${img}`;
        item.appendChild(image);
        track.appendChild(item);
    });

    // Auto-advance carousel
    const autoAdvance = setInterval(() => {
        if (currentCarouselIndex < imageList.length - 1) {
            currentCarouselIndex++;
            updateCarousel();
        } else {
            clearInterval(autoAdvance);
            // Show final image, then fade out and go to next slide
            setTimeout(() => {
                // Fade out music
                const music = document.getElementById('carouselMusic');
                const fadeOutInterval = setInterval(() => {
                    if (music.volume > 0.1) {
                        music.volume -= 0.1;
                    } else {
                        music.pause();
                        music.volume = 1.0;
                        clearInterval(fadeOutInterval);
                    }
                }, 100);

                document.getElementById('carouselContainer').style.opacity = '0';
                setTimeout(() => {
                    nextSlide();
                }, 600);
            }, 2000);
        }
    }, 1500);

    // Manual controls
    prevBtn.addEventListener('click', () => {
        clearInterval(autoAdvance);
        if (currentCarouselIndex > 0) {
            currentCarouselIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(autoAdvance);
        if (currentCarouselIndex < imageList.length - 1) {
            currentCarouselIndex++;
            updateCarousel();
        }
    });
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
}

// SLIDE 3: Looking Forward
function initSlide3() {
    // Any initialization if needed
}

document.querySelector('#slide3 .tap-continue').addEventListener('click', () => {
    nextSlide();
});

// SLIDE 4: Video
function initSlide4() {
    const video = document.getElementById('birthdayVideo');

    // Autoplay video
    video.play().catch(e => {
        console.log('Autoplay prevented:', e);
        // Add a play button overlay if autoplay fails
        video.controls = true;
    });

    // Auto-advance when video ends
    video.addEventListener('ended', () => {
        nextSlide();
    });
}

// GAME INTRO
function initGameIntro() {
    drawPixelBear();

    const doors = document.querySelectorAll('#gameIntro .door');
    doors.forEach(door => {
        door.addEventListener('click', (e) => {
            animateBearWalk(e.target, () => {
                nextSlide();
            });
        });
    });
}

function drawPixelBear() {
    const canvas = document.getElementById('bearCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pixel size
    const pixelSize = 10;

    // Draw pixelated white bear
    ctx.fillStyle = '#ffffff';

    // Bear head (larger circle approximation with pixels)
    const headPixels = [
        [8,3],[9,3],[10,3],[11,3],
        [7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
        [6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],
        [6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],
        [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],
        [7,8],[8,8],[9,8],[10,8],[11,8],[12,8],
        [8,9],[9,9],[10,9],[11,9]
    ];

    headPixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    // Ears
    const earPixels = [
        [6,2],[7,2],[12,2],[13,2],
        [5,3],[6,3],[13,3],[14,3]
    ];

    earPixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    // Eyes (big black eyes)
    ctx.fillStyle = '#000000';
    const eyePixels = [
        [8,5],[9,5],[11,5],[12,5],
        [8,6],[9,6],[11,6],[12,6]
    ];

    eyePixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    // Nose
    ctx.fillRect(10 * pixelSize, 7 * pixelSize, pixelSize, pixelSize);

    // Body
    ctx.fillStyle = '#ffffff';
    const bodyPixels = [
        [8,10],[9,10],[10,10],[11,10],
        [7,11],[8,11],[9,11],[10,11],[11,11],[12,11],
        [7,12],[8,12],[9,12],[10,12],[11,12],[12,12],
        [7,13],[8,13],[9,13],[10,13],[11,13],[12,13],
        [8,14],[9,14],[10,14],[11,14]
    ];

    bodyPixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    // Arms
    const armPixels = [
        [6,11],[6,12],[13,11],[13,12]
    ];

    armPixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    // Legs
    const legPixels = [
        [8,15],[9,15],[10,15],[11,15],
        [7,16],[8,16],[11,16],[12,16]
    ];

    legPixels.forEach(([x, y]) => {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });
}

function animateBearWalk(doorElement, callback) {
    const canvas = document.getElementById('bearCanvas');
    canvas.classList.add('bear-walking');

    setTimeout(() => {
        canvas.style.opacity = '0';
        setTimeout(callback, 300);
    }, 1000);
}

// GAME CHOICE 1: Destination Result
function initGameChoice1() {
    // Auto-advance after 3 seconds
    setTimeout(() => {
        nextSlide();
    }, 3000);
}

// GAME WEAPON CHOICE
const weaponDoors = document.querySelectorAll('#gameWeapon .door');
weaponDoors.forEach(door => {
    door.addEventListener('click', () => {
        nextSlide();
    });
});

// GAME CHOICE 2: Weapon Result
function initGameChoice2() {
    // Auto-advance after 3 seconds
    setTimeout(() => {
        nextSlide();
    }, 3000);
}

// GAME MISSION CHOICE
const missionDoors = document.querySelectorAll('#gameMission .door');
missionDoors.forEach(door => {
    door.addEventListener('click', () => {
        nextSlide();
    });
});

// GAME CHOICE 3: Mission Result
function initGameChoice3() {
    // Auto-advance after 3 seconds
    setTimeout(() => {
        nextSlide();
    }, 3000);
}

// GAME SUMMARY: Final slide with confetti
function initSummary() {
    // Trigger confetti celebration
    setTimeout(() => {
        launchConfetti();
    }, 300);

    // Play summary video
    const summaryVideo = document.getElementById('summaryVideo');
    if (summaryVideo) {
        summaryVideo.play().catch(e => {
            console.log('Video autoplay prevented:', e);
        });
    }

    // Initialize card flip animations
    initCardFlips();
}

// Card flip functionality
function initCardFlips() {
    const cards = document.querySelectorAll('.gift-card-container');

    // Automatic double-flip for each card on load
    cards.forEach((card, index) => {
        // Stagger the automatic flips
        const delay = 1500 + (index * 1000);

        // First flip (show back)
        setTimeout(() => {
            card.classList.add('flipped');
        }, delay);

        // Second flip (show front again)
        setTimeout(() => {
            card.classList.remove('flipped');
        }, delay + 1200);
    });

    // Add click handlers for manual flipping
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}
