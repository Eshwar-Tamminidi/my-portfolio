// ================== On DOM Ready ==================
document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initSliders();
  initSliders2();
  initSliding();
  initProjects();
  initGenie();
  initCommunication();
  initFadeInLeft();
  initSkills();
  initEducation();
  initCertifications();
  initNavHighlight();
  initnavItems();
  initIntro();
  initIntroExp();
  initContact();
  initTheme0();
  initThemeBtn();
  initExplore();
  initNavbar();
  initExpp();
});

// ================== Hamburger Menu ==================
function initHamburgerMenu() {
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
      if (diffX < -50) {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
      }
    });
  }
}

// ================== Sliders ==================
/* ===== Rolling logos ===== */
function initSliders() {
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
}

function initSliders2() {
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
}

/* Resume animation for Slides on load */
function initSliding() {
  let animatedElements = document.querySelectorAll(".Slide, .Slide2, .Slide3");
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "running";
  });
}

/* ===== Project expand/collapse ===== */
function initProjects() {
  let projects = document.querySelectorAll(".project-container");
  projects.forEach((project) => {
    project.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
}

/* ===== Genie show on scroll ===== */
function initGenie() {
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
}

/* ===== Communication reveal ===== */
function initCommunication() {
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
}

/* ===== Fade-in left elements ===== */
function initFadeInLeft() {
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
}

/* ===== Skills reveal ===== */
function initSkills() {
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
}

/* ===== Education reveal after genie ===== */
function initEducation() {
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
}

/* ===== Certificates: manual drag / swipe (NO auto scroll) ===== */
function initCertifications() {
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
  // --- Mobile: true finger-follow scroll ---
certWrap.addEventListener('touchstart', (e) => {
  if (e.touches.length !== 1) return;
  isDown = true;
  startX = e.touches[0].pageX - certWrap.offsetLeft;
  scrollLeft = certWrap.scrollLeft;
});

certWrap.addEventListener('touchend', () => {
  isDown = false;
});

certWrap.addEventListener('touchmove', (e) => {
  if (!isDown || e.touches.length !== 1) return;
  e.preventDefault(); // ensures immediate scroll
  const x = e.touches[0].pageX - certWrap.offsetLeft;
  const walk = x - startX;
  certWrap.scrollLeft = scrollLeft - walk;
});

}

/* ===== Theme Toggle ===== */

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
function initContact() {
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
}

function initNavHighlight() {
  const sections = document.querySelectorAll(
    "#home2, #about, #education2, #skills, #projects, #certifications2, #communication, #resume, #contact"
  );

  const navLinks = document.querySelectorAll(".nav-links li a");
  const highlight = document.getElementById("navHighlight");

  function updateMobileActive() {
    let current = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 50 && rect.bottom > 50) {
        // smaller threshold for mobile
        current = "#" + sec.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  }

  function updateDesktopHighlight() {
    let current = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = "#" + sec.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === current) {
        const rect = link.getBoundingClientRect();
        const navRect = link.closest(".nav-right").getBoundingClientRect();

        highlight.style.width = rect.width + "px";
        highlight.style.height = rect.height + "px";
        highlight.style.left = rect.left - navRect.left + "px";
        highlight.style.top = rect.top - navRect.top + "px";
      }
    });
  }

  function updateIndicator() {
    if (window.innerWidth <= 768) {
      updateMobileActive();
      if (highlight) highlight.style.opacity = "0"; // hide highlight on mobile
    } else {
      updateDesktopHighlight();
      if (highlight) highlight.style.opacity = "1"; // show highlight on desktop
    }
  }

  window.addEventListener("scroll", updateIndicator);
  window.addEventListener("resize", updateIndicator);
  updateIndicator();
}

function initnavItems() {
  const headings = document.querySelectorAll(".npl, .npl2, .npl3,.edu-title");

  headings.forEach((heading) => {
    const line = heading.nextElementSibling; // the <hr> after heading
    if (line && line.classList.contains("heading-line")) {
      // set the line width equal to heading width
      line.style.width = heading.offsetWidth + "px";
    }
  });
}

// ------------------ Bubble Background (Light Theme) ------------------
const bubbleCanvas = document.getElementById("bubble-canvas");
if (bubbleCanvas) {
  const bubbleCtx = bubbleCanvas.getContext("2d");

  let bubbles = [];
  const maxBubbles = 40; // number of bubbles
  const colors = [
    "rgba(255,255,255,0.4)",
    "rgba(200,220,255,0.3)",
    "rgba(255,255,255,0.2)",
  ];

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
      drift: (Math.random() - 0.5) * 0.5,
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

function initIntro() {
  const intro = document.getElementById("intro");
  document.body.classList.add("intro-active"); // intro mode ON

  function closeIntro() {
    intro.classList.add("hidden"); // slide up
    setTimeout(() => {
      document.body.classList.remove("intro-active"); // unlock site
    }, 1000); // match transition duration
    window.removeEventListener("wheel", onScroll);
    window.removeEventListener("touchmove", onScroll);
  }

  function onScroll() {
    if (!intro.classList.contains("hidden")) {
      closeIntro();
    }
  }

  // Trigger intro close on scroll or swipe
  window.addEventListener("wheel", onScroll, { passive: true });
  window.addEventListener("touchmove", onScroll, { passive: true });
}

function initIntroExp() {
  const intro = document.getElementById("intro");
  const exploreBtn = document.getElementById("exploreBtn");

  if (!intro) return;

  // Lock scroll while intro is visible
  document.body.style.overflow = "hidden";
  document.body.classList.add("intro-active");

  let introClosed = false;

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.classList.remove("intro-active");
  }

  function closeIntro() {
    if (introClosed) return; // Prevent double triggers
    introClosed = true;

    intro.classList.add("hidden"); // slide up
    setTimeout(unlockScroll, 1000); // match CSS transition

    // Remove listeners
    window.removeEventListener("wheel", onScrollUnlock);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  }

  // --- Touch swipe detection ---
  let startY = 0;
  function onTouchStart(e) {
    startY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    const diffY = startY - e.touches[0].clientY;
    if (diffY > 50) {
      // swipe up threshold
      closeIntro();
    }
  }

  // Scroll / wheel
  function onScrollUnlock() {
    closeIntro();
  }

  window.addEventListener("wheel", onScrollUnlock, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  // Explore button
  if (exploreBtn) {
    exploreBtn.addEventListener("click", closeIntro);
  }
}

function initExplore() {
  const intro = document.getElementById("intro");
  const exploreBtn = document.getElementById("exploreBtn");

  if (!intro) return;

  // Lock scroll
  document.body.style.overflow = "hidden"; // prevent main page scroll

  function closeIntro() {
    if (!intro.classList.contains("hidden")) {
      intro.classList.add("hidden");
      document.body.classList.remove("intro-active");
      document.body.style.overflow = ""; // unlock scroll

      // Start main page typing (if needed)
      const mainTyping = document.querySelector(".typing-text-main");
      const mainWords = ["a Developer", "an Innovator", "a Coder"];
      if (mainTyping) startTyping(mainTyping, mainWords);
    }
  }

  function onScroll() {
    closeIntro();
    window.removeEventListener("wheel", onScroll);
    window.removeEventListener("touchmove", onScroll);
  }

  window.addEventListener("wheel", onScroll, { passive: true });
  window.addEventListener("touchmove", onScroll, { passive: true });

  if (exploreBtn) exploreBtn.addEventListener("click", closeIntro);

  // Typing effect function
  function startTyping(
    container,
    words,
    typingSpeed = 120,
    deletingSpeed = 60,
    pauseDelay = 1200
  ) {
    let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;
    function typeLoop() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        charIndex--;
        container.textContent = currentWord.substring(0, charIndex);
      } else {
        charIndex++;
        container.textContent = currentWord.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseDelay);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }
    typeLoop();
  }

  // Start intro typing
  const introTyping = intro.querySelector(".typing-text");
  const introWords = [
    "Aspiring Software Engineer 🚀",
    "Full Stack Developer 💻",
    "Problem Solver 🧩",
    "Tech Explorer 🌌",
  ];
  if (introTyping) startTyping(introTyping, introWords);
}

// Parallax hover on intro
document.addEventListener("mousemove", (e) => {
  const intro = document.getElementById("intro");
  if (!intro || intro.classList.contains("hidden")) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  intro.querySelector(
    ".intro-content"
  ).style.transform = `translate(${x}px, ${y}px)`;
});

// Explore button → close intro and scroll to home
function initExpp() {
  const exploreBtn = document.getElementById("exploreBtn");
  const intro = document.getElementById("intro");

  if (exploreBtn && intro) {
    exploreBtn.addEventListener("click", () => {
      intro.classList.add("hidden"); // slide intro up
      setTimeout(() => {
        document.body.classList.remove("intro-active"); // unlock site
        document.getElementById("home2").scrollIntoView({
          behavior: "smooth", // ✅ smooth scroll
        });
      }, 1000); // match your intro transition duration
    });
  }
}

// Dynamically set scroll-padding-top based on navbar height
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function updateScrollPadding() {
    const navHeight = navbar.offsetHeight;
    document.documentElement.style.scrollPaddingTop = navHeight + "px";
  }

  updateScrollPadding();
  window.addEventListener("resize", updateScrollPadding);
}

function initTheme0() {
  const themeToggles = document.querySelectorAll(".theme-toggle");

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-theme");
      themeToggles.forEach((btn) => (btn.textContent = "☀️"));
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      themeToggles.forEach((btn) => (btn.textContent = "🌙"));
      localStorage.setItem("theme", "light");
    }
  }

  function toggleTheme() {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);
  }

  // Attach event to both buttons
  themeToggles.forEach((btn) => btn.addEventListener("click", toggleTheme));

  // 🔥 Initialize with saved theme (default: dark)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    setTheme(false);
  } else {
    setTheme(true);
  }
}

// ---------- Smooth drag / swipe for the certifications strip ----------
(function () {
  const certContainer = document.querySelector(".Certifications");
  if (!certContainer) return; // nothing to do if not present

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Mouse events (desktop)
  certContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    certContainer.classList.add("dragging");
    startX = e.pageX - certContainer.offsetLeft;
    scrollLeft = certContainer.scrollLeft;
  });

  document.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    certContainer.classList.remove("dragging");
  });

  certContainer.addEventListener("mouseleave", () => {
    if (!isDown) return;
    isDown = false;
    certContainer.classList.remove("dragging");
  });

  certContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - certContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // increase or reduce factor to change speed
    certContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch events (mobile)
  certContainer.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      isDown = true;
      startX = e.touches[0].pageX - certContainer.offsetLeft;
      scrollLeft = certContainer.scrollLeft;
    },
    { passive: true }
  );

  certContainer.addEventListener("touchend", () => {
    isDown = false;
  });

  certContainer.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown || e.touches.length !== 1) return;
      // don't call preventDefault here to avoid blocking page scroll; we're only adjusting scrollLeft
      const x = e.touches[0].pageX - certContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      certContainer.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );

  // Optional: add keyboard accessibility (arrow keys)
  certContainer.setAttribute("tabindex", "0");
  certContainer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      certContainer.scrollBy({ left: 260, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      certContainer.scrollBy({ left: -260, behavior: "smooth" });
    }
  });

  // small visual feedback (optional in CSS)
  // you may add .Certifications.dragging { cursor: grabbing; cursor: -webkit-grabbing; }
})();
