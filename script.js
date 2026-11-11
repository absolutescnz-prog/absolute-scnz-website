document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll("#slider .slide");

    let currentIndex = 0;

    function showNextSlide() {

        // Current image hide
        slides[currentIndex].classList.remove("opacity-100");
        slides[currentIndex].classList.add("opacity-0");

        // Next image select
        currentIndex = (currentIndex + 1) % slides.length;

        // Next image show
        slides[currentIndex].classList.remove("opacity-0");
        slides[currentIndex].classList.add("opacity-100");

    }

    // Automatically change image every 6 seconds
    setInterval(showNextSlide, 6000);

});





document.addEventListener('DOMContentLoaded', () => {

    const track = document.getElementById('centerTrack');

    if (!track) {
        console.error('centerTrack nahi mila!');
        return;
    }

    // Only first 3 images
    const slides = Array.from(track.children).slice(0, 3);

    const total = slides.length;
    const delay = 3000;
    const duration = 700;

    if (total !== 3) {
        console.error('Exactly 3 slides required!');
        return;
    }

    let index = 0;
    let timer = null;

    // Keep only 3 original slides
    track.replaceChildren(...slides);

    // Clone first image for smooth infinite loop
    track.appendChild(slides[0].cloneNode(true));

    function nextSlide() {

        index++;

        const slideWidth = slides[0].getBoundingClientRect().width;

        track.style.transition =
            `transform ${duration}ms ease-in-out`;

        track.style.transform =
            `translate3d(-${index * slideWidth}px, 0, 0)`;
    }

    // Reset after third image
    track.addEventListener('transitionend', (event) => {

        if (event.propertyName !== 'transform') return;

        if (index === total) {

            track.style.transition = 'none';

            index = 0;

            track.style.transform = 'translate3d(0, 0, 0)';

        }

    });

    function startSlider() {

        stopSlider();

        timer = setInterval(nextSlide, delay);

    }

    function stopSlider() {

        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }

    }

    // Recalculate on resize
    window.addEventListener('resize', () => {

        stopSlider();

        track.style.transition = 'none';

        index = 0;

        track.style.transform = 'translate3d(0, 0, 0)';

        startSlider();

    });

    // Start automatic slider
    startSlider();

    console.log('3 Image Infinite Slider Started!');

});



    // Animation
    function animateSlider(timestamp) {

        if (!lastTime) lastTime = timestamp;

        const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.05);

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
        Array.from(images).map((img) => {

            if (img.complete) return Promise.resolve();

            return new Promise((resolve) => {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
            });

        })
    ).then(() => {

        calculateWidth();

        requestAnimationFrame(animateSlider);

    });

    // Pause on hover
    slider.parentElement.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    slider.parentElement.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // Responsive width calculation
    window.addEventListener("resize", calculateWidth);

});






document.addEventListener('DOMContentLoaded', () => {
  const menuBtn  = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  const setOpen = (open) => {
    navLinks.classList.toggle('active', open);
    menuBtn.textContent = open ? '✕' : '☰';
    menuBtn.setAttribute('aria-expanded', String(open));
  };

  // Button dabane par menu khule/band ho
  menuBtn.addEventListener('click', () => {
    setOpen(!navLinks.classList.contains('active'));
  });

  // Kisi link par click karo toh menu band ho jaye
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Menu ke bahar click karo toh band ho jaye
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
  });

  // Screen bade size par jaye toh menu reset ho jaye
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setOpen(false);
  });
});
