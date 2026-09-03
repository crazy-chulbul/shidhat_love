// =========================
// ALWAYS START FROM TOP
// =========================

window.history.scrollRestoration = "manual";

window.scrollTo(0, 0);
// =========================
// LOADING SCREEN
// =========================

const loadingScreen = document.getElementById("loading-screen");


// =========================
// START BUTTON
// =========================

const startButton =
    document.getElementById("start-btn");

startButton.addEventListener("click", () => {

    const countdownSection =
        document.querySelector(".countdown-section");

    // Create hearts
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            createWishHeart();

        }, i * 60);

    }

    // Scroll to countdown
    countdownSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// =========================
// COUNTDOWN
// =========================

function getNextBirthday() {

    const now = new Date();

    let year = now.getFullYear();

    let birthday = new Date(
        year,
        0,
        8,
        0,
        0,
        0
    );

    // If birthday has passed,
    // use next year.
    if (birthday <= now) {

        birthday = new Date(
            year + 1,
            0,
            8,
            0,
            0,
            0
        );

    }

    return birthday;
}


let birthdayDate =
    getNextBirthday();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now = new Date();

    let difference =
        birthdayDate.getTime() -
        now.getTime();


    // Birthday reached
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        // Calculate next birthday
        birthdayDate =
            getNextBirthday();

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// Start countdown
updateCountdown();


// Update every second
setInterval(
    updateCountdown,
    1000
);


// =========================
// BIRTHDAY WISH
// =========================

// =========================
// BIRTHDAY WISH BUTTON
// =========================

const wishButton =
    document.getElementById("wish-btn");

wishButton.addEventListener("click", () => {

    // Change button text
    wishButton.textContent =
        "Wish Made! ✨❤️";

    // Celebration animation
    wishButton.classList.add(
        "wish-complete"
    );

    // Disable button
    wishButton.disabled = true;


    // Create wish hearts
    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createWishHeart();

        }, i * 100);

    }


    // Wait so user can actually see
    // "Wish Made! ✨❤️"
    setTimeout(() => {

        const gallerySection =
            document.querySelector(
                ".gallery-section"
            );

        gallerySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 1500);

});

// =========================
// CREATE WISH HEART
// =========================

function createWishHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "wish-heart"
    );

    heart.textContent = "❤️";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        Math.random() * 25 + 20 + "px";


    document.body.appendChild(
        heart
    );


    const distance =
        window.innerHeight + 100;


    const duration =
        3000 +
        Math.random() * 2000;


    const animation =
        heart.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(-${distance}px) rotate(360deg)`,

                    opacity: 0
                }
            ],

            {
                duration: duration,

                easing: "ease-out"
            }

        );


    animation.onfinish = () => {

        heart.remove();

    };

}


// =========================
// CREATE CONFETTI
// =========================

function createConfetti() {

    const confetti =
        document.createElement("span");

    confetti.textContent = "✨";


    confetti.style.position =
        "fixed";

    confetti.style.left =
        Math.random() * 100 + "vw";

    confetti.style.top =
        "-30px";

    confetti.style.fontSize =
        Math.random() * 15 + 15 + "px";

    confetti.style.zIndex =
        "15000";

    confetti.style.pointerEvents =
        "none";


    document.body.appendChild(
        confetti
    );


    const duration =
        2000 +
        Math.random() * 2000;


    const animation =
        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(${window.innerHeight + 100}px) rotate(720deg)`,

                    opacity: 0
                }
            ],

            {
                duration: duration,

                easing: "linear"
            }

        );


    animation.onfinish = () => {

        confetti.remove();

    };

}


// =========================
// =========================
// PHOTO LIGHTBOX
// =========================

const photos = document.querySelectorAll(
    ".timeline-content img"
);

const imageModal =
    document.getElementById("image-modal");

const modalImage =
    document.getElementById("modal-image");

const closeModal =
    document.getElementById("close-modal");

const prevImage =
    document.getElementById("prev-image");

const nextImage =
    document.getElementById("next-image");


// CURRENT PHOTO INDEX

let currentImageIndex = 0;


// OPEN PHOTO

photos.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        currentImageIndex = index;

        showImage();

        imageModal.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});


// SHOW IMAGE
function showImage() {

    const currentPhoto =
        photos[currentImageIndex];


    // IMAGE

    modalImage.src =
        currentPhoto.src;

    modalImage.alt =
        currentPhoto.alt;


    // TIMELINE CONTENT

    const timelineContent =
        currentPhoto.closest(".timeline-content");


    if (timelineContent) {

        const movement =
            timelineContent.querySelector("span");

        const title =
            timelineContent.querySelector("h3");

        const description =
            timelineContent.querySelector("p");


        // MODAL TEXT UPDATE

        document.getElementById(
            "modal-memory-number"
        ).textContent =
            movement ?
                movement.textContent.trim() :
                "";


        document.getElementById(
            "modal-memory-title"
        ).textContent =
            title ?
                title.textContent.trim() :
                "";


        document.getElementById(
            "modal-memory-description"
        ).textContent =
            description ?
                description.textContent.trim() :
                "";

    }

}


// NEXT IMAGE

nextImage.addEventListener("click", () => {

    currentImageIndex++;

    // LAST IMAGE KE BAAD FIRST IMAGE
    if (currentImageIndex >= photos.length) {

        currentImageIndex = 0;

    }

    showImage();

});


// PREVIOUS IMAGE

prevImage.addEventListener("click", () => {

    currentImageIndex--;

    // FIRST IMAGE SE PEHLE LAST IMAGE
    if (currentImageIndex < 0) {

        currentImageIndex =
            photos.length - 1;

    }

    showImage();

});

// =========================
// CLOSE IMAGE MODAL
// =========================

function closeImageModal() {

    imageModal.style.display =
        "none";

    modalImage.src = "";

    document.body.style.overflow =
        "";
}


closeModal.addEventListener(
    "click",
    closeImageModal
);


// Click outside image
imageModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === imageModal
        ) {

            closeImageModal();

        }

    }
);


// =========================
// ESC KEY
// =========================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            imageModal.style.display === "flex"
        ) {

            closeImageModal();

        }

    }
);


// =========================
// VIDEO CONTROL
// =========================

const videos =
    document.querySelectorAll(
        ".video-container video"
    );


videos.forEach((video) => {

    video.addEventListener(
        "play",
        () => {

            videos.forEach(
                (otherVideo) => {

                    if (
                        otherVideo !== video
                    ) {

                        otherVideo.pause();

                    }

                }
            );

        }
    );

});


// =========================
// SURPRISE BUTTON
// =========================

const surpriseButton =
    document.getElementById(
        "surprise-btn"
    );


const surpriseMessage =
    document.getElementById(
        "surprise-message"
    );


surpriseButton.addEventListener(
    "click",
    () => {

        surpriseMessage.style.display =
            "block";

        surpriseButton.style.display =
            "none";


        // Hearts
        for (let i = 0; i < 20; i++) {

            setTimeout(() => {

                createWishHeart();

            }, i * 100);

        }


        // Fireworks
        for (let i = 0; i < 5; i++) {

            setTimeout(() => {

                createFirework();

            }, i * 350);

        }

    }
);


// =========================
// SCROLL REVEAL
// =========================

const sections = document.querySelectorAll(`
    .countdown-section, 
    .celebration, 
    .gallery-section, 
    .video-section, 
    .message-section, 
    .surprise-section, 
    .timeline-section, 
    .story-section,
    .blue-dress-section
`);

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.2
        }

    );


sections.forEach(
    (section) => {

        observer.observe(
            section
        );

    }
);


// =========================
// TIMELINE REVEAL
// =========================

const timelineItems =
    document.querySelectorAll(
        ".timeline-item"
    );


const timelineObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        timelineObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.25
        }

    );


timelineItems.forEach(
    (item) => {

        timelineObserver.observe(
            item
        );

    }
);


// =========================
// BACKGROUND FLOATING HEARTS
// =========================

const heartsContainer =
    document.getElementById(
        "hearts-container"
    );


function createFloatingHeart() {

    const heart =
        document.createElement(
            "span"
        );


    heart.classList.add(
        "background-heart"
    );


    heart.textContent =
        "❤️";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";


    const duration =
        Math.random() * 5 + 5;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, duration * 1000 + 500);

}


// Create background hearts
setInterval(
    createFloatingHeart,
    700
);


// =========================
// INTERACTIVE CAKE
// =========================
// =========================
// =========================
// INTERACTIVE CAKE
// =========================

const birthdayCake =
    document.getElementById("birthday-cake");

const cakeMessage =
    document.getElementById("cake-message");

const cutCakeButton =
    document.getElementById("wish-btn");

cutCakeButton.addEventListener("click", () => {

    // Prevent multiple clicks
    cutCakeButton.disabled = true;

    // Cake cutting animation
    birthdayCake.classList.add("cutting");

    // Change message
    cakeMessage.classList.add("fade");

    setTimeout(() => {

        cakeMessage.textContent =
            "Cake cut! 🎂✨ Let's celebrate! ❤️";

        cakeMessage.classList.remove("fade");

    }, 500);

    // Hearts
    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createWishHeart();

        }, i * 70);

    }

    // Confetti
    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createConfetti();

        }, i * 50);

    }

    // Fireworks
    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            createFirework();

        }, i * 300);

    }

    // Change button
    setTimeout(() => {

        cutCakeButton.textContent =
            "Cake Cut! 🎂❤️";

    }, 8000);

});
// =========================
// BIRTHDAY MUSIC - 2 SONGS
// =========================

const music =
    document.getElementById("birthday-music");

const secondMusic =
    document.getElementById("second-music");

const musicButton =
    document.getElementById("music-btn");


// कौन सा song अभी चल रहा है
let currentMusic = music;


// MUSIC BUTTON

musicButton.addEventListener("click", async () => {

    try {

        if (currentMusic.paused) {

            await currentMusic.play();

            musicButton.textContent =
                "🔊 Music OFF";

        } else {

            currentMusic.pause();

            musicButton.textContent =
                "🎵 Music ON";

        }

    } catch (error) {

        console.log("Music error:", error);

    }

});


// =========================
// SONG 1 FINISH → SONG 2
// =========================

music.addEventListener("ended", () => {

    currentMusic = secondMusic;

    secondMusic.play();

});


// =========================
// SONG 2 FINISH → SONG 1
// =========================

secondMusic.addEventListener("ended", () => {

    currentMusic = music;

    music.currentTime = 0;

    music.play();

});

// =========================
// VIDEO + MUSIC CONTROL
// =========================

const allVideos = document.querySelectorAll("video");

allVideos.forEach((video) => {

    video.addEventListener("play", () => {

        // Background music pause
        if (!currentMusic.paused) {
            currentMusic.pause();
        }


        // Other videos pause
        allVideos.forEach((otherVideo) => {

            if (otherVideo !== video) {
                otherVideo.pause();
            }

        });

    });


    video.addEventListener("pause", () => {

        // Check: koi aur video chal raha hai ya nahi
        const anotherVideoPlaying =
            Array.from(allVideos).some(
                (otherVideo) =>
                    otherVideo !== video &&
                    !otherVideo.paused
            );


        // Agar koi video nahi chal raha to music resume
        if (!anotherVideoPlaying) {

            currentMusic.play()
                .catch(() => { });

        }

    });


    video.addEventListener("ended", () => {

        currentMusic.play()
            .catch(() => { });

    });

});
// =========================
// LOADING SCREEN + AUTO MUSIC
// =========================



loadingScreen.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    // Music play
    music.play()

        .then(() => {
            musicButton.style.display = "block";
            musicButton.textContent = "🔊 Music OFF";

        })
        .catch(error => {

            console.log("Music error:", error);

        });


    // Loading screen hide
    loadingScreen.style.opacity = "0";


    setTimeout(() => {

        loadingScreen.style.display = "none";

    }, 500);

}, { once: true });
// 

// =========================
// FIREWORKS
// =========================

function createFirework() {

    const centerX =
        Math.random() *
        window.innerWidth;


    const centerY =
        Math.random() *
        (window.innerHeight * 0.6);


    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement(
                "span"
            );


        particle.textContent =
            "✦";


        particle.style.position =
            "fixed";


        particle.style.left =
            centerX + "px";


        particle.style.top =
            centerY + "px";


        particle.style.fontSize =
            Math.random() * 12 + 10 + "px";


        particle.style.color =
            [
                "#ff4d88",
                "#ff8fb3",
                "#ffffff",
                "#ffd166"
            ][
            Math.floor(
                Math.random() * 4
            )
            ];


        particle.style.zIndex =
            "16000";


        particle.style.pointerEvents =
            "none";


        document.body.appendChild(
            particle
        );


        const angle =
            (Math.PI * 2 * i) / 25;


        const distance =
            Math.random() * 150 + 80;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        const animation =
            particle.animate(

                [
                    {
                        transform:
                            "translate(0, 0) scale(1)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(${x}px, ${y}px) scale(0)`,

                        opacity: 0
                    }
                ],

                {
                    duration: 1200,

                    easing: "ease-out"
                }

            );


        animation.onfinish = () => {

            particle.remove();

        };

    }

}

// =========================
// SECRET LETTER
// =========================

const letterButton =
    document.getElementById("letter-btn");

const letterBox =
    document.getElementById("letter-box");

const letterText =
    document.getElementById("letter-text");


const secretMessage =
    `Birthday girl ❤️

I just wanted to write a few words for you on your special day.

Some people become special because of the big moments, while some become special because of all the little moments we remember.

I hope this birthday brings you lots of happiness, beautiful memories and countless reasons to smile. ✨

Keep smiling, keep shining and always remember that you are special. ❤️

Happy Birthday! 🎂💗`;


letterButton.addEventListener("click", () => {

    // Open letter
    letterBox.style.display = "block";

    // Hide button
    letterButton.style.display = "none";

    // Start typing
    let index = 0;

    letterText.textContent = "";

    function typeLetter() {

        if (index < secretMessage.length) {

            letterText.textContent +=
                secretMessage.charAt(index);

            index++;

            setTimeout(typeLetter, 35);

        }

    }

    typeLetter();

});
setTimeout(() => {

    for (let i = 0; i < 15; i++) {

        setTimeout(() => {
            createWishHeart();
        }, i * 100);

    }

}, secretMessage.length * 35 + 500);

// =========================
// BLUE DRESS SURPRISE
// =========================

const dressButton =
    document.getElementById("dress-btn");

const dressReveal =
    document.querySelector(".dress-reveal");

dressButton.addEventListener("click", () => {

    // Hide button
    dressButton.style.display = "none";

    // Show surprise
    dressReveal.style.display = "block";

    // Hearts
    for (let i = 0; i < 20; i++) {

        setTimeout(() => {
            createWishHeart();
        }, i * 100);

    }

    // Fireworks
    for (let i = 0; i < 3; i++) {

        setTimeout(() => {
            createFirework();
        }, i * 400);

    }

});





// =========================
// WHY YOU ARE SPECIAL
// =========================

const specialButtons =
    document.querySelectorAll(".special-btn");


specialButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".special-card");


        card.classList.toggle("active");


        if (card.classList.contains("active")) {

            button.textContent =
                "Show Less ↑";

        } else {

            button.textContent =
                "Read More ✨";

        }

    });

});


// =========================
// TIME CAPSULE
// =========================

const capsuleButton =
    document.getElementById("capsule-btn");

const timeCapsule =
    document.getElementById("time-capsule");

const capsuleMessage =
    document.getElementById("capsule-message");


capsuleButton.addEventListener("click", () => {

    // Open animation
    timeCapsule.classList.add("capsule-open");

    // Button change
    capsuleButton.textContent =
        "Opened With Love 💙";

    capsuleButton.disabled = true;

    // Show message
    setTimeout(() => {

        capsuleMessage.style.display =
            "block";

        capsuleMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 800);

    // Floating hearts
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {
            createWishHeart();
        }, i * 100);

    }

    // Sparkles
    for (let i = 0; i < 3; i++) {

        setTimeout(() => {
            createFirework();
        }, i * 400);

    }

});

// =========================
// CHOOSE A MEMORY - FLIP
// =========================
// =========================
// =========================

// =========================
// CHOOSE A MEMORY - UNLOCK
// =========================

const choiceCards =
    document.querySelectorAll(".choice-card");

let openedCards = 0;

choiceCards.forEach((card) => {

    card.addEventListener("click", () => {

        // Already opened card ko dobara count mat karo
        if (!card.classList.contains("flipped")) {

            card.classList.add("flipped");

            openedCards++;

           
    

        }

    });

});

// =========================
// MOVIE VIDEO CONTROL
// =========================

const movieVideo = document.getElementById("movie-video");
const movieButton = document.getElementById("movie-btn");
const movieFrame = document.querySelector(".movie-frame");
const movieReveal = document.getElementById("movie-reveal");


movieButton.addEventListener("click", () => {

    if (movieVideo.ended) {
        movieVideo.currentTime = 0;
    }

    if (movieVideo.paused) {

        movieVideo.play();

        movieFrame.classList.add("movie-playing");

        movieButton.textContent = "⏸ Pause The Scene";

        movieReveal.style.display = "none";

    } else {

        movieVideo.pause();

        movieButton.textContent = "▶ Play The Scene";

    }

});


movieVideo.addEventListener("ended", () => {

    movieFrame.classList.remove("movie-playing");

    movieButton.textContent = "🔄 Play Again";

    movieReveal.style.display = "block";

});
movieVideo.addEventListener("pause", () => {

    // Video end hone par Play Again ko change mat karo
    if (!movieVideo.ended) {

        movieButton.textContent =
            "▶ Play The Scene";

    }

});
// =========================
// CATCH THE HEART GAME
// =========================

const movingHeart =
    document.getElementById("moving-heart");

const heartGame =
    document.getElementById("heart-game");

const heartScore =
    document.getElementById("heart-score");

const gameRound =
    document.getElementById("game-round");

const gameStatus =
    document.getElementById("game-status");

const gameMessage =
    document.getElementById("game-message");


let score = 0;

const totalHearts = 8;


const gameMessages = [

    "Catch me if you can 😜❤️",

    "Okay... that was a little too easy 😏",

    "Hey! You're actually good at this 💗",

    "Careful... I'm getting faster now ⚡",

    "Halfway there! Don't give up 😜❤️",

    "Only 3 hearts left... 👀",

    "Almost there! Catch me quickly ❤️‍🔥",

    "Final heart... don't let it escape! 💙"
];


const heartTypes = [

    "❤️",
    "💗",
    "💖",
    "💕",
    "💘",
    "❤️‍🔥",
    "💝",
    "💙"
];


movingHeart.addEventListener(
    "click",
    () => {

        score++;

        // SCORE UPDATE
        heartScore.textContent = score;


        // ROUND UPDATE
        gameRound.textContent =
            score === totalHearts
                ? totalHearts
                : score + 1;


        // GAME COMPLETE
        if (score >= totalHearts) {

            movingHeart.style.display =
                "none";

            gameStatus.textContent =
                "🎉 Mission Completed! ❤️";

            gameMessage.style.display =
                "flex";
            // Congratulations ko automatically screen par lao

            setTimeout(() => {

                heartGame.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }, 100);
            return;
        }


        // CHANGE STATUS
        gameStatus.textContent =
            gameMessages[score];


        // CHANGE HEART
        movingHeart.textContent =
            heartTypes[score];


        // RANDOM POSITION
        const maxX =
            heartGame.clientWidth -
            movingHeart.offsetWidth;

        const maxY =
            heartGame.clientHeight -
            movingHeart.offsetHeight;


        const randomX =
            Math.random() * maxX;

        const randomY =
            Math.random() * maxY;


        movingHeart.style.left =
            randomX + "px";

        movingHeart.style.top =
            randomY + "px";

    }
);
// =========================
// HEART STORY SCROLL REVEAL
// =========================

const storyElements =
    document.querySelectorAll(
        ".story-line, .story-question, .heart-photo, .heart-final-message"
    );


const storyObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "story-visible"
                    );

                    storyObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.2
        }

    );


storyElements.forEach((element) => {

    storyObserver.observe(element);

});
// =========================
// =========================
// MEMORY VIDEO CONTROL
// =========================

const memoryVideo = document.getElementById("memory-video");
const memoryVideoBtn = document.getElementById("memory-video-btn");

memoryVideoBtn.addEventListener("click", () => {

    if (memoryVideo.ended) {
        memoryVideo.currentTime = 0;
    }

    if (memoryVideo.paused) {

        memoryVideo.play();

        memoryVideoBtn.textContent = "⏸ Pause The Memory";

    } else {

        memoryVideo.pause();

        memoryVideoBtn.textContent = "▶ Play The Memory";

    }

});

memoryVideo.addEventListener("ended", () => {

    memoryVideoBtn.textContent = "🔄 Play Again";

});
memoryVideo.addEventListener("pause", () => {

    // Video end hone par Play Again ko change mat karo
    if (!memoryVideo.ended) {

        memoryVideoBtn.textContent =
            "▶ Play The Memory";

    }

});
// =========================
// HEART LETTER
// =========================

const heartLetterBtn =
    document.getElementById("heart-letter-btn");

const heartLetterBox =
    document.getElementById("heart-letter-box");

const heartLetterText =
    document.getElementById("heart-letter-text");


const heartLetterMessage = `Kabhi-kabhi main sochta hoon... Aakhir aap mein aisa kya hai, ki aapka naam aate hi sab kuch ek pal ke liye ruk sa jaata hai. Pata nahi kab aapki baatein meri aadat ban gayi, aapki muskurahat meri khushi, aur aapki fikar mere dil ka ek hissa.

Main jaanta hoon... Zindagi filmoo jaisi nahi hoti. Yahan raaste aasaan nahi hote, waqt hamesha ek jaisa nahi rehta, aur har kahani ko uska manpasand anjaam nahi milta.

Lekin kuch log sirf zindagi mein aate nahi hain, woh zindagi ka matlab thoda aur khoobsurat bana dete hain. Aap mere liye shayad wahi ehsaas hain, jise main jitna samajhne ki koshish karta hoon, utna hi mehsoos karta hoon.

Kabhi-kabhi darr bhi lagta hai... Ki kahin waqt badal na jaaye, kahin halaat humein alag raaston par na le jaayein. Lekin agar kabhi aisa hua bhi, toh meri ek baat hamesha yaad rakhiyega—Aap meri zindagi ka woh hissa hain jise main kabhi sirf ek yaad kehkar bhool nahi sakunga. ❤️

Kyuki kuch rishte naam ke mohtaaj nahi hote... Woh bas dil mein apni jagah bana lete hain. Aur Aapne mere dil mein ek aisi jagah bana li hai, jahan shayad koi aur kabhi nahi aa sakta.

Bas meri ek dua hamesha rahegi—Chahe zindagi aapko kahin bhi le jaaye, aap hamesha khush rahen, muskurate rahen...

Aur kabhi agar aapko apni importance par shak ho, toh bas itna yaad kar lena—Kahin ek insaan tha, jiski sabse khoobsurat yaade bs aap thee ❤️`;

/* BUTTON CLICK */

heartLetterBtn.addEventListener("click", () => {

    heartLetterBox.style.display = "block";

    heartLetterBtn.style.display = "none";

    // Pehle text empty karo
   heartLetterText.innerHTML = `
    <img 
        class="heart-letter-image" 
        src="images/c3.jpeg" 
        alt="Chulbul" 
    >
`;

    let index = 0;

    // Typing effect
    const typingEffect = setInterval(() => {

        heartLetterText.innerHTML +=
    heartLetterMessage.charAt(index);

        index++;

        // Text complete
        if (index >= heartLetterMessage.length) {

            clearInterval(typingEffect);

        }

    }, 25);

});