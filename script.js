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

const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const totalSlides = track.children.length;
let currentIndex = 0;

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
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
