// Ensure the hamburger menu logic runs first on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  let startX = 0;

  if (hamburger && navLinks) {
    hamburger.textContent = "☰"; // Initial icon

    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function () {
      const isActive = navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open", isActive);
      hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
      hamburger.textContent = isActive ? "✖" : "☰";
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll("#navLinks a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
      });
    });

    // Touch start (record position)
    navLinks.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    // Touch end (check swipe)
    navLinks.addEventListener("touchend", function (e) {
      let endX = e.changedTouches[0].clientX;
      let diffX = startX - endX;

      // If swiped left more than 50px → close menu
      if (diffX > 50) {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
      }
    });
  }
});

/* ===== Rolling logos ===== */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".Slide");
  const sliderContainer = document.querySelector(".Logo");

  if (!slider || !sliderContainer) return;

  let scrollSpeed = 2; //higher value faster scrolling
  let scrollAmount = 0;

  function duplicateImages() {
    const originalImages = slider.children.length;
    while (slider.scrollWidth < sliderContainer.clientWidth * 2) {
      for (let i = 0; i < originalImages; i++) {
        let clone = slider.children[i].cloneNode(true);
        slider.appendChild(clone);
      }
    }
  }

  function slideImages() {
    scrollAmount -= scrollSpeed;
    if (Math.abs(scrollAmount) >= slider.scrollWidth / 2) {
      scrollAmount = 0; // Reset position when halfway through
    }
    slider.style.transform = `translateX(${scrollAmount}px)`;
    requestAnimationFrame(slideImages);
  }

  duplicateImages();
  slideImages();
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".Slide2");
  const sliderContainer = document.querySelector(".Left");
  if (!slider || !sliderContainer) return;

  function duplicateImages() {
    const originalImages = Array.from(slider.children);
    while (slider.scrollWidth < sliderContainer.clientWidth * 2) {
      originalImages.forEach((img) => {
        let clone = img.cloneNode(true);
        slider.appendChild(clone);
      });
    }
  }
  function startScrolling() {
    slider.style.animation = `scrollRight 10s linear infinite`;
    slider.style.animationPlayState = "running"; // resume animation
  }
  duplicateImages();
  startScrolling();
});

/* Resume animation for Slides on load */
document.addEventListener("DOMContentLoaded", function () {
  let animatedElements = document.querySelectorAll(".Slide, .Slide2, .Slide3");
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "running";
  });
});

/* ===== Project expand/collapse ===== */
document.addEventListener("DOMContentLoaded", function () {
  let projects = document.querySelectorAll(".project-container");
  projects.forEach((project) => {
    project.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});

/* ===== Genie show on scroll ===== */
document.addEventListener("DOMContentLoaded", function () {
  let genieElements = document.querySelectorAll(".genie-box");
  function showOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(showOnScroll, { threshold: 0.3 });
  genieElements.forEach((el) => observer.observe(el));
  setTimeout(() => {
    genieElements.forEach((el) => el.classList.add("show"));
  }, 500);
});

/* ===== Communication reveal ===== */
document.addEventListener("DOMContentLoaded", function () {
  let communicationSection = document.querySelector(".communication-envelope");
  if (!communicationSection) return;

  function revealOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 });
  observer.observe(communicationSection);
});

/* ===== Fade-in left elements ===== */
document.addEventListener("DOMContentLoaded", function () {
  let elements = document.querySelectorAll(".fade-in-left");
  function revealOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 });
  elements.forEach((element) => observer.observe(element));
});

/* ===== Skills reveal ===== */
document.addEventListener("DOMContentLoaded", function () {
  let skillsSection = document.querySelector(".skills-envelope");
  if (!skillsSection) return;

  function revealOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 });
  observer.observe(skillsSection);
});

/* ===== Education reveal after genie ===== */
document.addEventListener("DOMContentLoaded", function () {
  const genieBox = document.querySelector(".genie-box");
  const educationSection = document.querySelector(".education-container");
  if (!genieBox || !educationSection) return;

  function revealEducation() {
    const rect = educationSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      educationSection.classList.add("show");
      window.removeEventListener("scroll", revealEducation);
    }
  }

  setTimeout(() => {
    genieBox.classList.add("show");
    setTimeout(() => {
      window.addEventListener("scroll", revealEducation);
      revealEducation();
    }, 0);
  }, 1000);
});

/* ===== Certificates: manual drag / swipe (NO auto scroll) ===== */
document.addEventListener("DOMContentLoaded", function () {
  const certWrap = document.querySelector(".Certifications");
  if (!certWrap) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Mouse
  certWrap.addEventListener("mousedown", (e) => {
    isDown = true;
    certWrap.classList.add("dragging");
    startX = e.pageX - certWrap.offsetLeft;
    scrollLeft = certWrap.scrollLeft;
  });
  certWrap.addEventListener("mouseleave", () => {
    isDown = false;
    certWrap.classList.remove("dragging");
  });
  certWrap.addEventListener("mouseup", () => {
    isDown = false;
    certWrap.classList.remove("dragging");
  });
  certWrap.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - certWrap.offsetLeft;
    const walk = (x - startX) * 1.8;
    certWrap.scrollLeft = scrollLeft - walk;
  });

  // Touch
  certWrap.addEventListener(
    "touchstart",
    (e) => {
      isDown = true;
      startX = e.touches[0].pageX - certWrap.offsetLeft;
      scrollLeft = certWrap.scrollLeft;
    },
    { passive: true }
  );

  certWrap.addEventListener(
    "touchend",
    () => {
      isDown = false;
    },
    { passive: true }
  );

  certWrap.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - certWrap.offsetLeft;
      const walk = (x - startX) * 1.6;
      certWrap.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );
});

/* ===== Theme Toggle ===== */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }
});

/* ===== Snow Effect (dark mode only) ===== */
function initSnowEffect() {
  const canvas = document.getElementById("snow-canvas");
  if (!canvas || !document.body.classList.contains("dark-theme")) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const snowflakes = [];

  function createSnowflakes() {
    for (let i = 0; i < 30; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedY: Math.random() * 1 + 0.5,
        opacity: Math.random(),
      });
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    snowflakes.forEach((flake) => {
      ctx.globalAlpha = flake.opacity;
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function moveSnowflakes() {
    snowflakes.forEach((flake) => {
      flake.y += flake.speedY;
      if (flake.y > height) {
        flake.y = 0;
        flake.x = Math.random() * width;
      }
    });
  }

  function updateSnowfall() {
    drawSnowflakes();
    moveSnowflakes();
    requestAnimationFrame(updateSnowfall);
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  createSnowflakes();
  updateSnowfall();
}
window.addEventListener("load", initSnowEffect);

/* ===== Contact Form (safe attach) ===== */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.style.color = "green";
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        formMessage.textContent =
          data && data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Oops! There was a problem.";
        formMessage.style.color = "red";
      }
    } catch (error) {
      formMessage.textContent =
        "Error sending message. Please try again later.";
      formMessage.style.color = "red";
    }
  });
});










document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    "#home2, .About, #education2, #skills, #projects, #certifications2, #communication, #resume, #contact"
  );
  const navLinks = document.querySelectorAll(".nav-links li a");

  function updateActiveLink() {
    let current = "";
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = "#" + sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
});














document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    "#home2, .About, #education2, #skills, #projects, #certifications2, #communication, #resume, #contact"
  );
  const navLinks = document.querySelectorAll(".nav-links li a");
  const highlight = document.getElementById("navHighlight");

  function updateHighlight() {
    let current = "";
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = "#" + sec.id;
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute("href") === current) {
        const rect = link.getBoundingClientRect();
        const navRect = link.closest(".nav-right").getBoundingClientRect();

        // Slide glass capsule smoothly
        highlight.style.width = rect.width + "px";
        highlight.style.height = rect.height + "px";
        highlight.style.left = (rect.left - navRect.left) + "px";
        highlight.style.top = (rect.top - navRect.top) + "px";
      }
    });
  }

  window.addEventListener("scroll", updateHighlight);
  window.addEventListener("resize", updateHighlight);
  updateHighlight();
});














document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".npl, .npl2, .npl3,.edu-title");

  headings.forEach(heading => {
    const line = heading.nextElementSibling; // the <hr> after heading
    if (line && line.classList.contains("heading-line")) {
      // set the line width equal to heading width
      line.style.width = heading.offsetWidth + "px";
    }
  });
});











// ------------------ Bubble Background (Light Theme) ------------------
const bubbleCanvas = document.getElementById("bubble-canvas");
if (bubbleCanvas) {
  const bubbleCtx = bubbleCanvas.getContext("2d");

  let bubbles = [];
  const maxBubbles = 40; // number of bubbles
  const colors = ["rgba(255,255,255,0.4)", "rgba(200,220,255,0.3)", "rgba(255,255,255,0.2)"];

  function resizeBubbleCanvas() {
    bubbleCanvas.width = window.innerWidth;
    bubbleCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeBubbleCanvas);
  resizeBubbleCanvas();

  function createBubble() {
    return {
      x: Math.random() * bubbleCanvas.width,
      y: bubbleCanvas.height + Math.random() * 100,
      radius: 3 + Math.random() * 10,
      speed: 1 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.5
    };
  }

  function updateBubbles() {
    bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
    if (bubbles.length < maxBubbles) {
      bubbles.push(createBubble());
    }

    bubbles.forEach((bubble, index) => {
      bubble.y -= bubble.speed;
      bubble.x += bubble.drift;

      bubbleCtx.beginPath();
      bubbleCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      bubbleCtx.fillStyle = bubble.color;
      bubbleCtx.fill();

      if (bubble.y + bubble.radius < 0) {
        bubbles[index] = createBubble();
      }
    });

    requestAnimationFrame(updateBubbles);
  }

  updateBubbles();
}
