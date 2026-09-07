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
  initTerminal();
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

/* ==========================================================================
   9. Interactive Mini Terminal Playground (CLI)
   ========================================================================== */
const terminalState = {
  history: [],
  historyIndex: -1
};

function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalInput) return;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalState.history.length > 0) {
        if (terminalState.historyIndex === -1) {
          terminalState.historyIndex = terminalState.history.length - 1;
        } else if (terminalState.historyIndex > 0) {
          terminalState.historyIndex--;
        }
        terminalInput.value = terminalState.history[terminalState.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (terminalState.historyIndex !== -1) {
        if (terminalState.historyIndex < terminalState.history.length - 1) {
          terminalState.historyIndex++;
          terminalInput.value = terminalState.history[terminalState.historyIndex];
        } else {
          terminalState.historyIndex = -1;
          terminalInput.value = '';
        }
      }
    }
  });
}

function focusTerminalInput() {
  const input = document.getElementById('terminal-input');
  if (input) input.focus();
}

function runQuickCommand(cmd) {
  const input = document.getElementById('terminal-input');
  if (input) {
    input.value = cmd;
    executeTerminalCommand(cmd);
    input.value = '';
  }
}

function handleTerminalSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('terminal-input');
  if (!input) return;

  const rawCmd = input.value.trim();
  if (rawCmd.length > 0) {
    terminalState.history.push(rawCmd);
    terminalState.historyIndex = -1;
    executeTerminalCommand(rawCmd);
    input.value = '';
  }
}

function executeTerminalCommand(rawCmd) {
  const outputContainer = document.getElementById('terminal-output');
  const screen = document.getElementById('terminal-screen');
  if (!outputContainer) return;

  const trimmed = rawCmd.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  // Create entry wrapper
  const entry = document.createElement('div');
  entry.className = 'term-entry';

  // Echo command
  entry.innerHTML = `
    <div class="term-command-line">
      <span class="prompt-user">visitor@alfatih-srv</span><span class="prompt-separator">:</span><span class="prompt-path">~</span><span class="prompt-symbol">$</span>
      <span>${escapeHtml(trimmed)}</span>
    </div>
  `;

  const response = document.createElement('div');
  response.className = 'term-response';

  // Process commands
  switch (command) {
    case 'help':
      response.innerHTML = `
        <div class="term-response-box">
          <strong>Available Commands:</strong>
          <div class="term-table">
            <div><span class="term-cmd-name">whoami</span></div>
            <div class="term-cmd-desc">Display author identity, status, & bio summary</div>
            <div><span class="term-cmd-name">skills</span></div>
            <div class="term-cmd-desc">List technical competencies (Networking, Linux, Web)</div>
            <div><span class="term-cmd-name">cert</span></div>
            <div class="term-cmd-desc">Show official MTCNA MikroTik credentials & ID</div>
            <div><span class="term-cmd-name">exp</span></div>
            <div class="term-cmd-desc">Show work experience (PT Nusa Network & PT Digital)</div>
            <div><span class="term-cmd-name">projects</span></div>
            <div class="term-cmd-desc">List featured repositories & live applications</div>
            <div><span class="term-cmd-name">neofetch</span></div>
            <div class="term-cmd-desc">Display system specs, uptime & ASCII logo</div>
            <div><span class="term-cmd-name">ping &lt;host&gt;</span></div>
            <div class="term-cmd-desc">Simulate ICMP ping packets (e.g. ping ahmad)</div>
            <div><span class="term-cmd-name">traceroute</span></div>
            <div class="term-cmd-desc">Simulate hop-by-hop network trace (e.g. traceroute nnp)</div>
            <div><span class="term-cmd-name">contact</span></div>
            <div class="term-cmd-desc">Get Email, WhatsApp, and GitHub contact links</div>
            <div><span class="term-cmd-name">date</span></div>
            <div class="term-cmd-desc">Display current server date & time</div>
            <div><span class="term-cmd-name">clear</span></div>
            <div class="term-cmd-desc">Clear the terminal screen</div>
            <div><span class="term-cmd-name">sudo &lt;cmd&gt;</span></div>
            <div class="term-cmd-desc">Execute with elevated superuser rights</div>
          </div>
        </div>
      `;
      break;

    case 'whoami':
      response.innerHTML = `
        <div class="term-response-box">
          <span class="term-success">● Ahmad AL-Fatih Ramadhan</span> (ArtoriaaX)<br />
          <strong>Role:</strong> Network & Systems Engineer | Linux Server Admin | Web Developer<br />
          <strong>Education:</strong> SMK LETRIS INDONESIA 1 (Teknik Komputer & Jaringan, 2022–2025)<br />
          <strong>Location:</strong> Ciputat, Tangerang Selatan, Banten, Indonesia<br />
          <strong>Status:</strong> <span class="term-success">Open for Internships & Professional Opportunities</span>
        </div>
      `;
      break;

    case 'skills':
      response.innerHTML = `
        <div class="term-response-box">
          <strong>Technical Competencies Matrix:</strong><br />
          • <span class="spec-label">Computer Networking:</span> MikroTik RouterOS (v6 & v7), Cisco IOS, OSPF, EIGRP, VLAN & 802.1Q Trunking, Spanning-Tree (STP), Etherchannel, SD-WAN, Firewall Filter & NAT Mangle.<br />
          • <span class="spec-label">Linux Server & Systems:</span> Debian/Ubuntu Server, Apache2, Nginx, BIND9 DNS, Postfix/Dovecot Mail Server, OpenVPN, Samba File Server, DHCP & FTP, PC Hardware Diagnostics.<br />
          • <span class="spec-label">Fiber Optic Infrastructure:</span> Fusion Splicing, OTDR, OPM (Optical Power Meter), FTTH Home Installation, Signal Attenuation Optimization.<br />
          • <span class="spec-label">Monitoring & NMS:</span> SolarWinds NMS, FortiManager, Wireshark Packet Analysis, MOP & UAT Documentation.<br />
          • <span class="spec-label">Web & Coding:</span> HTML5, Modern CSS (Flexbox/Grid), JavaScript (ES6+), C++ Linear Algebra Algorithms.
        </div>
      `;
      break;

    case 'cert':
    case 'certification':
    case 'mtcna':
      response.innerHTML = `
        <div class="term-response-box">
          <span class="term-success"><i class="fa-solid fa-award"></i> Verified Credential:</span><br />
          <strong>Title:</strong> MTCNA (MikroTik Certified Network Associate)<br />
          <strong>Certificate ID:</strong> <span class="cmd-highlight">2502NA9815</span><br />
          <strong>Issuer:</strong> MikroTikls SIA (Official Latvia)<br />
          <strong>Status:</strong> <span class="term-success">Active & Verified</span><br />
          <strong>Key Topics:</strong> Routing (Static & OSPF), Wireless, Firewall Filter, Source/Dest NAT, Queues Bandwidth Management, VPN Tunnels (PPPoE, L2TP, EoIP).
        </div>
      `;
      break;

    case 'exp':
    case 'experience':
      response.innerHTML = `
        <div class="term-response-box">
          <strong>Professional Experience Record:</strong><br /><br />
          <strong>1. PT Nusa Network Prakasa</strong> (Agu 2024 – Mar 2025)<br />
          &nbsp;&nbsp;• <em>Role:</em> Network & System Engineer<br />
          &nbsp;&nbsp;• <em>Tasks:</em> Penyusunan MOP/UAT, konfigurasi Jaringan & Firewall, NMS SolarWinds, FortiManager, audit SLA SD-WAN, supervisi pergantian FortiSwitch.<br /><br />
          <strong>2. PT Digital Hasanah Indonesia</strong> (Jan 2024 – Feb 2024)<br />
          &nbsp;&nbsp;• <em>Role:</em> Fiber Optic Technician & Internet Installation<br />
          &nbsp;&nbsp;• <em>Tasks:</em> Precision Fiber Optic Splicing, pengukuran redaman OPM, instalasi ONT internet rumah, diagnosa & perbaikan gangguan fisik kabel optik.
        </div>
      `;
      break;

    case 'projects':
      response.innerHTML = `
        <div class="term-response-box">
          <strong>Featured Project Repositories:</strong><br />
          • <strong>ArtPortfo (Portfolio 2026):</strong> Modern interactive dark-violet website.<br />
          &nbsp;&nbsp;<a href="https://artoriaax.github.io/portfolio-2026/" target="_blank" class="term-link">https://artoriaax.github.io/portfolio-2026/</a><br />
          • <strong>projek-ambacaffe:</strong> Responsive cafe showcase & ordering catalog web.<br />
          &nbsp;&nbsp;<a href="https://github.com/ArtoriaaX/projek-ambacaffe" target="_blank" class="term-link">https://github.com/ArtoriaaX/projek-ambacaffe</a><br />
          • <strong>3dfnafportfolio:</strong> Interactive 3D web canvas & CSS transforms experiment.<br />
          &nbsp;&nbsp;<a href="https://github.com/ArtoriaaX/3dfnafportfolio" target="_blank" class="term-link">https://github.com/ArtoriaaX/3dfnafportfolio</a><br />
          • <strong>Matrix Computing C++:</strong> Linear algebra multi-dimensional matrix operations.<br />
          &nbsp;&nbsp;<a href="https://github.com/ArtoriaaX" target="_blank" class="term-link">https://github.com/ArtoriaaX</a>
        </div>
      `;
      break;

    case 'neofetch':
      response.innerHTML = `
        <div class="term-ascii-block">
          <pre class="term-ascii-logo">
      /\\
     /  \\
    /\\   \\
   /      \\
  /   /\\   \\
 /   /  \\   \\
/___/    \\___\\
          </pre>
          <div class="term-ascii-specs">
            <div><span class="user-highlight">alfatih</span>@<span class="cmd-highlight">letris-server</span></div>
            <div>-----------------------------</div>
            <div><span class="spec-label">OS:</span> <span class="spec-val">Debian GNU/Linux 12 / RouterOS v7</span></div>
            <div><span class="spec-label">Host:</span> <span class="spec-val">Ahmad AL-Fatih Ramadhan (ArtoriaaX)</span></div>
            <div><span class="spec-label">Kernel:</span> <span class="spec-val">6.1.0-tkj-network-amd64</span></div>
            <div><span class="spec-label">Uptime:</span> <span class="spec-val">3 years, 2 months (in IT/TKJ)</span></div>
            <div><span class="spec-label">Cert:</span> <span class="spec-val">MTCNA #2502NA9815</span></div>
            <div><span class="spec-label">Shell:</span> <span class="spec-val">bash 5.2.15 / RouterOS CLI</span></div>
            <div><span class="spec-label">Terminal:</span> <span class="spec-val">alfatih-web-terminal</span></div>
            <div><span class="spec-label">Memory:</span> <span class="spec-val">100% Enthusiastic & Dedicated</span></div>
          </div>
        </div>
      `;
      break;

    case 'ping': {
      const target = args || 'ahmad.alfatih.net';
      response.innerHTML = `
        <div class="term-response-box">
          <span class="term-ping-line">PING ${escapeHtml(target)} (192.168.88.1): 56 data bytes</span><br />
          64 bytes from 192.168.88.1: icmp_seq=1 ttl=64 time=0.42 ms<br />
          64 bytes from 192.168.88.1: icmp_seq=2 ttl=64 time=0.38 ms<br />
          64 bytes from 192.168.88.1: icmp_seq=3 ttl=64 time=0.45 ms<br />
          64 bytes from 192.168.88.1: icmp_seq=4 ttl=64 time=0.35 ms<br />
          --- ${escapeHtml(target)} ping statistics ---<br />
          <span class="term-success">4 packets transmitted, 4 received, 0.0% packet loss, time 3004ms</span><br />
          rtt min/avg/max = 0.350/0.400/0.450 ms
        </div>
      `;
      break;
    }

    case 'traceroute':
    case 'tracert': {
      const target = args || 'nnp.sdwan.gateway';
      response.innerHTML = `
        <div class="term-response-box">
          <span class="term-ping-line">traceroute to ${escapeHtml(target)} (10.254.1.1), 30 hops max, 60 byte packets</span><br />
          &nbsp;1&nbsp;&nbsp;routeros-gateway.local (192.168.88.1)&nbsp;&nbsp;0.312 ms&nbsp;&nbsp;0.285 ms&nbsp;&nbsp;0.274 ms<br />
          &nbsp;2&nbsp;&nbsp;core-switch-letris.tkj (10.10.0.1)&nbsp;&nbsp;1.214 ms&nbsp;&nbsp;1.189 ms&nbsp;&nbsp;1.150 ms<br />
          &nbsp;3&nbsp;&nbsp;fortigate-firewall.edge (172.16.20.254)&nbsp;&nbsp;2.450 ms&nbsp;&nbsp;2.410 ms&nbsp;&nbsp;2.380 ms<br />
          &nbsp;4&nbsp;&nbsp;isp-optical-network.id (103.14.88.1)&nbsp;&nbsp;6.820 ms&nbsp;&nbsp;6.790 ms&nbsp;&nbsp;6.750 ms<br />
          &nbsp;5&nbsp;&nbsp;destination.${escapeHtml(target)} (10.254.1.1)&nbsp;&nbsp;8.120 ms&nbsp;&nbsp;8.050 ms&nbsp;&nbsp;8.010 ms<br />
          <span class="term-success">Trace complete. Zero packet loss across all hops.</span>
        </div>
      `;
      break;
    }

    case 'contact':
      response.innerHTML = `
        <div class="term-response-box">
          <strong>Communication Channels:</strong><br />
          • <strong>Email:</strong> <a href="mailto:ahmadalfatihramadhan@gmail.com" class="term-link">ahmadalfatihramadhan@gmail.com</a><br />
          • <strong>WhatsApp:</strong> <a href="https://wa.me/6283894768294" target="_blank" class="term-link">+62 838-9476-8294</a><br />
          • <strong>GitHub:</strong> <a href="https://github.com/ArtoriaaX" target="_blank" class="term-link">github.com/ArtoriaaX</a><br />
          • <strong>Location:</strong> Ciputat, Tangerang Selatan, Indonesia
        </div>
      `;
      break;

    case 'clear':
    case 'cls':
      outputContainer.innerHTML = '';
      return;

    case 'date':
      response.innerHTML = `<div class="term-response-box">${new Date().toString()}</div>`;
      break;

    case 'sudo':
      response.innerHTML = `
        <div class="term-response-box">
          <span class="term-warn">[sudo] password for visitor: *********</span><br />
          <span class="term-error">Permission denied:</span> You are currently a guest visitor. Full administrative rights are reserved for root. Feel free to explore with regular commands!
        </div>
      `;
      break;

    case '':
      // Empty input, do nothing
      return;

    default:
      response.innerHTML = `
        <span class="term-error">zsh: command not found: ${escapeHtml(command)}</span>. 
        Type <span class="cmd-highlight">'help'</span> to see all available commands.
      `;
      break;
  }

  entry.appendChild(response);
  outputContainer.appendChild(entry);

  // Auto-scroll to bottom of terminal screen
  screen.scrollTop = screen.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

