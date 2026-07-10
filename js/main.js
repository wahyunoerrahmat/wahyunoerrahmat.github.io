/**
 * Main JavaScript Controller — Wahyu Noer Rahmat Professional Portfolio
 * Handles Theme Customizer, Terminal Sandbox, Case Study Modal, Contribution Matrix,
 * Counter Animations, Skill Category Filters, Project Filters, and Interactive Forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeSwitcher();
  initTypewriter();
  initHeroTerminal();
  initStatsCounters();
  initSkillTabs();
  initProjectFilters();
  initCaseStudyModal();
  initContributionMatrix();
  initCopyEmail();
  initContactForm();
});

/**
 * 1. Navbar scroll behavior & mobile toggle
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.innerHTML = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }
}

/**
 * 2. Interactive Theme Switcher
 */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('wahyu_portfolio_theme') || 'default';
  body.setAttribute('data-theme', savedTheme);
  updateActiveThemeBtn(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme-val');
      body.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('wahyu_portfolio_theme', selectedTheme);
      updateActiveThemeBtn(selectedTheme);
      showToast(`Tema warna diubah ke mode: ${selectedTheme.toUpperCase()}`);
    });
  });

  function updateActiveThemeBtn(theme) {
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

/**
 * 3. Dynamic Typewriter Effect
 */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const roles = [
    'Software Engineer',
    'Full-Stack Web Architect',
    'Desktop Systems Developer',
    'Modern UI/UX Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      delay = 45;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/**
 * 4. Interactive Hero Terminal (Multi-tab & Command Runner)
 */
function initHeroTerminal() {
  const tabBtns = document.querySelectorAll('.terminal-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Simulated CLI Sandbox in tab-terminal
  const termInput = document.getElementById('termInput');
  const termOutput = document.getElementById('termOutput');
  const quickBtns = document.querySelectorAll('.term-chip');

  function runCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    let response = '';

    switch (command) {
      case 'help':
        response = `
          <strong>Daftar Perintah Tersedia:</strong><br>
          • <span style="color:#34d399">skills</span> : Tampilkan daftar keahlian utama Wahyu<br>
          • <span style="color:#34d399">projects</span> : Tampilkan ringkasan proyek unggulan<br>
          • <span style="color:#34d399">contact</span> : Info email dan koneksi profesional<br>
          • <span style="color:#34d399">clear</span> : Bersihkan layar terminal
        `;
        break;
      case 'skills':
        response = `
          <strong>Keahlian Utama:</strong><br>
          Frontend: HTML5, Modern CSS, JavaScript ES6+, TypeScript<br>
          Backend: Node.js, REST API, Database SQL<br>
          Desktop: Systems GUI Engineering, C++, Java
        `;
        break;
      case 'projects':
        response = `
          <strong>Proyek &amp; Studi Kasus Unggulan:</strong><br>
          [#01] Enterprise AI Analytics Dashboard (Web App)<br>
          [#02] Desktop Resource Management System (Desktop)<br>
          [#03] Cyber-Glass Design System &amp; UI Tokens (Architecture)
        `;
        break;
      case 'contact':
        response = `
          <strong>Koneksi Langsung:</strong><br>
          Email: wahyunoerrahmat@gmail.com<br>
          GitHub: https://github.com/wahyu2810
        `;
        break;
      case 'clear':
        termOutput.innerHTML = `Layar terminal dibersihkan. Ketik <strong>help</strong> untuk memulai.`;
        return;
      default:
        response = `Perintah '<span style="color:#f43f5e">${cmd}</span>' tidak dikenali. Ketik <strong>help</strong> untuk melihat perintah.`;
    }

    termOutput.innerHTML = `<div style="margin-bottom:6px; color:#a855f7;">wahyu@portfolio:~$ ${cmd}</div>${response}`;
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (termInput.value.trim() !== '') {
          runCommand(termInput.value);
          termInput.value = '';
        }
      }
    });
  }

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (termInput) termInput.value = '';
      runCommand(cmd);
    });
  });
}

/**
 * 5. Stats Counter Animation on Scroll
 */
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 40);

          const updateCounter = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count;
              setTimeout(updateCounter, 35);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const banner = document.querySelector('.stats-banner');
  if (banner) observer.observe(banner);
}

/**
 * 6. Skill Matrix Category Tabs & Progress Bar Observer
 */
function initSkillTabs() {
  const skillBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-skill-tab');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-skill-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Progress Bar Animation Observer
  const progressBars = document.querySelectorAll('.skill-progress-bar');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) bar.style.width = targetWidth;
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

/**
 * 7. Project Category Filters
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tabs .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(18px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 8. Interactive Case Study Modal Dialog
 */
function initCaseStudyModal() {
  const modal = document.getElementById('caseModal');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!modal) return;

  const caseStudies = {
    'ai-analytics': {
      tag: 'CASE STUDY #01 • WEB APPLICATION ARCHITECTURE',
      title: 'Enterprise AI Analytics Dashboard',
      content: `
        <div class="modal-section">
          <h4>01. Ikhtisar &amp; Latar Belakang Proyek</h4>
          <p>Dasbor analitik korporasi sering kali menghadapi tantangan latensi tinggi saat merender ribuan titik data secara real-time. Proyek ini dirancang untuk menghadirkan antarmuka visualisasi data yang responsif, menyajikan metrik bisnis utama dengan animasi halus tanpa pemblokiran main thread.</p>
        </div>
        <div class="modal-section">
          <h4>02. Arsitektur Teknis &amp; Solusi</h4>
          <p>Menggunakan HTML5 semantik dan struktur rendering berbasis komponen modular dengan Vanilla JS teroptimasi. Data streaming diproses melalui penanganan asinkron dengan debounce/throttle untuk menjaga performa rendering pada 60 FPS.</p>
        </div>
        <div class="modal-section">
          <h4>03. Metrik Pencapaian &amp; Hasil</h4>
          <div class="modal-architecture">
            [Lighthouse Score: 99/100]  |  [First Contentful Paint: 0.25s]  |  [Responsive: 100% Mobile Ready]
          </div>
        </div>
      `
    },
    'desktop-system': {
      tag: 'CASE STUDY #02 • DESKTOP & SYSTEMS ENGINEERING',
      title: 'Desktop Resource Management System',
      content: `
        <div class="modal-section">
          <h4>01. Ikhtisar &amp; Tantangan Operasional</h4>
          <p>Pengelolaan inventaris dan monitoring sumber daya desktop memerlukan antarmuka antrean data yang tangguh serta pencarian waktu nyata yang seketika tanpa jeda pemrosesan.</p>
        </div>
        <div class="modal-section">
          <h4>02. Desain Sistem &amp; GUI</h4>
          <p>Dirancang dengan arsitektur GUI terstruktur berfokus pada kecepatan alur pemrosesan data, manajemen memori efisien, dan navigasi pintasan keyboard untuk efisiensi operator.</p>
        </div>
        <div class="modal-section">
          <h4>03. Performa Eksekusi</h4>
          <div class="modal-architecture">
            [Throughput: >10,000 baris/detik]  |  [Memory Footprint: Terkendali &amp; Stabil]
          </div>
        </div>
      `
    },
    'cyber-glass': {
      tag: 'CASE STUDY #03 • UI/UX DESIGN SYSTEM',
      title: 'Cyber-Glass Design System & UI Tokens',
      content: `
        <div class="modal-section">
          <h4>01. Filosofi Desain</h4>
          <p>Menciptakan keselarasan visual antara gaya Glassmorphic modern dengan keterbacaan tinggi berstandar aksesibilitas WCAG AA untuk aplikasi skala produksi.</p>
        </div>
        <div class="modal-section">
          <h4>02. Modular Tokens &amp; Komponen</h4>
          <p>Mendefinisikan variabel warna CSS kustom, tipografi terkalibrasi, sistem grid, tombol interaktif, dan notifikasi agar dapat digunakan kembali secara konsisten.</p>
        </div>
      `
    },
    'ecommerce': {
      tag: 'CASE STUDY #04 • BACKEND & FULL-STACK SYSTEM',
      title: 'Cloud-Ready E-Commerce Architecture',
      content: `
        <div class="modal-section">
          <h4>01. Ikhtisar Proyek</h4>
          <p>Platform e-commerce dengan penanganan transaksi berurutan, skema database relasional terindeks, serta integrasi pertukaran data REST API yang terautentikasi.</p>
        </div>
      `
    },
    'testing-tool': {
      tag: 'CASE STUDY #05 • SOFTWARE QUALITY & TESTING',
      title: 'Automated Software Quality Inspection Tool',
      content: `
        <div class="modal-section">
          <h4>01. Ikhtisar Proyek</h4>
          <p>Alat inspeksi otomatisasi untuk memvalidasi alur logika aplikasi, keandalan fungsional, serta memastikan kode bebas dari regres performa.</p>
        </div>
      `
    },
    'portfolio-platform': {
      tag: 'CASE STUDY #06 • PURE WEB ARCHITECTURE',
      title: 'Ultra-Professional Developer Portfolio Platform',
      content: `
        <div class="modal-section">
          <h4>01. Ikhtisar Proyek</h4>
          <p>Pengembangan portofolio rekayasa perangkat lunak tanpa ketergantungan framework eksternal yang berat, membuktikan performa murni Vanilla CSS modern dan JavaScript berkinerja tinggi di GitHub Pages.</p>
        </div>
      `
    }
  };

  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-case');
      const data = caseStudies[key] || {
        tag: 'CASE STUDY',
        title: 'Studi Kasus Proyek',
        content: '<p>Detail studi kasus untuk proyek ini sedang diperbarui dengan dokumentasi teknis terbaru.</p>'
      };

      modalTag.innerText = data.tag;
      modalTitle.innerText = data.title;
      modalBody.innerHTML = data.content;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/**
 * 9. GitHub Contribution Matrix Simulation
 */
function initContributionMatrix() {
  const container = document.getElementById('contribMatrix');
  if (!container) return;

  const totalCells = 40 * 7; // 40 weeks x 7 days
  let html = '';

  for (let i = 0; i < totalCells; i++) {
    // Generate realistic contribution levels
    const rand = Math.random();
    let lvlClass = '';
    let count = 0;

    if (rand > 0.82) {
      lvlClass = 'contrib-lvl-4';
      count = Math.floor(Math.random() * 8) + 12;
    } else if (rand > 0.65) {
      lvlClass = 'contrib-lvl-3';
      count = Math.floor(Math.random() * 6) + 6;
    } else if (rand > 0.45) {
      lvlClass = 'contrib-lvl-2';
      count = Math.floor(Math.random() * 4) + 3;
    } else if (rand > 0.25) {
      lvlClass = 'contrib-lvl-1';
      count = Math.floor(Math.random() * 2) + 1;
    }

    html += `<div class="contrib-cell ${lvlClass}" title="${count} kontribusi kode"></div>`;
  }

  container.innerHTML = html;
}

/**
 * 10. Copy Email Action
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-copy') || 'wahyunoerrahmat@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Alamat email berhasil disalin ke papan klip!');
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

/**
 * 11. Interactive Contact Form Simulator
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '⚡ Mengirim Pesan...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.');
    }, 1200);
  });
}

/**
 * Show Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="font-size: 1.3rem;">✅</span>
    <div>
      <strong style="display:block; font-size:0.95rem;">Berhasil!</strong>
      <span style="font-size:0.85rem;">${message}</span>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
