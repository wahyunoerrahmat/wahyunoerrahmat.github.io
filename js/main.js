/**
 * Main JavaScript Controller — Wahyu Noer Rahmat Executive & Minimalist Portfolio
 * Handles Navigation, Code Preview Window, Project Category Filters,
 * Step-by-Step Tutorial Wizard Modal, Live GitHub Repository Sync, and Interactive Elements.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initCodeWindowTabs();
  initStatsCounters();
  initProjectFilters();
  initTutorialModal();
  initLiveGitHubRepositories();
  initCopyEmail();
  initContactForm();
});

/**
 * 1. Navbar Scroll Effect & Mobile Toggle
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      navbar.style.background = 'rgba(9, 10, 15, 0.94)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(9, 10, 15, 0.82)';
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
 * 2. Typewriter Effect
 */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const roles = [
    'Software Engineer',
    'Full-Stack Web Architect',
    'AI & Rule-Based Systems Developer',
    'Desktop GUI Engineer',
    'Open Source Contributor'
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
      delay = 40;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 450;
    }

    setTimeout(type, delay);
  }

  type();
}

/**
 * 3. Hero Code Preview Window Tab Switcher
 */
function initCodeWindowTabs() {
  const tabBtns = document.querySelectorAll('.window-tabs .code-tab');
  const tabPanes = document.querySelectorAll('.code-window-body');

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
}

/**
 * 4. Stats Counter Animations
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
          const increment = Math.max(1, Math.ceil(target / 35));

          const updateCounter = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count;
              setTimeout(updateCounter, 40);
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

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) observer.observe(statsBar);
}

/**
 * 5. Project Category Filters
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tabs .filter-btn');
  const projectCards = document.querySelectorAll('#githubReposGrid .project-card');

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
}

/**
 * 6. Step-by-Step Tutorial Wizard inside Modal (`#caseModal`)
 */
function initTutorialModal() {
  const modal = document.getElementById('caseModal');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!modal) return;

  const tutorialsData = {
    'sistem-pakar': {
      tag: 'TUTORIAL CARA MEMBUAT • PYTHON AI EXPERT SYSTEM',
      title: 'Sistem Pakar Diagnosis Gizi Buruk Balita (Forward Chaining)',
      repoUrl: 'https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON',
      steps: [
        {
          label: '1. Persiapan & Kloning',
          html: `
            <div class="modal-section">
              <h4>01. Kloning Repositori &amp; Lingkungan Python</h4>
              <p>Langkah awal adalah mengunduh kode sumber dari repositori GitHub resmi Wahyu Noer Rahmat dan menyiapkan lingkungan Python 3 pada komputer Anda.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal / Command Prompt</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON.git&#10;cd SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON.git<br>
                cd SISTEM-PAKAR-DIAGNOSIS-GIZI-BURUK-PADA-BALITA-MENGGUNAKAN-METODE-FORWARD-CHAINING-BERBASIS-PYTHON
              </div>
            </div>
          `
        },
        {
          label: '2. Arsitektur Rule-Based',
          html: `
            <div class="modal-section">
              <h4>02. Logika Inferensi Forward Chaining</h4>
              <p>Sistem ini menerapkan metode inferensi <strong>Forward Chaining</strong>, di mana pemeriksaan dimulai dari fakta gejala awal (seperti berat badan, edema klinis, nafsu makan berkurang) yang kemudian dirangkai melewati aturan pengetahuan medis untuk menyimpulkan kesimpulan diagnosis akhir.</p>
              <div class="tutorial-tip">💡 <strong>Catatan Arsitektur:</strong> Aturan basis pengetahuan medis dipisahkan secara modular agar mudah diperbarui apabila ada penambahan parameter gizi baru dari tenaga medis tanpa merombak mesin penalaran utama.</div>
            </div>
          `
        },
        {
          label: '3. Eksekusi Program',
          html: `
            <div class="modal-section">
              <h4>03. Menjalankan Aplikasi Diagnosis</h4>
              <p>Jalankan berkas utama aplikasi menggunakan interpreter Python melalui terminal Anda. Program CLI akan langsung meminta masukan data gejala dari pengguna.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="python main.py">Salin Perintah</button></div>
                python main.py
              </div>
            </div>
          `
        },
        {
          label: '4. Uji Diagnosis & Hasil',
          html: `
            <div class="modal-section">
              <h4>04. Simulasi Input &amp; Evaluasi Medis</h4>
              <p>Setelah program berjalan, jawab serangkaian pertanyaan gejala klinis balita dengan ketik <strong>Y (Ya)</strong> atau <strong>T (Tidak)</strong>. Mesin inferensi akan menampilkan ringkasan diagnosis serta anjuran tindakan penanganan gizi secara akurat.</p>
            </div>
          `
        }
      ]
    },
    'k-means': {
      tag: 'TUTORIAL CARA MEMBUAT • MACHINE LEARNING & DATA SCIENCE',
      title: 'Klasterisasi Literasi Jawa Barat (K-Means Clustering)',
      repoUrl: 'https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat',
      steps: [
        {
          label: '1. Persiapan Pustaka',
          html: `
            <div class="modal-section">
              <h4>01. Kloning Repositori &amp; Instalasi Dependensi</h4>
              <p>Siapkan lingkungan Python dengan pustaka pengolahan data ilmiah seperti Pandas, NumPy, Scikit-Learn, dan Matplotlib.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat.git&#10;pip install pandas numpy scikit-learn matplotlib seaborn">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/K-Means_Literasi_Jawa_Barat.git<br>
                pip install pandas numpy scikit-learn matplotlib seaborn
              </div>
            </div>
          `
        },
        {
          label: '2. Elbow Method Optimization',
          html: `
            <div class="modal-section">
              <h4>02. Menentukan K Optimal dengan Elbow Method</h4>
              <p>Sebelum melakukan klasterisasi, algoritma menghitung nilai Within-Cluster Sum of Squares (WCSS) pada berbagai titik K untuk menemukan patahan siku (elbow) terbaik agar pembagian kelompok daerah benar-benar representatif.</p>
            </div>
          `
        },
        {
          label: '3. Pemrosesan K-Means',
          html: `
            <div class="modal-section">
              <h4>03. Eksekusi Skrip Klasterisasi</h4>
              <p>Jalankan skrip Python untuk mengelompokkan kabupaten/kota di Jawa Barat berdasarkan indeks literasi (tinggi, sedang, rendah).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="python k_means_literasi.py">Salin Perintah</button></div>
                python k_means_literasi.py
              </div>
            </div>
          `
        },
        {
          label: '4. Interpretasi Peta Klaster',
          html: `
            <div class="modal-section">
              <h4>04. Analisis Grafik Visualisasi</h4>
              <p>Periksa diagram scatter plot hasil yang diekspor untuk merumuskan rekomendasi intervensi pendidikan pada klaster daerah yang membutuhkan prioritas peningkatan literasi.</p>
            </div>
          `
        }
      ]
    },
    'absensi-magang': {
      tag: 'TUTORIAL CARA MEMBUAT • FULL-STACK WEB APPLICATION',
      title: 'Sistem Manajemen Absensi Magang & Karyawan Terintegrasi',
      repoUrl: 'https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi',
      steps: [
        {
          label: '1. Setup Web Server',
          html: `
            <div class="modal-section">
              <h4>01. Kloning &amp; Persiapan Direktori Web Server</h4>
              <p>Unduh berkas proyek ke direktori server web Anda (seperti htdocs pada XAMPP/Laragon atau direktori proyek Node.js).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/wahyu-noer-rahmat-proyek-akhir-absensi.git
              </div>
            </div>
          `
        },
        {
          label: '2. Impor Database SQL',
          html: `
            <div class="modal-section">
              <h4>02. Konfigurasi Skema Basis Data</h4>
              <p>Buat database baru pada server MySQL lokal Anda dan impor berkas skema SQL (termasuk tabel pengguna, riwayat kehadiran, dan kredensial akses) yang tersedia di dalam folder repositori.</p>
            </div>
          `
        },
        {
          label: '3. Konfigurasi Koneksi',
          html: `
            <div class="modal-section">
              <h4>03. Parameter Lingkungan Kerja (.env / config)</h4>
              <p>Sesuaikan nama database, pengguna server, dan kata sandi pada berkas konfigurasi sistem agar terhubung dengan lancar.</p>
            </div>
          `
        },
        {
          label: '4. Pengujian Real-Time',
          html: `
            <div class="modal-section">
              <h4>04. Simulasi Presensi Masuk &amp; Keluar</h4>
              <p>Buka browser pada alamat lokal, masuk menggunakan akun peserta atau pengawas, dan lakukan verifikasi pencatatan jam kehadiran secara real-time.</p>
            </div>
          `
        }
      ]
    },
    'bawaslu-bogor': {
      tag: 'TUTORIAL CARA MEMBUAT • GOVERNMENT CMS PORTAL',
      title: 'Sistem Portal Informasi Bawaslu Kab. Bogor',
      repoUrl: 'https://github.com/wahyunoerrahmat/BawasluKabBogor',
      steps: [
        {
          label: '1. Kloning Repositori',
          html: `
            <div class="modal-section">
              <h4>01. Akses Kode Sumber Portal Bawaslu</h4>
              <p>Unduh repositori untuk meninjau struktur arsitektur antarmuka portal publik dan panel administrasi berita.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/BawasluKabBogor.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/BawasluKabBogor.git
              </div>
            </div>
          `
        },
        {
          label: '2. Pemisahan Modul Publik vs Admin',
          html: `
            <div class="modal-section">
              <h4>02. Arsitektur Multi-Layer Portal</h4>
              <p>Sistem dipisahkan secara tegas antara halaman publik (untuk akses berita dan unduh regulasi hukum) dengan panel admin terautentikasi (untuk petugas Bawaslu memperbarui konten publikasi).</p>
            </div>
          `
        },
        {
          label: '3. Uji Coba Responsivitas',
          html: `
            <div class="modal-section">
              <h4>03. Pengujian Tampilan Mobile-First</h4>
              <p>Periksa tata letak halaman pada berbagai ukuran layar untuk memastikan transparansi informasi publik tetap terbaca sempurna di perangkat seluler.</p>
            </div>
          `
        }
      ]
    },
    'devops-practice': {
      tag: 'TUTORIAL CARA MEMBUAT • DEVOPS & CI/CD PIPELINE',
      title: 'DevOps Engineering Roadmap & CI/CD Practice',
      repoUrl: 'https://github.com/wahyunoerrahmat/LearnDevOpsEgineer',
      steps: [
        {
          label: '1. Docker Container Build',
          html: `
            <div class="modal-section">
              <h4>01. Kontainerisasi dengan Docker</h4>
              <p>Pelajari penulisan <code>Dockerfile</code> berkinerja tinggi untuk mengemas aplikasi dan dependensinya menjadi image yang konsisten di semua server.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Docker</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/LearnDevOpsEgineer.git&#10;docker build -t wahyu-devops-app .">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/LearnDevOpsEgineer.git<br>
                docker build -t wahyu-devops-app .
              </div>
            </div>
          `
        },
        {
          label: '2. Automated CI/CD Workflows',
          html: `
            <div class="modal-section">
              <h4>02. Konfigurasi GitHub Actions Pipeline</h4>
              <p>Tinjau berkas konfigurasi YAML pada direktori <code>.github/workflows/</code> yang otomatis memicu pengujian (testing) dan pemeriksaan kualitas setiap kali ada perubahan kode.</p>
            </div>
          `
        },
        {
          label: '3. Verifikasi Pipeline',
          html: `
            <div class="modal-section">
              <h4>03. Audit Eksekusi Workflows</h4>
              <p>Periksa log eksekusi pada tab Actions di GitHub untuk memvalidasi seluruh tahapan build dan deployment berjalan sukses tanpa gangguan.</p>
            </div>
          `
        }
      ]
    },
    'steganografi': {
      tag: 'TUTORIAL CARA MEMBUAT • IMAGE PROCESSING & CRYPTOGRAPHY',
      title: 'Pengolahan Citra Digital & Steganografi LSB Python',
      repoUrl: 'https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi',
      steps: [
        {
          label: '1. Instalasi Pustaka',
          html: `
            <div class="modal-section">
              <h4>01. Persiapan Pustaka Pillow / OpenCV</h4>
              <p>Siapkan lingkungan Python dengan pustaka pemrosesan matriks gambar digital.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi.git&#10;pip install pillow numpy">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/metode-manipulasi-citra-digital-steganografi.git<br>
                pip install pillow numpy
              </div>
            </div>
          `
        },
        {
          label: '2. Algoritma Bit LSB',
          html: `
            <div class="modal-section">
              <h4>02. Mekanisme Least Significant Bit (LSB)</h4>
              <p>Pesan rahasia dikonversi menjadi urutan bit biner, lalu disisipkan secara halus pada bit terakhir (paling tidak signifikan) dari setiap piksel RGB gambar penampung sehingga mata manusia tidak menyadari perubahan visual.</p>
            </div>
          `
        },
        {
          label: '3. Encode & Decode',
          html: `
            <div class="modal-section">
              <h4>03. Pengujian Sisip dan Ekstraksi Pesan</h4>
              <p>Jalankan perintah encode untuk menyisipkan teks rahasia ke gambar PNG, lalu jalankan perintah decode pada gambar tersebut untuk mengekstrak kembali pesan rahasia secara akurat.</p>
            </div>
          `
        }
      ]
    },
    'desktop-gui': {
      tag: 'TUTORIAL CARA MEMBUAT • DESKTOP GUI SYSTEMS',
      title: 'Aplikasi Desktop GUI Interaktif & Manajemen Form',
      repoUrl: 'https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop',
      steps: [
        {
          label: '1. Setup Proyek Desktop',
          html: `
            <div class="modal-section">
              <h4>01. Kloning &amp; Buka di IDE Desktop</h4>
              <p>Unduh proyek dan buka dalam lingkungan pengembangan desktop pilihan (seperti Visual Studio / NetBeans / PySide sesuai bahasa implementasi native).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/tugas1-pemrograman-desktop.git
              </div>
            </div>
          `
        },
        {
          label: '2. Event-Driven GUI Logic',
          html: `
            <div class="modal-section">
              <h4>02. Penghubungan Event Listener &amp; Form Handling</h4>
              <p>Pelajari bagaimana setiap penekanan tombol, pengisian form, dan aksi antarmuka dikaitkan langsung dengan fungsi logika penghitungan sistem berkinerja cepat tanpa jeda.</p>
            </div>
          `
        }
      ]
    },
    'crud-kampus': {
      tag: 'TUTORIAL CARA MEMBUAT • REST API BACKEND SYSTEM',
      title: 'Sistem CRUD & REST API Manajemen Akademik Kampus',
      repoUrl: 'https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple',
      steps: [
        {
          label: '1. Kloning & Dependensi',
          html: `
            <div class="modal-section">
              <h4>01. Persiapan Backend &amp; Koneksi SQL</h4>
              <p>Unduh proyek backend dan siapkan koneksi database lokal untuk memvalidasi operasi Create, Read, Update, dan Delete.</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/CRUD-Kampus-Simple.git
              </div>
            </div>
          `
        },
        {
          label: '2. Uji REST API dengan cURL / Postman',
          html: `
            <div class="modal-section">
              <h4>02. Audit Response Endpoint API</h4>
              <p>Lakukan request ke endpoint HTTP yang disediakan untuk memastikan setiap operasi mengembalikan format JSON yang bersih dengan penanganan status code HTTP 200, 201, 400, atau 404 yang tepat.</p>
            </div>
          `
        }
      ]
    },
    'pawf-mvc': {
      tag: 'TUTORIAL CARA MEMBUAT • WEB FRAMEWORK ARCHITECTURE',
      title: 'Arsitektur Web Framework MVC (PAWF)',
      repoUrl: 'https://github.com/wahyunoerrahmat/pawf',
      steps: [
        {
          label: '1. Struktur Arsitektur MVC',
          html: `
            <div class="modal-section">
              <h4>01. Memahami Pemisahan Model, View, &amp; Controller</h4>
              <p>Kloning dan tinjau struktur direktori framework yang memisahkan lapisan akses data (Model), lapisan antarmuka pengguna (View), dan lapisan pengatur alur logika (Controller).</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone https://github.com/wahyunoerrahmat/pawf.git">Salin Perintah</button></div>
                git clone https://github.com/wahyunoerrahmat/pawf.git
              </div>
            </div>
          `
        },
        {
          label: '2. Dynamic Routing Engine',
          html: `
            <div class="modal-section">
              <h4>02. Alur Dispatcher &amp; Middleware Router</h4>
              <p>Pelajari bagaimana URL request masuk dipetakan oleh router engine menuju kelas controller yang bersesuaian secara efisien.</p>
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
          <div class="modal-repo-banner">
            <span>Pelajari seluruh struktur kode sumber secara langsung di GitHub:</span>
            <a href="${data.repoUrl}" target="_blank" class="btn-tutorial" style="text-decoration:none; display:inline-flex; width:auto; padding:0.6rem 1.2rem;">
              <span>⭐ Buka Repositori di GitHub</span>
              <span style="margin-left:0.4rem;">↗</span>
            </a>
          </div>
        `;
      }

      modalBody.innerHTML = navHtml + panesHtml;

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
      modalBody.innerHTML = data.content || '<p>Detail panduan untuk proyek ini tersedia langsung di repositori GitHub.</p>';
    }

    modalBody.querySelectorAll('.btn-copy-code').forEach(copyBtn => {
      copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.innerText = '✅ Disalin!';
          copyBtn.style.background = '#38bdf8';
          copyBtn.style.color = '#000';
          setTimeout(() => {
            copyBtn.innerText = 'Salin Perintah';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        });
      });
    });
  }

  document.querySelectorAll('.btn-tutorial').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-tutorial');
      const data = tutorialsData[key] || {
        tag: 'TUTORIAL CARA MEMBUAT PROYEK',
        title: 'Panduan & Eksplorasi Proyek Open Source',
        repoUrl: 'https://github.com/wahyunoerrahmat',
        steps: [
          {
            label: '1. Akses Repositori',
            html: `
              <div class="modal-section">
                <h4>01. Eksplorasi Kode Sumber di GitHub</h4>
                <p>Proyek publik ini tersedia langsung pada akun GitHub resmi Wahyu Noer Rahmat (@wahyunoerrahmat). Anda dapat mengunduh atau meninjau struktur kodenya secara langsung.</p>
              </div>
            `
          }
        ]
      };

      renderTutorialWizard(data);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
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
 * 7. Live GitHub Repositories Auto-Sync
 */
async function initLiveGitHubRepositories() {
  const grid = document.getElementById('githubReposGrid');
  if (!grid) return;

  try {
    const res = await fetch('https://api.github.com/users/wahyunoerrahmat/repos?sort=updated&per_page=30');
    if (!res.ok) return;
    const repos = await res.json();

    const existingLinks = new Set();
    grid.querySelectorAll('a.btn-github-link').forEach(a => {
      existingLinks.add(a.getAttribute('href')?.toLowerCase());
    });

    repos.forEach(repo => {
      if (repo.private || repo.name === 'wahyunoerrahmat.github.io') return;
      if (existingLinks.has(repo.html_url.toLowerCase())) return;

      const lang = repo.language || 'Code';
      let category = 'web';
      let catPillClass = 'cat-web';
      let catLabel = `${lang.toUpperCase()} · OPEN SOURCE REPO`;

      const nameLow = repo.name.toLowerCase();
      if (nameLow.includes('ai') || nameLow.includes('kmeans') || nameLow.includes('citra') || nameLow.includes('data')) {
        category = 'ai';
        catPillClass = 'cat-ai';
        catLabel = `${lang.toUpperCase()} · AI & DATA SCIENCE`;
      } else if (nameLow.includes('desktop') || nameLow.includes('gui')) {
        category = 'desktop';
        catPillClass = 'cat-desktop';
        catLabel = `${lang.toUpperCase()} · DESKTOP SYSTEMS`;
      } else if (nameLow.includes('devops') || nameLow.includes('docker') || nameLow.includes('learn')) {
        category = 'devops';
        catPillClass = 'cat-devops';
        catLabel = `${lang.toUpperCase()} · DEVOPS & PIPELINE`;
      }

      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', category);
      card.innerHTML = `
        <div class="project-card-header">
          <div class="header-badges">
            <span class="cat-pill ${catPillClass}">${catLabel}</span>
            <span class="status-pill">Live GitHub</span>
          </div>
          <h3 class="project-title">${repo.name}</h3>
        </div>
        
        <div class="project-card-body">
          <p class="project-summary">
            ${repo.description || 'Repositori open-source publik resmi yang dikembangkan oleh Wahyu Noer Rahmat dengan teknologi utama <strong>' + lang + '</strong>.'}
          </p>

          <div class="project-specs">
            <div class="spec-item">
              <span class="spec-label">Bahasa Utama</span>
              <span class="spec-value">${lang}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Aktivitas GitHub</span>
              <span class="spec-value">${repo.stargazers_count} ⭐ Stars · ${repo.forks_count} 🍴 Forks</span>
            </div>
          </div>

          <div class="project-tags">
            <span class="tag">#${lang}</span>
            <span class="tag">#OpenSource</span>
            <span class="tag">#GitHubPublic</span>
          </div>
        </div>

        <div class="project-card-footer">
          <button class="btn-tutorial" data-dynamic-repo="${repo.name}">
            <span class="btn-icon">📖</span>
            <span>Pelajari &amp; Tutorial Step-by-Step</span>
          </button>
          <a href="${repo.html_url}" target="_blank" class="btn-github-link" aria-label="Buka Repositori ${repo.name} di GitHub">
            <span>⭐ GitHub</span>
            <span class="arrow">↗</span>
          </a>
        </div>
      `;

      grid.appendChild(card);

      const btn = card.querySelector('.btn-tutorial');
      btn.addEventListener('click', () => {
        const modal = document.getElementById('caseModal');
        const modalTag = document.getElementById('modalTag');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTag.innerText = 'TUTORIAL CARA MEMBUAT • ' + lang.toUpperCase();
        modalTitle.innerText = repo.name;

        modalBody.innerHTML = `
          <div class="tutorial-wizard-tabs">
            <button class="tutorial-step-btn active" data-step-index="0">1. Persiapan &amp; Kloning</button>
            <button class="tutorial-step-btn" data-step-index="1">2. Struktur Kode ${lang}</button>
            <button class="tutorial-step-btn" data-step-index="2">3. Eksekusi &amp; Pengujian</button>
          </div>
          
          <div class="tutorial-step-pane active" id="stepPane_0">
            <div class="modal-section">
              <h4>01. Kloning Repositori GitHub</h4>
              <p>Unduh kode sumber langsung dari akun GitHub resmi Wahyu Noer Rahmat menggunakan perintah terminal berikut:</p>
              <div class="tutorial-code-box">
                <div class="tutorial-code-header"><span>Terminal Command</span><button class="btn-copy-code" data-copy="git clone ${repo.html_url}.git&#10;cd ${repo.name}">Salin Perintah</button></div>
                git clone ${repo.html_url}.git<br>
                cd ${repo.name}
              </div>
            </div>
          </div>

          <div class="tutorial-step-pane" id="stepPane_1">
            <div class="modal-section">
              <h4>02. Analisis Arsitektur Proyek (${lang})</h4>
              <p>Proyek <strong>${repo.name}</strong> dikembangkan dengan bahasa pemrograman utama <strong>${lang}</strong>. Tinjau berkas utama di dalam direktori proyek untuk menelusuri alur logika dan abstraksi sistem.</p>
              <div class="tutorial-tip">💡 <strong>Tips Eksplorasi:</strong> Periksa berkas <code>README.md</code> pada direktori akar repositori untuk melihat catatan instalasi spesifik dari proyek ini.</div>
            </div>
          </div>

          <div class="tutorial-step-pane" id="stepPane_2">
            <div class="modal-section">
              <h4>03. Menjalankan &amp; Verifikasi Sistem</h4>
              <p>Jalankan aplikasi di lingkungan pengembangan lokal Anda sesuai standar eksekusi bahasa <strong>${lang}</strong>, dan lakukan pengujian fungsionalitas sistem.</p>
            </div>
          </div>

          <div class="modal-repo-banner">
            <span>Pelajari seluruh struktur kode sumber secara langsung di GitHub:</span>
            <a href="${repo.html_url}" target="_blank" class="btn-tutorial" style="text-decoration:none; display:inline-flex; width:auto; padding:0.6rem 1.2rem;">
              <span>⭐ Buka Repositori ${repo.name}</span>
              <span style="margin-left:0.4rem;">↗</span>
            </a>
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
              copyBtn.style.background = '#38bdf8';
              copyBtn.style.color = '#000';
              setTimeout(() => {
                copyBtn.innerText = 'Salin Perintah';
                copyBtn.style.background = '';
                copyBtn.style.color = '';
              }, 2000);
            });
          });
        });

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    initProjectFilters();
  } catch (err) {
    console.warn('GitHub API offline fallback active:', err);
  }
}

/**
 * 8. Copy Email Action
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-copy') || 'wahyunoerrahmat@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Alamat email berhasil disalin ke papan klip!');
      copyBtn.innerText = '✅ Disalin!';
      setTimeout(() => { copyBtn.innerText = 'Salin Email'; }, 2500);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

/**
 * 9. Interactive Contact Form Simulator
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⚡ Mengirim Pesan...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Pesan Anda berhasil dikirim! Saya akan segera merespons pesan Anda.');
    }, 1100);
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
    <span style="font-size: 1.25rem;">✅</span>
    <div>
      <strong style="display:block; font-size:0.92rem; color:#fff;">Berhasil!</strong>
      <span style="font-size:0.85rem; color:#a1a1aa;">${message}</span>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
