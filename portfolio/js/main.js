/**
 * ==========================================================================
 * PORTFOLIO CONFIGURATION & INTERACTIVITY SCRIPT
 * Edit your details, projects, and contact info directly below.
 * ==========================================================================
 */

const PORTFOLIO_CONFIG = {
  name: "VINOTHINI I.",
  role: "Full Stack Python Developer",
  email: "vino2004ammu@gmail.com",
  phone: "+91 6369660513",
  location: "Kanyakumari, Tamil Nadu, India",
  degree: "B.E. Computer Science and Engineering (CGPA 8.49)",
  github: "https://github.com/vino2004ammu",
  linkedin: "https://linkedin.com/in/vinothini-i"
};

// ==========================================
// 1. Loading Screen Animation
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-screen');
  const percentEl = document.getElementById('loading-percent');
  const progressBar = document.getElementById('loading-bar');
  const skipBtn = document.getElementById('loading-skip');

  let currentPercent = 0;
  const finishLoading = () => {
    if (!loader) return;
    loader.style.opacity = '0';
    loader.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', finishLoading);
  }

  const interval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 16) + 10;
    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(interval);
      setTimeout(finishLoading, 300);
    }
    if (percentEl) percentEl.textContent = `${String(currentPercent).padStart(3, '0')}%`;
    if (progressBar) progressBar.style.width = `${currentPercent}%`;
  }, 80);
});

// ==========================================
// 2. Custom Cursor for Desktop
// ==========================================
(() => {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');
  const cursorLabel = document.querySelector('.custom-cursor-label');

  if (isTouch || !cursorDot || !cursorRing) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    const target = e.target;
    const cursorContext = target.closest('[data-cursor]');
    if (cursorContext && cursorLabel) {
      cursorLabel.textContent = cursorContext.getAttribute('data-cursor');
      cursorLabel.style.display = 'block';
      cursorRing.style.width = 'auto';
      cursorRing.style.height = 'auto';
      cursorRing.style.border = 'none';
    } else {
      if (cursorLabel) cursorLabel.style.display = 'none';
      cursorRing.style.width = '34px';
      cursorRing.style.height = '34px';
      cursorRing.style.border = '1px solid rgba(212, 175, 55, 0.5)';
    }
  });

  const followLoop = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(followLoop);
  };
  requestAnimationFrame(followLoop);
})();

// ==========================================
// 3. Navbar Blur on Scroll & Back to Top
// ==========================================
(() => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 30) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (scrollY > 400) backToTop.style.display = 'flex';
      else backToTop.style.display = 'none';
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// ==========================================
// 4. Contact Form Submission
// ==========================================
(() => {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-success');

  if (form && successBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successBox.style.display = 'block';
    });
  }
})();
