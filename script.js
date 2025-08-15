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
      hamburger.textContent = isActive ? "✖" : "☰";
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll("#navLinks a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
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
        hamburger.textContent = "☰";
      }
    });
  }
});




document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".Slide");
    const sliderContainer = document.querySelector(".Logo");

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
    let scrollSpeed = 20;//Lower value faster sccrolling 

    function duplicateImages() {
        const originalImages = Array.from(slider.children);

        // Duplicate images until the total width covers at least 2x the container width
        while (slider.scrollWidth < sliderContainer.clientWidth * 2) {
            originalImages.forEach(img => {
                let clone = img.cloneNode(true);
                slider.appendChild(clone);
            });
        }
    }

    function startScrolling() {
        slider.style.animation = `scrollRight 10s linear infinite`; // Reverse direction
    }

    duplicateImages(); // Ensure enough images for infinite scrolling
    startScrolling();  // Apply smooth animation
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".Certfi");
    const sliderContainer = document.querySelector(".Certifications");

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
    const slider = document.querySelector(".Slide3");
    const sliderContainer = document.querySelector(".Left2");
    let scrollSpeed = 20;//Lower value faster sccrolling 

    function duplicateImages() {
        const originalImages = Array.from(slider.children);

        // Duplicate images until the total width covers at least 2x the container width
        while (slider.scrollWidth < sliderContainer.clientWidth * 2) {
            originalImages.forEach(img => {
                let clone = img.cloneNode(true);
                slider.appendChild(clone);
            });
        }
    }

    function startScrolling() {
        slider.style.animation = `scrollRight 10s linear infinite`; // Reverse direction
    }

    duplicateImages(); // Ensure enough images for infinite scrolling
    startScrolling();  // Apply smooth animation
});

document.addEventListener("DOMContentLoaded", function() {
    let animatedElements = document.querySelectorAll(".Slide, .Slide2, .Slide3");
    animatedElements.forEach(el => {
        el.style.animationPlayState = "running";
    });
});






document.addEventListener("DOMContentLoaded", function() {
    let projects = document.querySelectorAll(".project-container");

    projects.forEach(project => {
        project.addEventListener("click", function() {
            this.classList.toggle("active");
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    let genieElements = document.querySelectorAll(".genie-box");

    // Function to show the animation on scroll
    function showOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Remove observer after appearing
            }
        });
    }

    // Observer to trigger animation on scroll
    let observer = new IntersectionObserver(showOnScroll, {
        threshold: 0.3 // Trigger when 30% visible
    });

    genieElements.forEach(el => observer.observe(el));

    // Also trigger animation on page load
    setTimeout(() => {
        genieElements.forEach(el => el.classList.add("show"));
    }, 500);
});


document.addEventListener("DOMContentLoaded", function () {
    let communicationSection = document.querySelector(".communication-envelope");

    function revealOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Trigger animation when visible
                observer.unobserve(entry.target); // Stop observing after animation runs once
            }
        });
    }

    let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 }); // Start animation when 30% visible
    observer.observe(communicationSection);
});


document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll(".fade-in-left");

    function revealOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add animation class
                observer.unobserve(entry.target); // Run only once
            }
        });
    }

    let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 });

    elements.forEach(element => observer.observe(element));
});



document.addEventListener("DOMContentLoaded", function () {
    let communicationSection = document.querySelector(".skills-envelope");

    function revealOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Trigger animation when visible
                observer.unobserve(entry.target); // Stop observing after animation runs once
            }
        });
    }

    let observer = new IntersectionObserver(revealOnScroll, { threshold: 0.3 }); // Start animation when 30% visible
    observer.observe(communicationSection);
});




document.addEventListener("DOMContentLoaded", function () {
    const genieBox = document.querySelector('.genie-box');
    const educationSection = document.querySelector('.education-container');

    function revealEducation() {
        const rect = educationSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            educationSection.classList.add('show');
            window.removeEventListener('scroll', revealEducation); // Ensure it runs only once
        }
    }

    // Ensure genie effect completes before enabling scroll animation
    setTimeout(() => {
        genieBox.classList.add('show'); // Genie effect starts

        // After genie effect completes, enable scroll detection for education section
        setTimeout(() => {
            window.addEventListener('scroll', revealEducation);
            revealEducation(); // Check on page load in case it's already visible
        }, 0); // Adjust timing based on genie effect duration
    }, 1000); // Timing for genie effect start
});



document.addEventListener("DOMContentLoaded", function () {
    let certSlider = document.querySelector(".Certfi");

    function pauseAnimation() {
        certSlider.style.animationPlayState = "paused";
        setTimeout(() => {
            certSlider.style.animationPlayState = "running";
        }, 5000); // Resume after 5 seconds
    }

    // Pause for 5 seconds on hover or click
    certSlider.addEventListener("mouseover", pauseAnimation);
    certSlider.addEventListener("click", pauseAnimation);
});





document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Apply saved theme on page load
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
});



function initSnowEffect() {
  const canvas = document.getElementById("snow-canvas");
  if (!canvas || !document.body.classList.contains("dark-theme")) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const snowflakes = [];

  function createSnowflakes() {
    for (let i = 0; i < 30; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedY: Math.random() * 1 + 0.5,
        opacity: Math.random()
      });
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    snowflakes.forEach(flake => {
      ctx.globalAlpha = flake.opacity;
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function moveSnowflakes() {
    snowflakes.forEach(flake => {
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

// Run after page loads
window.addEventListener("load", initSnowEffect);




document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById("formMessage");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formMessage.textContent = "Thank you! Your message has been sent.";
      formMessage.style.color = "green";
      form.reset();
    } else {
      const data = await response.json();
      formMessage.textContent = data.errors
        ? data.errors.map(err => err.message).join(", ")
        : "Oops! There was a problem.";
      formMessage.style.color = "red";
    }
  } catch (error) {
    formMessage.textContent = "Error sending message. Please try again later.";
    formMessage.style.color = "red";
  }
});
