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



document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("sliderTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!track || !prevBtn || !nextBtn) {
        console.error("Slider elements missing!");
        return;
    }

    const slides = track.querySelectorAll(".slide");
    const totalSlides = slides.length;

    let currentIndex = 0;

    // Slide movement function
    function moveSlider() {

        const slideWidth = slides[0].getBoundingClientRect().width;

        track.style.transform =
            "translate3d(-" + (currentIndex * slideWidth) + "px, 0, 0)";

    }

    // Next button click
    nextBtn.addEventListener("click", function (event) {

        event.preventDefault();

        currentIndex = (currentIndex + 1) % totalSlides;

        moveSlider();

        console.log("Current Slide:", currentIndex + 1);

    });

    // Previous button click
    prevBtn.addEventListener("click", function (event) {

        event.preventDefault();

        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;

        moveSlider();

        console.log("Current Slide:", currentIndex + 1);

    });

    // Handle browser resize
    window.addEventListener("resize", moveSlider);

    // Initial setup
    moveSlider();

    console.log("Image Slider Ready!");

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
