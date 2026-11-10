
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
  if (!track) { console.error('centerTrack nahi mila, HTML ka id check karo'); return; }

  const total    = track.children.length;   // 10
  const delay    = 3000;                    // har photo 3 second
  const duration = 700;                     // slide hone ka time (ms)
  let index = 0;
  let timer = null;

  // Smooth loop ke liye pehli slide ki copy end mein
  track.appendChild(track.firstElementChild.cloneNode(true));

  const next = () => {
    index++;
    track.style.transition = `transform ${duration}ms ease-in-out`;
    track.style.transform  = `translateX(-${index * 100}%)`;
  };

  track.addEventListener('transitionend', () => {
    if (index >= total) {
      track.style.transition = 'none';
      index = 0;
      track.style.transform  = 'translateX(0)';
    }
  });

  const start = () => { stop(); timer = setInterval(next, delay); };
  const stop  = () => { if (timer) clearInterval(timer); timer = null; };

  start();
 
});





document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("weddingSlider");

    if (!slider) return;

    // SETTINGS
    const speed = 90; 
    const direction = "left"; // left or right

    const originalImages = Array.from(slider.children);

    if (originalImages.length === 0) return;

    // Duplicate original images
    originalImages.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        slider.appendChild(clone);
    });

    let position = 0;
    let lastTime = 0;
    let loopWidth = 0;
    let isPaused = false;

    // Calculate original images width
    function calculateWidth() {

        loopWidth = 0;

        originalImages.forEach((item) => {
            loopWidth += item.getBoundingClientRect().width;
        });

        const gap = parseFloat(getComputedStyle(slider).gap) || 0;

        loopWidth += gap * originalImages.length;

        // Starting position for right movement
        if (direction === "right") {
            position = loopWidth;
        }

    }

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
