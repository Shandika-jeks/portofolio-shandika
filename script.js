/* ============================================
   Blog Data & Configuration
   ============================================ */

const articlesData = [
    {
        id: 1,
        title: "Memahami Async/Await di JavaScript: Panduan Lengkap",
        excerpt: "Pelajari cara menggunakan async/await untuk menulis kode asynchronous yang lebih bersih dan mudah dipahami di JavaScript modern.",
        category: "programming",
        date: "21 April 2026",
        readTime: "6 min",
        icon: "⚡"
    },
    {
        id: 2,
        title: "Tren Desain Web 2026: Glassmorphism hingga 3D Elements",
        excerpt: "Eksplorasi tren desain web terbaru yang mendominasi tahun 2026, dari glassmorphism hingga penggunaan elemen 3D interaktif.",
        category: "desain",
        date: "19 April 2026",
        readTime: "5 min",
        icon: "🎨"
    },
    {
        id: 3,
        title: "Docker untuk Pemula: Containerization Made Easy",
        excerpt: "Panduan step-by-step memulai Docker untuk deployment aplikasi modern. Dari konsep dasar hingga docker-compose.",
        category: "teknologi",
        date: "17 April 2026",
        readTime: "9 min",
        icon: "🐳"
    },
    {
        id: 4,
        title: "Produktivitas Developer: Kebiasaan yang Mengubah Segalanya",
        excerpt: "Tips dan kebiasaan yang terbukti meningkatkan produktivitas sebagai software developer dalam keseharianmu.",
        category: "lifestyle",
        date: "15 April 2026",
        readTime: "4 min",
        icon: "🎯"
    },
    {
        id: 5,
        title: "Laravel 12: Fitur Baru yang Wajib Dicoba",
        excerpt: "Review mendalam fitur-fitur terbaru di Laravel 12 yang memudahkan pengembangan aplikasi web modern.",
        category: "programming",
        date: "13 April 2026",
        readTime: "7 min",
        icon: "🔥"
    },
    {
        id: 6,
        title: "Membangun Karir di Tech: Dari Junior ke Senior",
        excerpt: "Roadmap lengkap untuk membangun karir di industri teknologi, dari posisi junior hingga senior developer.",
        category: "karir",
        date: "11 April 2026",
        readTime: "8 min",
        icon: "🚀"
    },
    {
        id: 7,
        title: "Vue.js 4 vs React 20: Perbandingan Lengkap",
        excerpt: "Analisis mendalam perbandingan dua framework frontend populer untuk membantu memilih yang tepat untuk proyekmu.",
        category: "programming",
        date: "9 April 2026",
        readTime: "10 min",
        icon: "⚔️"
    },
    {
        id: 8,
        title: "Color Theory untuk Developer: Memilih Palette yang Tepat",
        excerpt: "Panduan praktis memahami teori warna dan cara memilih color palette yang harmonis untuk proyek webmu.",
        category: "desain",
        date: "7 April 2026",
        readTime: "5 min",
        icon: "🌈"
    },
    {
        id: 9,
        title: "Kubernetes 101: Orchestration untuk Production",
        excerpt: "Kenali Kubernetes dari dasar dan pelajari cara mengelola container di lingkungan production dengan efisien.",
        category: "teknologi",
        date: "5 April 2026",
        readTime: "11 min",
        icon: "☸️"
    },
    {
        id: 10,
        title: "Work-Life Balance di Era Digital",
        excerpt: "Strategi menjaga keseimbangan antara pekerjaan dan kehidupan pribadi sebagai pekerja di industri teknologi.",
        category: "lifestyle",
        date: "3 April 2026",
        readTime: "4 min",
        icon: "⚖️"
    },
    {
        id: 11,
        title: "Freelancing Tips: Memulai Bisnis Sebagai Developer",
        excerpt: "Panduan lengkap memulai perjalanan freelancing sebagai developer, dari pricing hingga manajemen klien.",
        category: "karir",
        date: "1 April 2026",
        readTime: "7 min",
        icon: "💼"
    },
    {
        id: 12,
        title: "Progressive Web Apps (PWA): The Future of Mobile",
        excerpt: "Mengapa PWA menjadi masa depan pengembangan aplikasi mobile dan bagaimana cara membuatnya.",
        category: "teknologi",
        date: "30 Maret 2026",
        readTime: "6 min",
        icon: "📱"
    }
];

/* ============================================
   DOM Elements
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const filterTabs = document.getElementById('filterTabs');
const articlesGrid = document.getElementById('articlesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTop = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

/* ============================================
   State
   ============================================ */
let currentFilter = 'all';
let visibleCount = 6;

/* ============================================
   Theme Toggle
   ============================================ */
function initTheme() {
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('blog-theme', next);
});

initTheme();

/* ============================================
   Navbar Scroll Effect
   ============================================ */
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;
});

/* ============================================
   Mobile Menu
   ============================================ */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/* ============================================
   Active Nav Link on Scroll
   ============================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

/* ============================================
   Search Overlay
   ============================================ */
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 300);
});

searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">Ketik untuk mulai mencari...</p>';
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchOverlay.classList.remove('active');
    }
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        searchResults.innerHTML = '<p class="search-hint">Ketik untuk mulai mencari...</p>';
        return;
    }

    const results = articlesData.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-hint">Tidak ada hasil ditemukan 😔</p>';
        return;
    }

    searchResults.innerHTML = results.map(article => `
        <div class="search-result-item" onclick="scrollToArticles()">
            <h4>${highlightText(article.title, query)}</h4>
            <p>${article.category} · ${article.date} · ${article.readTime} baca</p>
        </div>
    `).join('');
});

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--accent-1)">$1</strong>');
}

function scrollToArticles() {
    searchOverlay.classList.remove('active');
    document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   Render Articles
   ============================================ */
function renderArticles() {
    const filtered = currentFilter === 'all'
        ? articlesData
        : articlesData.filter(a => a.category === currentFilter);

    const toShow = filtered.slice(0, visibleCount);

    articlesGrid.innerHTML = toShow.map((article, index) => `
        <article class="article-card" style="animation-delay: ${index * 0.08}s" id="article-${article.id}">
            <div class="article-card-img">
                <div class="article-img-placeholder">${article.icon}</div>
                <span class="article-card-category">${capitalize(article.category)}</span>
            </div>
            <div class="article-card-body">
                <div class="article-card-meta">
                    <span>${article.date}</span>
                    <span>${article.readTime} baca</span>
                </div>
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-excerpt">${article.excerpt}</p>
                <div class="article-card-footer">
                    <div class="article-author">
                        <div class="author-avatar">S</div>
                        <span class="author-name">Shandika</span>
                    </div>
                    <span class="article-read-more">
                        Baca
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </span>
                </div>
            </div>
        </article>
    `).join('');

    // Show/hide Load More button
    if (toShow.length >= filtered.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ============================================
   Filter Tabs
   ============================================ */
filterTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        visibleCount = 6;
        renderArticles();
    }
});

/* ============================================
   Load More
   ============================================ */
loadMoreBtn.addEventListener('click', () => {
    visibleCount += 6;
    renderArticles();
});

/* ============================================
   Stats Counter Animation
   ============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

/* ============================================
   Scroll Reveal Animation
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .featured-main, .featured-side-card, .category-card, .newsletter-card, .about-grid, .contact-form, .contact-info-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================================
   Hero Counter Trigger
   ============================================ */
let counterAnimated = false;

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

/* ============================================
   Back to Top
   ============================================ */
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   Toast Notification
   ============================================ */
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ============================================
   Newsletter Form
   ============================================ */
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
        showToast('🎉 Berhasil subscribe! Terima kasih!');
        newsletterForm.reset();
    }
});

/* ============================================
   Contact Form
   ============================================ */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✉️ Pesan terkirim! Akan segera saya balas.');
    contactForm.reset();
});

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   Initialize
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    initScrollReveal();
});
