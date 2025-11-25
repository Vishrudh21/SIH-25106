// Smooth scroll navigation
const scrollButtons = document.querySelectorAll(".nav a, .primary");
scrollButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const href = btn.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Download button
const downloadBtn = document.querySelector(".secondary");
downloadBtn?.addEventListener("click", () => {
  alert("Blueprint download coming soon. Contact placement@campusflow.edu");
});

// Animated number counter
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = currentValue;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      
      // Trigger number animation for stats
      if (entry.target.classList.contains("animate-number")) {
        const targetValue = parseInt(entry.target.dataset.target);
        const numberElement = entry.target.querySelector(".stat-number");
        if (numberElement && !numberElement.classList.contains("animated")) {
          numberElement.classList.add("animated");
          animateValue(numberElement, 0, targetValue, 2000);
        }
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all stat cards and animated elements
document.addEventListener("DOMContentLoaded", () => {
  // Animate stat cards
  document.querySelectorAll(".animate-number").forEach((el) => {
    observer.observe(el);
  });

  // Animate dashboard cards
  document.querySelectorAll(".dashboard-stat-card, .pipeline-card, .recommendation-card").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });


  // Animate certificate cards
  document.querySelectorAll(".certificate-preview-card, .certificate-process-card").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Animate feature cards on scroll
  document.querySelectorAll(".feature-grid article, .persona-list article").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Animate roadmap cards
  document.querySelectorAll(".roadmap article").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});


// Pipeline node hover effects
document.querySelectorAll(".pipeline-node").forEach((node) => {
  node.addEventListener("mouseenter", function() {
    const circle = this.querySelector(".node-circle");
    if (circle) {
      circle.style.transform = "scale(1.15)";
    }
  });
  
  node.addEventListener("mouseleave", function() {
    const circle = this.querySelector(".node-circle");
    if (circle) {
      circle.style.transform = "scale(1)";
    }
  });
});

// Apply button interactions
document.querySelectorAll(".match-apply-button").forEach((btn) => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    const originalText = this.textContent;
    this.textContent = "✓ Application Sent!";
    this.style.background = "linear-gradient(135deg, #1fbe92, #0fa077)";
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = "linear-gradient(135deg, var(--accent), var(--accent-dark))";
    }, 2000);
  });
});

// Certificate download button
document.querySelectorAll(".cert-download-button").forEach((btn) => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    const originalText = this.textContent;
    this.innerHTML = '<span class="download-icon">⏳</span> Generating PDF...';
    this.disabled = true;
    
    setTimeout(() => {
      this.innerHTML = '<span class="download-icon">✓</span> Downloaded!';
      this.style.background = "linear-gradient(135deg, #1fbe92, #0fa077)";
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = "linear-gradient(135deg, var(--accent), var(--accent-dark))";
        this.disabled = false;
      }, 2000);
    }, 1500);
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 500;
  }
});

// Enhanced card hover effects
document.querySelectorAll(".feature-grid article, .persona-list article").forEach((card) => {
  card.addEventListener("mouseenter", function() {
    this.style.boxShadow = "0 25px 50px rgba(108, 240, 194, 0.3)";
  });
  
  card.addEventListener("mouseleave", function() {
    this.style.boxShadow = "0 18px 35px rgba(0, 0, 0, 0.35)";
  });
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll(".bar span, .metric-bar");
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const computedStyle = window.getComputedStyle(entry.target);
      const width = entry.target.style.width || computedStyle.width;
      entry.target.style.width = "0%";
      setTimeout(() => {
        entry.target.style.width = width;
      }, 200);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach((bar) => {
  progressObserver.observe(bar);
});

// Animate metric bars on scroll
const metricBarObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const metricBar = entry.target.querySelector(".metric-bar");
      if (metricBar) {
        const computedStyle = window.getComputedStyle(metricBar);
        const width = metricBar.style.getPropertyValue("--bar-width") || "0%";
        metricBar.style.setProperty("--bar-width", "0%");
        setTimeout(() => {
          metricBar.style.setProperty("--bar-width", width);
        }, 200);
      }
      metricBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".match-metric").forEach((metric) => {
  metricBarObserver.observe(metric);
});

// Dynamic stat updates (simulating real-time data)
function simulateStatUpdates() {
  const statCards = document.querySelectorAll(".stat-card .stat-number");
  statCards.forEach((stat) => {
    const currentValue = parseInt(stat.textContent);
    if (currentValue > 0) {
      // Simulate small fluctuations
      const variation = Math.floor(Math.random() * 3) - 1;
      const newValue = Math.max(0, currentValue + variation);
      if (newValue !== currentValue && stat.classList.contains("animated")) {
        animateValue(stat, currentValue, newValue, 1000);
      }
    }
  });
}

// Update stats every 30 seconds (optional - can be disabled)
// setInterval(simulateStatUpdates, 30000);

// Animate hero stats on page load
window.addEventListener("load", () => {
  const heroStatNumbers = document.querySelectorAll(".hero-stat-number");
  heroStatNumbers.forEach((stat, index) => {
    setTimeout(() => {
      const targetValue = parseInt(stat.dataset.target);
      animateValue(stat, 0, targetValue, 2000);
    }, index * 300);
  });
  
  // Also animate hero card numbers
  const heroCardSpans = document.querySelectorAll(".hero-card ul li span");
  heroCardSpans.forEach((span, index) => {
    setTimeout(() => {
      const targetValue = parseInt(span.textContent);
      span.textContent = "0";
      animateValue(span, 0, targetValue, 1500);
    }, 1000 + (index * 200));
  });
});

