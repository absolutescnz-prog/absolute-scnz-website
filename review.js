// ============== REVIEWS INFINITE SLIDER ==============

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("reviewsTrack");
    const wrapper = document.getElementById("reviewsSection");

    if (!slider || !wrapper) return;

    let position = 0;
    let loopWidth = 0;
    let lastTime = 0;
    let isPaused = false;

    const speed = 45; // Pixels per second
    const direction = "left";

    // Clone original review cards
    const originalCards = Array.from(slider.children);

    originalCards.forEach(card => {
        slider.appendChild(card.cloneNode(true));
    });

    // Calculate original cards width
    function calculateWidth() {

        if (originalCards.length === 0) return;

        const firstCard = slider.children[0];
        const firstClone = slider.children[originalCards.length];

        loopWidth = firstClone.offsetLeft - firstCard.offsetLeft;

        position = position % loopWidth;

        slider.style.transform =
            `translate3d(-${position}px, 0, 0)`;
    }

    // Animation
    function animateSlider(timestamp) {

        if (!lastTime) lastTime = timestamp;

        const deltaTime = Math.min(
            (timestamp - lastTime) / 1000, 0.05
        );

        lastTime = timestamp;

        if (!isPaused && loopWidth > 0) {

            if (direction === "left") {

                position += speed * deltaTime;

                if (position >= loopWidth) {
                    position -= loopWidth;
                }

            } else {

                position -= speed * deltaTime;

                if (position <= 0) {
                    position += loopWidth;
                }

            }

            slider.style.transform =
                `translate3d(-${position}px, 0, 0)`;
        }

        requestAnimationFrame(animateSlider);
    }

    // Wait for images to load
    const images = slider.querySelectorAll("img");

    Promise.all(
        Array.from(images).map(img => {

            if (img.complete) return Promise.resolve();

            return new Promise(resolve => {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
            });

        })
    ).then(() => {

        calculateWidth();

        requestAnimationFrame(animateSlider);

    });

    // Pause when mouse enters review section
    wrapper.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    // Resume when mouse leaves
    wrapper.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // Pause on touch
    wrapper.addEventListener("touchstart", () => {
        isPaused = true;
    }, { passive: true });

    wrapper.addEventListener("touchend", () => {
        isPaused = false;
    }, { passive: true });

    // Recalculate on resize
    window.addEventListener("resize", calculateWidth);

});

// ============== END REVIEWS SLIDER ==============




document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("reviewsTrack2");
    const wrapper = document.getElementById("reviewsSection2");

    if (!slider || !wrapper) return;

    let position = 0;
    let loopWidth = 0;
    let lastTime = 0;
    let isPaused = false;

    const speed = 45;

    const originalCards = Array.from(slider.children);

    // Duplicate original cards for infinite scrolling
    originalCards.forEach(card => {
        slider.appendChild(card.cloneNode(true));
    });

    function calculateWidth() {
        const firstCard = slider.children[0];
        const firstClone = slider.children[originalCards.length];

        if (!firstCard || !firstClone) return;

        loopWidth = firstClone.offsetLeft - firstCard.offsetLeft;

        if (loopWidth > 0) {
            position = loopWidth;
        }
    }

    function animateSlider(timestamp) {

        if (!lastTime) lastTime = timestamp;

        const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.05);
        lastTime = timestamp;

        if (!isPaused && loopWidth > 0) {

            position -= speed * deltaTime;

            if (position <= 0) {
                position += loopWidth;
            }

            slider.style.transform =
                `translate3d(-${position}px, 0, 0)`;
        }

        requestAnimationFrame(animateSlider);
    }

    const images = slider.querySelectorAll("img");

    Promise.all(Array.from(images).map(img => {

        if (img.complete) return Promise.resolve();

        return new Promise(resolve => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
        });

    })).then(() => {

        calculateWidth();

        slider.style.transform =
            `translate3d(-${position}px, 0, 0)`;

        requestAnimationFrame(animateSlider);

    });

    // Pause on hover
    wrapper.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    wrapper.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    window.addEventListener("resize", calculateWidth);

});