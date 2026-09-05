/* ==========================================================================
   PORTFOLIO 2026 - AHMAD AL-FATIH RAMADHAN (ARTORIAA-X)
   Interactive Features & Saber Mana Effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initManaCanvas();
  initPersonaSwitcher();
  initMobileNav();
  initActiveNavHighlight();
});

/* --- 1. Typewriter Effect --- */
function initTypewriter() {
  const words = [
    'Network & Systems Engineer',
    'MTCNA Certified (MikroTik)',
    'Linux Server Administrator',
    'Fiber Optic Specialist',
    'Web & Algorithm Developer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  const typeSpeed = 90;
  const deleteSpeed = 40;
  const holdDelay = 1800;

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

/* --- 2. Floating Mana / Golden Sparks Canvas --- */
function initManaCanvas() {
  const canvas = document.getElementById('mana-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  const colors = [
    'rgba(245, 158, 11, ', // Excalibur Gold
    'rgba(251, 191, 36, ', // Bright Gold
    'rgba(56, 189, 248, ', // Mana Cyan
    'rgba(37, 99, 235, '   // Royal Blue
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.radius = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.7 + 0.2;
      this.fade = Math.random() * 0.006 + 0.002;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.alpha -= this.fade;

      if (this.y < -10 || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.colorBase + '0.8)';
      ctx.fill();
      ctx.closePath();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height; // distribute initial
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --- 3. Dual Persona Switcher (Artoria <-> Real Photo) --- */
function initPersonaSwitcher() {
  const profileImg = document.getElementById('profile-img');
  const personaLabel = document.getElementById('persona-label');
  const navBtn = document.getElementById('avatar-toggle-btn');
  const quickSwap = document.getElementById('persona-quick-swap');

  if (!profileImg) return;

  const personas = {
    artoria: {
      src: 'assets/images/profile-artoria.png',
      label: 'Saber Persona',
      alt: 'Artoria Persona - Ahmad AL-Fatih'
    },
    real: {
      src: 'assets/images/profile-real.png',
      label: 'Professional Profile',
      alt: 'Ahmad AL-Fatih Ramadhan Photo'
    }
  };

  let currentPersona = localStorage.getItem('artoria_persona') || 'artoria';

  function applyPersona(mode) {
    currentPersona = mode;
    localStorage.setItem('artoria_persona', mode);

    profileImg.style.opacity = '0';
    profileImg.style.transform = 'scale(0.85)';

    setTimeout(() => {
      profileImg.src = personas[mode].src;
      profileImg.alt = personas[mode].alt;
      if (personaLabel) personaLabel.textContent = personas[mode].label;

      profileImg.style.opacity = '1';
      profileImg.style.transform = 'scale(1)';
    }, 200);
  }

  function togglePersona() {
    const next = currentPersona === 'artoria' ? 'real' : 'artoria';
    applyPersona(next);
  }

  if (navBtn) navBtn.addEventListener('click', togglePersona);
  if (quickSwap) quickSwap.addEventListener('click', togglePersona);

  // Apply initial
  applyPersona(currentPersona);
}

/* --- 4. Mobile Navigation Toggle --- */
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
  }
}

/* --- 5. Scroll Active Link Highlighting --- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
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

/* --- 6. Form Submission (Redirect to WhatsApp with formatted message) --- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  const phone = '6283894768294';
  const text = `Halo Ahmad AL-Fatih (ArtoriaaX),%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subjek:* ${encodeURIComponent(subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(message)}`;

  const waUrl = `https://wa.me/${phone}?text=${text}`;
  window.open(waUrl, '_blank');
}

