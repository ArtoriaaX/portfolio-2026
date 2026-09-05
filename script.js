/* ==========================================================================
   PORTFOLIO 2026 - AHMAD AL-FATIH RAMADHAN (ARTORIAA-X)
   Theme: Modern Interactive Violet/Dark Architecture
   Interactive Features & Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initAmbientCanvas();
  initProjectFilters();
  initMobileNav();
  initNavbarScroll();
  initActiveNavHighlight();
});

/* --- 1. Dynamic Typewriter Effect --- */
function initTypewriter() {
  const words = [
    'Network & Systems Engineer',
    'MTCNA Certified (MikroTik)',
    'Linux Server Administrator',
    'Fiber Optic & SD-WAN Specialist',
    'Modern Web & Interface Developer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const typeSpeed = 85;
  const deleteSpeed = 35;
  const holdDelay = 2000;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --- 2. Interactive Ambient Vector Waves Canvas --- */
function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  // Flowing Wave Curves configuration
  const waves = [
    { yOffset: 0.25, amplitude: 35, frequency: 0.0018, speed: 0.012, color: 'rgba(124, 58, 237, 0.12)' },
    { yOffset: 0.50, amplitude: 50, frequency: 0.0014, speed: 0.008, color: 'rgba(99, 102, 241, 0.10)' },
    { yOffset: 0.75, amplitude: 40, frequency: 0.0016, speed: 0.010, color: 'rgba(168, 85, 247, 0.09)' },
    { yOffset: 0.90, amplitude: 30, frequency: 0.0020, speed: 0.014, color: 'rgba(56, 189, 248, 0.06)' }
  ];

  let step = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    step += 0.02;

    waves.forEach((wave) => {
      ctx.beginPath();
      const baseY = height * wave.yOffset + (mouseY - height / 2) * 0.08;

      ctx.moveTo(0, baseY);

      for (let x = 0; x < width; x += 15) {
        const distToMouse = Math.abs(x - mouseX);
        const mouseInfluence = Math.max(0, 1 - distToMouse / 400) * 20;

        const y =
          baseY +
          Math.sin(x * wave.frequency + step * wave.speed * 40) * (wave.amplitude + mouseInfluence);

        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* --- 3. Project Filter System --- */
function initProjectFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterPills.length || !projectCards.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --- 4. Copy to Clipboard with Toast Notification --- */
function copyText(text, message = 'Teks disalin ke clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    });
  } else {
    // Fallback for non-https or older browser environments
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (err) {
      showToast('Gagal menyalin');
    }
    document.body.removeChild(textArea);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ade80; margin-right: 8px;"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --- 5. Mobile Navigation Toggle --- */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }
}

/* --- 6. Navbar Scroll Background --- */
function initNavbarScroll() {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  if (!navbarWrapper) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  });
}

/* --- 7. Scroll Active Nav Highlighting --- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --- 8. Contact Form Handler (Direct WhatsApp Redirect) --- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  const phone = '6283894768294';
  const text = `Halo Ahmad AL-Fatih Ramadhan,%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subjek:* ${encodeURIComponent(subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(message)}`;

  const waUrl = `https://wa.me/${phone}?text=${text}`;
  window.open(waUrl, '_blank');
}
