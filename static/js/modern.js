// Modern Portfolio JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initSmoothScrolling();
    initSkillAnimations();
    initModal();
    initBackToTop();
    initIntersectionObservers();
    initButtonHoverEffects();
    initParallaxEffects();
    initLanguageToggle();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading progress
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
}

// Navigation
function initNavigation() {
    console.log('Navigation initialized');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Theme Toggle
function initThemeToggle() {
    console.log('Theme toggle initialized');
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.setAttribute('data-theme', 'dark');
    }
    
    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add transition class for smooth change
            html.classList.add('theme-transition');
            setTimeout(() => {
                html.classList.remove('theme-transition');
            }, 300);
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    console.log('Smooth scrolling initialized');
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Skill Animations
function initSkillAnimations() {
    console.log('Skill animations initialized');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Modal for QR Codes
function initModal() {
    console.log('Modal initialized');
    const modal = document.getElementById('qr-modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalClose = modal.querySelector('.modal-close');
    
    // Function to open modal with image
    window.pop = function(imageSrc) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Back to Top Button
function initBackToTop() {
    console.log('Back to top initialized');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observers for Animations
function initIntersectionObservers() {
    console.log('Intersection observers initialized');
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .funfact, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Button Hover Effects
function initButtonHoverEffects() {
    console.log('Button hover effects initialized');
    const buttons = document.querySelectorAll('.btn[data-hover]');
    
    buttons.forEach(button => {
        const text = button.querySelector('span');
        if (!text) return;
        
        // Create hover text element if not exists
        if (!button.querySelector('.hover-text')) {
            const hoverText = document.createElement('span');
            hoverText.className = 'hover-text';
            hoverText.textContent = button.getAttribute('data-hover');
            button.appendChild(hoverText);
        }
        
        // Add hover event
        button.addEventListener('mouseenter', function() {
            text.style.transform = 'translateY(-100%)';
        });
        
        button.addEventListener('mouseleave', function() {
            text.style.transform = 'translateY(0)';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    console.log('Parallax effects initialized');
    const parallaxElements = document.querySelectorAll('.gradient-blob');
    
    // Increased parallax strength
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach((blob, index) => {
            const speed = 0.05 + (index * 0.03); // Increased strength
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add smooth follow on mouse leave
    window.addEventListener('mouseleave', function() {
        parallaxElements.forEach(blob => {
            blob.style.transition = 'transform 1s ease-out';
            blob.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                blob.style.transition = '';
            }, 1000);
        });
    });
    
    window.addEventListener('mouseenter', function() {
        parallaxElements.forEach(blob => {
            blob.style.transition = 'transform 0.3s ease-out';
        });
    });
}

// AI-Personalized Visuals
function initAIVisuals() {
    // Time-based theme variations
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    // Morning (6am-12pm): Bright gradients
    if (hour >= 6 && hour < 12) {
        root.style.setProperty('--primary', '#4F46E5');
        root.style.setProperty('--secondary', '#EC4899');
    }
    // Afternoon (12pm-6pm): Vibrant gradients
    else if (hour >= 12 && hour < 18) {
        root.style.setProperty('--primary', '#06B6D4');
        root.style.setProperty('--secondary', '#3B82F6');
    }
    // Evening (6pm-10pm): Warm gradients
    else if (hour >= 18 && hour < 22) {
        root.style.setProperty('--primary', '#8B5CF6');
        root.style.setProperty('--secondary', '#F59E0B');
    }
    // Night (10pm-6am): Deep gradients
    else {
        root.style.setProperty('--primary', '#6366F1');
        root.style.setProperty('--secondary', '#8B5CF6');
    }
    
    // Random accent color on each visit
    const accents = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const randomAccent = accents[Math.floor(Math.random() * accents.length)];
    root.style.setProperty('--accent', randomAccent);
}

// Initialize AI visuals after a delay
setTimeout(initAIVisuals, 1000);

// Language Toggle
function initLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    if (!langToggle) return;
    
    // Translations mapping
    const translations = {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.projects': 'Projects',
            'nav.skills': 'Skills',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            // Hero
            'hero.hello': 'Hello, I\'m',
            'hero.name': 'Jack Xu',
            'hero.title': 'Student & Developer',
            'hero.description': 'A mentally healthy secondary student from Hong Kong SAR, passionate about coding, table tennis, and creative writing. Building the future one line of code at a time.',
            'hero.stats.projects': 'Projects',
            'hero.stats.experience': 'Years Experience',
            'hero.stats.contributions': 'GitHub Contributions',
            'hero.stats.skills': 'Skills',
            'hero.stats.creativity': 'Creativity',
            // Projects
            'projects.title': 'Featured Projects',
            'projects.badge': '💻 My Work',
            'projects.subtitle': 'A collection of my latest work and experiments',
            'projects.filter.all': 'All',
            'projects.filter.web': 'Web Dev',
            'projects.filter.ai': 'AI/ML',
            'projects.filter.tools': 'Tools',
            'projects.filter.other': 'Other',
            'projects.category.sites': '🚀 Sites & Platforms',
            'projects.category.tools': 'Tools & Utilities',
            'projects.category.coding': '👨‍💻 Coding Projects',
            'project.blog.title': 'Personal Blog',
            'project.blog.desc': 'Thoughts, tutorials, and technical writings',
            'project.drive.title': 'Cloud Drive',
            'project.drive.desc': 'Secure file storage and sharing platform',
            'project.lab.title': 'Cloud Lab',
            'project.lab.desc': 'Collection of experimental web projects',
            'project.mcrt.title': 'Minecraft RT',
            'project.mcrt.desc': 'Real-time ray tracing for Minecraft',
            'project.placeholder.title': 'Coming Soon',
            'project.placeholder.desc': 'Something amazing in the works',
            // Skills
            'skills.title': 'Skills & Proficiencies',
            'skills.subtitle': 'Continuous learning and skill development',
            'skills.badge': '🎯 Expertise',
            'skills.category.academic': '📚 Academic Skills',
            'skills.category.programming': '💻 Programming Skills',
            'skills.category.other': '🌟 Other Skills',
            'skill.frontend': 'Frontend',
            'skill.backend': 'Backend',
            'skill.devops': 'DevOps',
            'skill.design': 'Design',
            // About
            'about.title': 'Beyond the Code',
            'about.badge': '🧠 About Me',
            'about.subtitle': 'Get to know the person behind the projects',
            'about.description': 'A secondary student from Hong Kong passionate about technology, creativity, and pushing boundaries, whether it\'s mastering a new programming language or crafting compelling narratives. I believe in building things that matter.',
            'about.interests': 'Interests',
            'about.interests.list': 'Table Tennis • Creative Writing • Minecraft • Photography',
            // Contact
            'contact.title': 'Let\'s Connect',
            'contact.subtitle': 'Feel free to reach out for collaboration or just to say hello',
            'contact.badge': '📬 Get In Touch',
            'contact.card.email.title': 'Email',
            'contact.card.email.desc': 'For direct inquiries',
            'contact.card.location.title': 'Location',
            'contact.card.social.title': 'Social Media',
            'contact.card.github.title': 'GitHub',
            'contact.card.github.desc': 'Code and projects',
            'contact.card.instagram.title': 'Instagram',
            'contact.card.instagram.desc': 'Daily life and updates',
            'contact.card.whatsapp.title': 'WhatsApp',
            'contact.card.whatsapp.desc': 'Quick chat',
            'contact.qr.title': 'Scan QR Code',
            'contact.qr.desc': 'Connect instantly via mobile',
            // Footer
            'footer.copyright': '© 2024 Jack Xu. All rights reserved.',
            'footer.made': 'Made with ❤️ in Hong Kong SAR'
        },
        zh: {
            // Navigation
            'nav.home': '主頁',
            'nav.projects': '項目',
            'nav.skills': '技能',
            'nav.about': '關於',
            'nav.contact': '聯絡',
            // Hero
            'hero.hello': '你好，我是',
            'hero.name': 'Jack Xu',
            'hero.title': '學生與開發者',
            'hero.description': '來自香港特別行政區的心理健康中學生，熱衷於編程、乒乓球和創意寫作。用一行行代碼構建未來。',
            'hero.stats.projects': '項目',
            'hero.stats.experience': '年經驗',
            'hero.stats.contributions': 'GitHub貢獻',
            'hero.stats.skills': '技能',
            'hero.stats.creativity': '創意',
            // Projects
            'projects.title': '精選項目',
            'projects.badge': '💻 我的作品',
            'projects.subtitle': '我的最新作品與實驗集合',
            'projects.filter.all': '全部',
            'projects.filter.web': '網頁開發',
            'projects.filter.ai': '人工智能',
            'projects.filter.tools': '工具',
            'projects.filter.other': '其他',
            'projects.category.sites': '🚀 網站與平台',
            'projects.category.tools': '工具與實用程序',
            'projects.category.coding': '👨‍💻 編程項目',
            'project.blog.title': '個人網誌',
            'project.blog.desc': '想法、教程與技術文章',
            'project.drive.title': '雲端硬碟',
            'project.drive.desc': '安全檔案存儲與分享平台',
            'project.lab.title': '雲端實驗室',
            'project.lab.desc': '實驗性網頁項目集合',
            'project.mcrt.title': 'Minecraft RT',
            'project.mcrt.desc': 'Minecraft實時光線追蹤',
            'project.placeholder.title': '即將推出',
            'project.placeholder.desc': '精彩內容籌備中',
            // Skills
            'skills.title': '技能與熟練度',
            'skills.subtitle': '持續學習與技能發展',
            'skills.badge': '🎯 專業領域',
            'skills.category.academic': '📚 學術技能',
            'skills.category.programming': '💻 編程技能',
            'skills.category.other': '🌟 其他技能',
            'skill.frontend': '前端',
            'skill.backend': '後端',
            'skill.devops': 'DevOps',
            'skill.design': '設計',
            // About
            'about.title': '超越代碼',
            'about.badge': '🧠 關於我',
            'about.subtitle': '了解項目背後的人',
            'about.description': '來自香港的中學生，熱衷於科技、創意和突破界限，無論是掌握新編程語言還是創作引人入勝的敘事。我相信構建有意義的事物。',
            'about.interests': '興趣愛好',
            'about.interests.list': '乒乓球 • 創意寫作 • Minecraft • 攝影',
            // Contact
            'contact.title': '保持聯絡',
            'contact.subtitle': '隨時聯繫合作或只是打個招呼',
            'contact.badge': '📬 保持聯絡',
            'contact.card.email.title': '電郵',
            'contact.card.email.desc': '直接查詢',
            'contact.card.location.title': '位置',
            'contact.card.social.title': '社交媒體',
            'contact.card.github.title': 'GitHub',
            'contact.card.github.desc': '代碼與項目',
            'contact.card.instagram.title': 'Instagram',
            'contact.card.instagram.desc': '日常生活與更新',
            'contact.card.whatsapp.title': 'WhatsApp',
            'contact.card.whatsapp.desc': '快速聊天',
            'contact.qr.title': '掃描二維碼',
            'contact.qr.desc': '透過手機即時連接',
            // Footer
            'footer.copyright': '© 2024 Jack Xu。保留所有權利。',
            'footer.made': '於香港特別行政區以 ❤️ 製作'
        }
    };
    
    // Current language
    let currentLang = localStorage.getItem('language') || 'en';
    console.log('Language toggle initialized, current language:', currentLang);
    
    // Apply translation function
    function translate(lang) {
        const langData = translations[lang];
        if (!langData) return;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
        
        // Update button text
        if (langToggle) {
            const langText = langToggle.querySelector('.lang-text');
            if (langText) {
                langText.textContent = lang === 'en' ? 'EN' : '中文';
            }
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-HK';
        
        // Save preference
        localStorage.setItem('language', lang);
        currentLang = lang;
    }
    
    // Toggle language
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        translate(newLang);
    });
    
    // Initial translation
    translate(currentLang);
}

// Window load event
window.addEventListener('load', function() {
    // Update loading screen if still visible
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('loaded')) {
        loadingScreen.classList.add('loaded');
    }
    
    // Initialize any lazy-loaded images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
    });
    
    observer.observe({ entryTypes: ['measure'] });
}