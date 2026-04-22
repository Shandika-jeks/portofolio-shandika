/* ============================================
   Article Page JavaScript
   ============================================ */

/* ---- Theme Toggle ---- */
function initTheme() {
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}
initTheme();

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('blog-theme', next);
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ---- Hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/* ---- Reading Progress Bar ---- */
const progressBar = document.getElementById('readingProgressBar');
const articleBody = document.getElementById('articleBody');

function updateProgress() {
    if (!articleBody) return;

    const articleTop = articleBody.offsetTop;
    const articleHeight = articleBody.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    const start = articleTop;
    const end = articleTop + articleHeight - windowHeight;
    const progress = Math.min(Math.max((scrollTop - start) / (end - start), 0), 1);

    progressBar.style.width = (progress * 100) + '%';
}

window.addEventListener('scroll', updateProgress);
updateProgress();

/* ---- Table of Contents Active Tracking ---- */
const tocLinks = document.querySelectorAll('.toc-link');
const contentSections = document.querySelectorAll('.content-section');

function updateTOC() {
    let current = '';

    contentSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateTOC);

/* ---- Smooth Scroll for TOC Links ---- */
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

/* ---- Share Buttons ---- */
const shareTwitterBtn = document.getElementById('shareTwitter');
const shareFacebookBtn = document.getElementById('shareFacebook');
const shareCopyBtn = document.getElementById('shareCopy');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

if (shareTwitterBtn) {
    shareTwitterBtn.addEventListener('click', () => {
        const text = encodeURIComponent(document.title);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
    });
}

if (shareFacebookBtn) {
    shareFacebookBtn.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
    });
}

if (shareCopyBtn) {
    shareCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('🔗 Link berhasil disalin!');
        }).catch(() => {
            showToast('Gagal menyalin link');
        });
    });
}

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---- Scroll Reveal for Article Elements ---- */
function initArticleReveal() {
    const revealElements = document.querySelectorAll(
        '.info-card, .character-card, .philosophy-card, .stat-card, .timeline-item, .highlight-box, .cta-box, .author-box, .related-card, .article-figure'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initArticleReveal);

/* ---- Smooth Scroll for Anchor Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
