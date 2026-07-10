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
  initLiveGitHubRepositories();
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
 * 8. Interactive Tutorial & Case Study Modal Dialog (With Step-by-Step Guides)
 */
function initCaseStudyModal() {
  const modal = document.getElementById('caseModal');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!modal) return;

  const tutorialsData = {
    'sistem-pakar': {
      tag: 'PUBLIC REPO TUTORIAL • PYTHON ARTIFICIAL INTELLIGENCE',
      title: 'Sistem Pakar Diagnosis Gizi Buruk Balita (Forward Chaining)',
      repoUrl: 'https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON',
      steps: [
        {
          label: 'Langkah 1: Persiapan & Instalasi',
          html: `
            <div class="modal-section">
              <h4>01. Kloning Repositori &amp; Lingkungan Python</h4>
              <p>Langkah awal adalah mengkloning repositori dari GitHub dan menyiapkan virtual environment Python agar dependensi terisolasi dengan rapi.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal / PowerShell</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON.git&#10;cd SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON.git<br>
                cd SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Arsitektur & Aturan AI',
          html: `
            <div class="modal-section">
              <h4>02. Representasi Knowledge Base (Forward Chaining)</h4>
              <p>Sistem pakar menggunakan metode inferensi Forward Chaining di mana aturan (IF gejala THEN diagnosis) dievaluasi maju dari premis fakta ke kesimpulan medik.</p>
              <div class="tutorial-tip">💡 <strong>Tips Arsitektur:</strong> Pisahkan berkas aturan pengetahuan (Knowledge Base) dengan mesin penalaran (Inference Engine) agar mudah ditambah gejala baru.</div>
            </div>
          `
        },
        {
          label: 'Langkah 3: Menjalankan Sistem',
          html: `
            <div class="modal-section">
              <h4>03. Eksekusi Program Diagnosis Python</h4>
              <p>Jalankan berkas utama sistem pakar menggunakan interpreter Python 3 melalui terminal atau IDE pilihan Anda.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="python main.py">Salin Perintah</button></div>
                python main.py
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 4: Pengujian & Validasi',
          html: `
            <div class="modal-section">
              <h4>04. Simulasi Input Gejala Balita</h4>
              <p>Sistem akan memberikan daftar pertanyaan gejala klinis (misal: berat badan di bawah standar, edema, lesu). Masukkan respons Y/T untuk mendapatkan hasil diagnosis otomatis.</p>
            </div>
          `
        }
      ]
    },
    'k-means': {
      tag: 'PUBLIC REPO TUTORIAL • MACHINE LEARNING DATA SCIENCE',
      title: 'Klasterisasi Literasi Jawa Barat (K-Means Clustering)',
      repoUrl: 'https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat',
      steps: [
        {
          label: 'Langkah 1: Persiapan Dataset & Pustaka',
          html: `
            <div class="modal-section">
              <h4>01. Instalasi Pustaka Data Science Python</h4>
              <p>Kloning repositori dan instal library ilmiah seperti Pandas, NumPy, Scikit-Learn, serta Matplotlib untuk pemrosesan data dan visualisasi.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat.git&#10;pip install pandas numpy scikit-learn matplotlib seaborn">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat.git<br>
                pip install pandas numpy scikit-learn matplotlib seaborn
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Algoritma K-Means & Elbow Method',
          html: `
            <div class="modal-section">
              <h4>02. Penentuan Jumlah Klaster Optimal (Elbow Method)</h4>
              <p>Sebelum melakukan klasterisasi K-Means, gunakan metode Elbow untuk menghitung nilai Within-Cluster Sum of Squares (WCSS) guna menentukan nilai K terbaik.</p>
            </div>
          `
        },
        {
          label: 'Langkah 3: Pemrosesan & Visualisasi',
          html: `
            <div class="modal-section">
              <h4>03. Menjalankan Notebook / Skrip Klasterisasi</h4>
              <p>Eksekusi skrip analisis untuk menghasilkan pengelompokan daerah Jawa Barat berdasarkan indeks literasi tinggi, menengah, dan rendah.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Execution</span><button class="btn-copy-code" data-copy="python k_means_literasi.py">Salin Perintah</button></div>
                python k_means_literasi.py
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 4: Analisis Hasil Klaster',
          html: `
            <div class="modal-section">
              <h4>04. Interpretasi Peta Klaster Literasi</h4>
              <p>Periksa keluaran grafik scatter plot serta tabel klasifikasi kabupaten/kota untuk merumuskan rekomendasi kebijakan peningkatan literasi.</p>
            </div>
          `
        }
      ]
    },
    'absensi-magang': {
      tag: 'PUBLIC REPO TUTORIAL • FULL-STACK WEB APPLICATION',
      title: 'Sistem Manajemen Absensi Magang & Karyawan Terintegrasi',
      repoUrl: 'https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi',
      steps: [
        {
          label: 'Langkah 1: Kloning & Instalasi',
          html: `
            <div class="modal-section">
              <h4>01. Persiapan Web Server &amp; Repositori</h4>
              <p>Unduh repositori sistem absensi dan letakkan di lingkungan web server (XAMPP / PHP / Node.js sesuai konfigurasi proyek).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi.git
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Konfigurasi Basis Data SQL',
          html: `
            <div class="modal-section">
              <h4>02. Impor Skema Database</h4>
              <p>Buat database baru pada server SQL Anda dan impor berkas skema SQL (tabel users, attendance_logs, dan roles) yang tersedia di dalam folder repositori.</p>
            </div>
          `
        },
        {
          label: 'Langkah 3: Konfigurasi Lingkungan (.env)',
          html: `
            <div class="modal-section">
              <h4>03. Pengaturan Koneksi Database</h4>
              <p>Sesuaikan parameter host, username, password, dan nama basis data pada berkas konfigurasi sistem.</p>
            </div>
          `
        },
        {
          label: 'Langkah 4: Uji Coba Presensi Real-Time',
          html: `
            <div class="modal-section">
              <h4>04. Login &amp; Simulasi Absensi</h4>
              <p>Buka browser pada alamat lokal dan coba lakukan pencatatan kehadiran masuk serta keluar untuk memverifikasi log waktu tercatat akurat.</p>
            </div>
          `
        }
      ]
    },
    'bawaslu-bogor': {
      tag: 'PUBLIC REPO TUTORIAL • GOVERNMENT CMS PORTAL',
      title: 'Sistem Portal Informasi Bawaslu Kab. Bogor',
      repoUrl: 'https://github.com/wahyunoerrahmat/BawasluKabBogor',
      steps: [
        {
          label: 'Langkah 1: Persiapan Lingkungan Portal',
          html: `
            <div class="modal-section">
              <h4>01. Kloning Repositori Portal Bawaslu</h4>
              <p>Kloning repositori untuk meninjau struktur antarmuka portal publik dan modul administrasi dokumen.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/BawasluKabBogor.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/BawasluKabBogor.git
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Struktur Arsitektur Halaman Publik',
          html: `
            <div class="modal-section">
              <h4>02. Pemisahan Modul Publik &amp; Panel Admin</h4>
              <p>Sistem ini memisahkan secara tegas antarmuka berita/regulasi untuk publik dengan panel kontrol otentikasi untuk petugas pengawas pemilu.</p>
            </div>
          `
        },
        {
          label: 'Langkah 3: Pengujian Aksesibilitas & Responsivitas',
          html: `
            <div class="modal-section">
              <h4>03. Pengujian Tampilan Multi-Perangkat</h4>
              <p>Pastikan tata letak berita dan dokumen hukum dapat dibaca dengan jelas di perangkat seluler maupun layar lebar.</p>
            </div>
          `
        }
      ]
    },
    'devops-practice': {
      tag: 'PUBLIC REPO TUTORIAL • DEVOPS ENGINEERING ROADMAP',
      title: 'DevOps Engineering Roadmap & CI/CD Pipeline Practice',
      repoUrl: 'https://github.com/wahyunoerrahmat/LearnDevOpsEgineer',
      steps: [
        {
          label: 'Langkah 1: Kontainerisasi dengan Docker',
          html: `
            <div class="modal-section">
              <h4>01. Build Docker Container Image</h4>
              <p>Pelajari praktik penulisan Dockerfile efisien dan build image aplikasi Anda agar konsisten di semua lingkungan deployment.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Docker Terminal</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/LearnDevOpsEgineer.git&#10;docker build -t wahyu-devops-app .">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/LearnDevOpsEgineer.git<br>
                docker build -t wahyu-devops-app .
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Konfigurasi CI/CD Pipeline',
          html: `
            <div class="modal-section">
              <h4>02. Otomatisasi GitHub Actions Workflows</h4>
              <p>Konfigurasikan berkas pipeline YAML di dalam folder <code>.github/workflows/</code> untuk menjalankan automated test setiap kali terjadi push atau pull request.</p>
            </div>
          `
        },
        {
          label: 'Langkah 3: Pemantauan & Deployment',
          html: `
            <div class="modal-section">
              <h4>03. Verifikasi Pipeline Execution</h4>
              <p>Periksa tab Actions pada GitHub untuk memastikan seluruh alur build dan pengujian lulus tanpa kesalahan.</p>
            </div>
          `
        }
      ]
    },
    'steganografi': {
      tag: 'PUBLIC REPO TUTORIAL • IMAGE PROCESSING & CRYPTOGRAPHY',
      title: 'Pengolahan Citra Digital & Steganografi LSB Python',
      repoUrl: 'https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi',
      steps: [
        {
          label: 'Langkah 1: Instalasi Library Citra (Pillow/OpenCV)',
          html: `
            <div class="modal-section">
              <h4>01. Persiapan Pustaka Pengolahan Gambar</h4>
              <p>Siapkan lingkungan Python dengan pustaka manipulasi citra digital seperti PIL/Pillow atau NumPy.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi.git&#10;pip install pillow numpy">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi.git<br>
                pip install pillow numpy
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Konsep Bit LSB (Least Significant Bit)',
          html: `
            <div class="modal-section">
              <h4>02. Algoritma Penyembunyian Pesan LSB</h4>
              <p>Pesan rahasia dikonversi menjadi string biner dan disisipkan pada bit paling tidak signifikan (LSB) dari saluran warna RGB gambar penampung.</p>
            </div>
          `
        },
        {
          label: 'Langkah 3: Encode & Decode Rahasia',
          html: `
            <div class="modal-section">
              <h4>03. Uji Coba Penyandian Pesan ke Gambar</h4>
              <p>Jalankan perintah encode untuk menyisipkan teks rahasia ke dalam berkas gambar PNG, lalu jalankan decode untuk mengekstrak kembali pesan tersebut.</p>
            </div>
          `
        }
      ]
    },
    'desktop-gui': {
      tag: 'PUBLIC REPO TUTORIAL • DESKTOP GUI ENGINEERING',
      title: 'Aplikasi Desktop GUI Interaktif & Manajemen Form',
      repoUrl: 'https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop',
      steps: [
        {
          label: 'Langkah 1: Persiapan IDE & SDK',
          html: `
            <div class="modal-section">
              <h4>01. Kloning &amp; Setup Proyek Desktop</h4>
              <p>Buka proyek menggunakan lingkungan pengembangan desktop pilihan (Visual Studio / NetBeans / PySide sesuai bahasa implementasi).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop.git
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Arsitektur Event-Driven GUI',
          html: `
            <div class="modal-section">
              <h4>02. Penghubungan Event Listener Antarmuka</h4>
              <p>Pelajari bagaimana setiap aksi tombol dan form input dikaitkan langsung dengan fungsi penanganan data untuk responsivitas seketika.</p>
            </div>
          `
        }
      ]
    },
    'crud-kampus': {
      tag: 'PUBLIC REPO TUTORIAL • REST API BACKEND SYSTEM',
      title: 'Sistem CRUD & REST API Manajemen Akademik Kampus',
      repoUrl: 'https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple',
      steps: [
        {
          label: 'Langkah 1: Setup Backend & Database',
          html: `
            <div class="modal-section">
              <h4>01. Kloning &amp; Instalasi Dependensi Backend</h4>
              <p>Unduh proyek dan siapkan koneksi database lokal untuk menguji operasi Create, Read, Update, dan Delete.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple.git
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Pengujian Endpoint REST API',
          html: `
            <div class="modal-section">
              <h4>02. Uji Operasi API dengan Postman / cURL</h4>
              <p>Gunakan Postman atau cURL untuk memvalidasi setiap endpoint API mengembalikan respons JSON yang tepat dan terstruktur.</p>
            </div>
          `
        }
      ]
    },
    'pawf-mvc': {
      tag: 'PUBLIC REPO TUTORIAL • WEB FRAMEWORK ARCHITECTURE',
      title: 'Arsitektur Web Framework MVC (PAWF)',
      repoUrl: 'https://github.com/wahyunoerrahmat/pawf',
      steps: [
        {
          label: 'Langkah 1: Struktur Folder MVC',
          html: `
            <div class="modal-section">
              <h4>01. Memahami Pemisahan Model-View-Controller</h4>
              <p>Studi arsitektur framework web yang memisahkan logika query database (Model), presentasi antarmuka (View), dan pengatur alur permintaan (Controller).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/pawf.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/pawf.git
              </div>
            </div>
          `
        },
        {
          label: 'Langkah 2: Sistem Routing Dinamis',
          html: `
            <div class="modal-section">
              <h4>02. Alur Eksekusi Router &amp; Middleware</h4>
              <p>Pelajari bagaimana URL permintaan dipetakan secara bersih ke metode controller yang sesuai.</p>
            </div>
          `
        }
      ]
    }
  };

  function renderTutorialWizard(data) {
    modalTag.innerText = data.tag;
    modalTitle.innerText = data.title;

    if (data.steps && data.steps.length > 0) {
      let navHtml = '<div class="tutorial-wizard-tabs">';
      data.steps.forEach((s, idx) => {
        const activeClass = idx === 0 ? 'active' : '';
        navHtml += `<button class="tutorial-step-btn ${activeClass}" data-step-index="${idx}">${s.label}</button>`;
      });
      navHtml += '</div>';

      let panesHtml = '<div class="tutorial-panes-container">';
      data.steps.forEach((s, idx) => {
        const activeClass = idx === 0 ? 'active' : '';
        panesHtml += `<div class="tutorial-step-pane ${activeClass}" id="stepPane_${idx}">${s.html}</div>`;
      });
      panesHtml += '</div>';

      if (data.repoUrl) {
        panesHtml += `
          <div style="margin-top:2rem; padding-top:1.2rem; border-top:1px dashed var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; color:var(--text-muted);">Lihat seluruh kode sumber langsung di GitHub resmi Wahyu Noer Rahmat:</span>
            <a href="${data.repoUrl}" target="_blank" class="btn-case-study" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem;">⭐ Buka Repositori GitHub</a>
          </div>
        `;
      }

      modalBody.innerHTML = navHtml + panesHtml;

      // Attach step switching logic
      const stepBtns = modalBody.querySelectorAll('.tutorial-step-btn');
      const stepPanes = modalBody.querySelectorAll('.tutorial-step-pane');

      stepBtns.forEach(b => {
        b.addEventListener('click', () => {
          const idx = b.getAttribute('data-step-index');
          stepBtns.forEach(btn => btn.classList.remove('active'));
          stepPanes.forEach(pane => pane.classList.remove('active'));

          b.classList.add('active');
          const targetPane = modalBody.querySelector(`#stepPane_${idx}`);
          if (targetPane) targetPane.classList.add('active');
        });
      });
    } else {
      modalBody.innerHTML = data.content || '<p>Detail tutorial untuk proyek ini tersedia di repositori GitHub.</p>';
    }

    // Attach copy code buttons
    modalBody.querySelectorAll('.btn-copy-code').forEach(copyBtn => {
      copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.innerText = '✅ Disalin!';
          copyBtn.style.background = '#10b981';
          copyBtn.style.borderColor = '#10b981';
          setTimeout(() => {
            copyBtn.innerText = 'Salin Perintah';
            copyBtn.style.background = '';
            copyBtn.style.borderColor = '';
          }, 2000);
        });
      });
    });
  }

  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-tutorial') || btn.getAttribute('data-case');
      const data = tutorialsData[key] || {
        tag: 'TUTORIAL CARA MEMBUAT PROYEK',
        title: 'Tutorial & Panduan Proyek',
        repoUrl: 'https://github.com/wahyunoerrahmat',
        steps: [
          {
            label: 'Langkah 1: Akses Repositori',
            html: `
              <div class="modal-section">
                <h4>01. Eksplorasi Kode Sumber di GitHub</h4>
                <p>Proyek publik ini tersedia langsung pada akun GitHub resmi Wahyu Noer Rahmat (@wahyunoerrahmat). Anda dapat mengkloning atau membaca struktur kodenya secara langsung.</p>
              </div>
            `
          }
        ]
      };

      renderTutorialWizard(data);
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

/**
 * 12. Live GitHub Repositories & Dynamic Step-by-Step Tutorial Generator
 */
async function initLiveGitHubRepositories() {
  const grid = document.getElementById('githubReposGrid');
  if (!grid) return;

  try {
    const res = await fetch('https://api.github.com/users/wahyunoerrahmat/repos?sort=updated&per_page=30');
    if (!res.ok) return;
    const repos = await res.json();

    // Known static titles/repos already listed
    const existingLinks = new Set();
    grid.querySelectorAll('a.project-link').forEach(a => {
      existingLinks.add(a.getAttribute('href')?.toLowerCase());
    });

    repos.forEach(repo => {
      if (repo.private || repo.name === 'wahyunoerrahmat.github.io') return;
      if (existingLinks.has(repo.html_url.toLowerCase())) return;

      const lang = repo.language || 'Code';
      let category = 'web';
      const nameLow = repo.name.toLowerCase();
      if (nameLow.includes('ai') || nameLow.includes('kmeans') || nameLow.includes('citra') || nameLow.includes('data')) {
        category = 'ai';
      } else if (nameLow.includes('desktop') || nameLow.includes('gui')) {
        category = 'desktop';
      } else if (nameLow.includes('devops') || nameLow.includes('docker')) {
        category = 'devops';
      }

      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', category);
      card.innerHTML = `
        <div class="project-image">
          <span class="project-badge-top">LIVE GITHUB REPO • ${lang.toUpperCase()}</span>
          <svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="210" fill="#11131c"/>
            <text x="200" y="110" font-family="'Fira Code', monospace" font-weight="700" font-size="16" fill="#6366f1" text-anchor="middle">${repo.name}</text>
          </svg>
        </div>
        <div class="project-body">
          <div class="project-tags">
            <span class="tag">${lang}</span>
            <span class="tag">Open Source</span>
            <span class="tag">GitHub Public</span>
          </div>
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Proyek open-source publik resmi Wahyu Noer Rahmat berteknologi ' + lang + '.'}</p>
          <div class="project-metrics">
            <div class="metric-item"><strong>${repo.stargazers_count} ⭐</strong>Stars</div>
            <div class="metric-item"><strong>${repo.forks_count} 🍴</strong>Forks</div>
          </div>
          <div class="project-links">
            <button class="btn-case-study" data-dynamic-repo="${repo.name}">📖 Tutorial Cara Membuat</button>
            <a href="${repo.html_url}" target="_blank" class="project-link">⭐ Repo GitHub</a>
          </div>
        </div>
      `;

      grid.appendChild(card);

      const btn = card.querySelector('.btn-case-study');
      btn.addEventListener('click', () => {
        const modal = document.getElementById('caseModal');
        const modalTag = document.getElementById('modalTag');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTag.innerText = 'TUTORIAL CARA MEMBUAT • ' + lang.toUpperCase();
        modalTitle.innerText = repo.name;

        modalBody.innerHTML = `
          <div class="tutorial-wizard-tabs">
            <button class="tutorial-step-btn active" data-step-index="0">Langkah 1: Persiapan &amp; Kloning</button>
            <button class="tutorial-step-btn" data-step-index="1">Langkah 2: Struktur &amp; Arsitektur</button>
            <button class="tutorial-step-btn" data-step-index="2">Langkah 3: Menjalankan Proyek</button>
          </div>
          <div class="tutorial-step-pane active" id="stepPane_0">
            <div class="modal-section">
              <h4>01. Kloning Repositori GitHub</h4>
              <p>Unduh berkas proyek langsung dari repositori resmi Wahyu Noer Rahmat di GitHub menggunakan perintah terminal berikut:</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone ${repo.html_url}.git&#10;cd ${repo.name}">Salin Perintah</button></div>
                git clone ${repo.html_url}.git<br>
                cd ${repo.name}
              </div>
            </div>
          </div>
          <div class="tutorial-step-pane" id="stepPane_1">
            <div class="modal-section">
              <h4>02. Analisis Struktur Kode (${lang})</h4>
              <p>Proyek <strong>${repo.name}</strong> dikembangkan dengan bahasa pemrograman utama <strong>${lang}</strong>. Periksa berkas utama di dalam direktori untuk memahami alur penanganan data dan logika aplikasi.</p>
            </div>
          </div>
          <div class="tutorial-step-pane" id="stepPane_2">
            <div class="modal-section">
              <h4>03. Menjalankan &amp; Pengujian</h4>
              <p>Ikuti panduan konfigurasi yang tertera pada berkas <code>README.md</code> di repositori untuk menjalankan aplikasi secara lokal.</p>
            </div>
          </div>
          <div style="margin-top:2rem; padding-top:1.2rem; border-top:1px dashed var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; color:var(--text-muted);">Lihat dokumentasi lengkap di GitHub:</span>
            <a href="${repo.html_url}" target="_blank" class="btn-case-study" style="text-decoration:none;">⭐ Buka Repositori ${repo.name}</a>
          </div>
        `;

        const stepBtns = modalBody.querySelectorAll('.tutorial-step-btn');
        const stepPanes = modalBody.querySelectorAll('.tutorial-step-pane');
        stepBtns.forEach(b => {
          b.addEventListener('click', () => {
            const idx = b.getAttribute('data-step-index');
            stepBtns.forEach(x => x.classList.remove('active'));
            stepPanes.forEach(p => p.classList.remove('active'));
            b.classList.add('active');
            const target = modalBody.querySelector('#stepPane_' + idx);
            if (target) target.classList.add('active');
          });
        });

        modalBody.querySelectorAll('.btn-copy-code').forEach(copyBtn => {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(copyBtn.getAttribute('data-copy')).then(() => {
              copyBtn.innerText = '✅ Disalin!';
              copyBtn.style.background = '#10b981';
              setTimeout(() => { copyBtn.innerText = 'Salin Perintah'; copyBtn.style.background = ''; }, 2000);
            });
          });
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    initProjectFilters();
  } catch (err) {
    console.warn('GitHub API offline fallback enabled:', err);
  }
}
