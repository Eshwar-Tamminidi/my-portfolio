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
  initBubbles(); // Initialize light theme bubbles
  initNavbar();
  initThemeBtn(); // Handles both toggles and saves state
  initSmoothScroll(); // NEW: Handles smooth scrolling
  initIntroSequence(); // NEW: Handles all intro logic
  initContact(); // Initialize contact form
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
        // The smooth scroll function will handle the navigation
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

// ================== SLOW SCROLL FIX ==================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navbar = document.querySelector('.navbar');
  const scrollDuration = 800; // Duration in ms (0.8 seconds)

  // Easing function (ease-in-out-cubic)
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Stop default anchor behavior
      
      const targetId = this.getAttribute('href');
      // Handle the "Explore" button which might also be a link
      if (targetId === "#home2" && document.body.classList.contains("intro-active")) {
          // If it's the explore button, let the intro sequence handle it
          return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        // Calculate target position, offset by navbar height + 10px padding
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - (navbarHeight + 10);
        
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Animation loop
        function scrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / scrollDuration, 1);
          const ease = easeInOutCubic(progress);

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < scrollDuration) {
            requestAnimationFrame(scrollAnimation);
          }
        }
        
        requestAnimationFrame(scrollAnimation);
      }
    });
  });
}
// ================== END SCROLL FIX ==================


// ================== Sliders (Rolling logos) ==================
function initSliders() {
  const slider = document.querySelector(".Slide");
  const sliderContainer = document.querySelector(".Logo");

  if (!slider || !sliderContainer) return;

  let scrollSpeed = 2; 
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
      scrollAmount = 0; 
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
    slider.style.animationPlayState = "running"; 
  }
  duplicateImages();
  startScrolling();
}

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

/* ===== Genie show on scroll (Genie Box) ===== */
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

/* ===== Fade-in left elements (About) ===== */
function initFadeInLeft() {
  let elements = document.querySelectorAll(".fade-in-left");
  function showOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(showOnScroll, { threshold: 0.3 });
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
  document.addEventListener("mouseup", () => {
    isDown = false;
    certWrap.classList.remove("dragging");
  });
  certWrap.addEventListener("mouseleave", () => {
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
      if (e.touches.length !== 1) return;
      isDown = true;
      startX = e.touches[0].pageX - certWrap.offsetLeft;
      scrollLeft = certWrap.scrollLeft;
    },
    { passive: true }
  );

  certWrap.addEventListener("touchend", () => {
    isDown = false;
  });

  certWrap.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown || e.touches.length !== 1) return;
      const x = e.touches[0].pageX - certWrap.offsetLeft;
      const walk = x - startX;
      certWrap.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );
}

/* ===== Snow Effect (dark mode only) ===== */
function initSnowEffect() {
  const canvas = document.getElementById("snow-canvas");
  // Check if canvas exists AND we are in dark theme
  if (!canvas || !document.body.classList.contains("dark-theme")) {
    // If we're not in dark theme, make sure to clear any old snow
    if(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }

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
    // Only run animation if dark theme is still active
    if (!document.body.classList.contains("dark-theme")) {
       ctx.clearRect(0, 0, width, height);
       return;
    }
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

/* ===== Nav Highlight Indicator ===== */
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
      // Use a larger threshold to catch the section earlier
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      if (rect.top <= (navHeight + 50) && rect.bottom >= (navHeight + 50)) {
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

/* ===== Heading Line Width (adjusts line size based on heading text width) ===== */
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
function initBubbles() {
  const bubbleCanvas = document.getElementById("bubble-canvas");
  // Stop if canvas doesn't exist or if we're in dark mode
  if (!bubbleCanvas || document.body.classList.contains("dark-theme")) {
     if(bubbleCanvas) {
        const ctx = bubbleCanvas.getContext("2d");
        ctx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
     }
    return;
  }
  
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
    // Stop animation if we switch to dark theme
    if (document.body.classList.contains("dark-theme")) {
       bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
       return;
    }
    
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

/* ===== NEW INTRO SEQUENCE LOGIC ===== */
function initIntroSequence() {
  const intro = document.getElementById("intro");
  const exploreBtn = document.getElementById("exploreBtn");

  if (!intro) return;

  let isIntroClosing = false; // Gate to prevent multiple triggers
  document.body.style.overflow = "hidden"; // Lock scroll on main page
  document.body.classList.add("intro-active");

  // === The Master Close Function ===
  function closeIntro() {
    if (isIntroClosing) return; // Prevent running twice
    isIntroClosing = true;

    // 1. Add 'hidden' to start animation
    intro.classList.add("hidden"); 

    // 2. Instantly scroll main page to top (hidden behind intro)
    window.scrollTo(0, 0); 
    
    // 3. Remove listeners to stop re-triggering
    window.removeEventListener("wheel", onScroll);
    window.removeEventListener("touchmove", onScroll);
    if (exploreBtn) exploreBtn.removeEventListener("click", closeIntro);

    // 4. After animation (1s), unlock scrolling
    setTimeout(() => {
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
    }, 1000); // Must match CSS transition duration
  }

  // === Triggers ===
  function onScroll() {
    closeIntro();
  }

  window.addEventListener("wheel", onScroll, { passive: true });
  window.addEventListener("touchmove", onScroll, { passive: true });
  if (exploreBtn) exploreBtn.addEventListener("click", closeIntro);

  // === Typing Effect ===
  function startTyping(container, words, typingSpeed = 120, deletingSpeed = 60, pauseDelay = 1200) {
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function typeLoop() {
      if (isIntroClosing) return; // Stop typing if intro is closing
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

  const introTyping = intro.querySelector(".typing-text");
  const introWords = [
    "Aspiring Software Engineer 🚀",
    "Full Stack Developer 💻",
    "Problem Solver 🧩",
    "Tech Explorer 🌌",
  ];
  if (introTyping) startTyping(introTyping, introWords);
  
  // === Parallax (from old code, good to keep) ===
  document.addEventListener("mousemove", (e) => {
    if (!intro || intro.classList.contains("hidden")) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    const introContent = intro.querySelector(".intro-content");
    if (introContent) {
        introContent.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
}
/* ===== END INTRO LOGIC ===== */

// This function is now redundant, but we keep its definition
// to prevent errors from the old `DOMContentLoaded` call.
// The new `initIntroSequence` handles all its logic.
function initExplore() {}
function initExpp() {}
function initIntro() {}
function initIntroExp() {}
function initTheme0() {}


// Dynamically set scroll-padding-top based on navbar height
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function updateScrollPadding() {
    const navHeight = navbar.offsetHeight;
    // We set scrollPaddingTop for CSS-based scrolling (like user scrolling)
    document.documentElement.style.scrollPaddingTop = (navHeight + 10) + "px";
  }

  updateScrollPadding();
  window.addEventListener("resize", updateScrollPadding);
}

// Global Theme Toggle Functionality
function initThemeBtn() {
  const themeToggles = document.querySelectorAll(".theme-toggle");

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-theme");
      themeToggles.forEach((btn) => (btn.textContent = "☀️"));
      localStorage.setItem("theme", "dark");
      initSnowEffect(); // Start snow
      initBubbles(); // Stop bubbles (function checks dark theme)
    } else {
      document.body.classList.remove("dark-theme");
      themeToggles.forEach((btn) => (btn.textContent = "🌙"));
      localStorage.setItem("theme", "light");
      initSnowEffect(); // Stop snow
      initBubbles(); // Start bubbles
    }
  }

  function toggleTheme() {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    setTheme(false);
  } else {
    setTheme(true); // Default to dark theme
  }

  // Attach event to all buttons
  themeToggles.forEach((btn) => btn.addEventListener("click", toggleTheme));
}