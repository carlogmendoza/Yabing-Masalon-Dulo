// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -6px)' 
                : 'none';
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Background music toggle
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('background-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
                musicBtn.style.opacity = '0.7';
            } else {
                bgMusic.play();
                musicBtn.innerHTML = '<span class="music-icon">🔊</span>';
                musicBtn.style.opacity = '1';
            }
            isPlaying = !isPlaying;
        });
    }

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Set initial position
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        };

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                moveToSlide(slides[currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1], slides[currentIndex]);
            });
        }

        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(slides[(currentIndex + 1) % slides.length], slides[currentIndex]);
            });
        }

        // Auto-play carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(slides[currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1], slides[currentIndex]);
        }, 5000);
    }

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Observe cards
    const cards = document.querySelectorAll('.award-box, .achievement-box, .impact-box, .impact-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Gallery item hover effects
    galleryItems.forEach(item => {
        const imageContainer = item.querySelector('.gallery-image-container');
        const galleryInfo = item.querySelector('.gallery-info');
        
        if (imageContainer && galleryInfo) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });

    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(101, 67, 33, 0.98) 0%, rgba(139, 69, 19, 0.98) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--dark-brown) 0%, var(--primary-brown) 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Scroll indicator hide on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Counter animation for numbers (if needed)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Interactive timeline markers
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach((marker, index) => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.5)';
            this.style.boxShadow = '0 0 20px var(--golden)';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Testimonial or quote rotation (if implemented)
    const quotes = [
        "Through every thread, a story is woven.",
        "Culture is not inherited; it is preserved through dedication.",
        "The hands that weave also teach, and the patterns never die."
    ];

    // Random background pattern generation for decorative elements
    function createPatternAnimation() {
        const patterns = document.querySelectorAll('.pattern-element');
        patterns.forEach((pattern, index) => {
            setTimeout(() => {
                pattern.style.animation = `float ${3 + index}s ease-in-out infinite`;
            }, index * 200);
        });
    }

    // Typing effect for quotes (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Gallery filter functionality (if categories are added)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal functionality for gallery images (optional)
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('.modal-image');
        const modalCaption = modal.querySelector('.modal-caption');
        const closeBtn = modal.querySelector('.modal-close');

        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const description = item.querySelector('.gallery-description');
            
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    modal.style.display = 'flex';
                    modalImg.src = this.src;
                    if (description) {
                        modalCaption.textContent = description.textContent;
                    }
                    document.body.style.overflow = 'hidden';
                });
            }
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Preloader (optional)
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // Initialize all functions
    hidePreloader();
    createPatternAnimation();

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--golden);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--primary-brown)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--golden)';
    });

    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️';
    printBtn.className = 'print-btn';
    printBtn.title = 'Print this page';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 170px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--earth-tone);
        color: white;
        border: none;
        font-size: 1.3rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(printBtn);

    printBtn.addEventListener('click', function() {
        window.print();
    });

    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Log page load time for performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });

    // Easter egg: Konami code (optional fun feature)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = 'none';
                    konamiIndex = 0;
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Advanced Gallery Modal with Navigation
    createAdvancedModal();

    // Text animation on scroll
    animateTextOnScroll();

    // Interactive pattern generator (decorative)
    createInteractivePatterns();

    // Testimonial rotation
    rotateTestimonials();

    // Share functionality
    addShareButtons();

    // Accessibility improvements
    enhanceAccessibility();

    console.log('🧶 Yabing Masalon Dulo Exhibit - Interactive Experience Loaded');
    console.log('Preserving culture, one thread at a time...');
});

// Advanced Modal with Image Navigation
function createAdvancedModal() {
    const modal = document.createElement('div');
    modal.className = 'advanced-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <button class="modal-prev" aria-label="Previous image">‹</button>
            <button class="modal-next" aria-label="Next image">›</button>
            <div class="modal-image-wrapper">
                <img class="modal-main-image" src="" alt="">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    <span class="modal-year"></span>
                </div>
            </div>
            <div class="modal-counter"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
    let currentImageIndex = 0;

    const modalImg = modal.querySelector('.modal-main-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalYear = modal.querySelector('.modal-year');
    const modalCounter = modal.querySelector('.modal-counter');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    function openModal(index) {
        currentImageIndex = index;
        updateModalContent();
        modal.style.display = 'flex';
        modal.querySelector('.modal-container').style.animation = 'modalZoomIn 0.4s ease';
        document.body.style.overflow = 'hidden';
    }

    function updateModalContent() {
        const item = galleryImages[currentImageIndex];
        const img = item.querySelector('.gallery-image-container img');
        const title = item.querySelector('.gallery-info h3');
        const description = item.querySelector('.gallery-description');
        const year = item.querySelector('.gallery-year');

        if (img) modalImg.src = img.src;
        if (title) modalTitle.textContent = title.textContent;
        if (description) modalDescription.textContent = description.textContent;
        if (year) modalYear.textContent = year.textContent;
        
        modalCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImg.style.animation = 'slideInRight 0.5s ease';
        setTimeout(() => {
            modalImg.style.animation = '';
            updateModalContent();
        }, 500);
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.style.animation = 'slideInLeft 0.5s ease';
        setTimeout(() => {
            modalImg.style.animation = '';
            updateModalContent();
        }, 500);
    }

    // Event listeners
    galleryImages.forEach((item, index) => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.cursor = 'pointer';
            overlay.addEventListener('click', () => openModal(index));
        }
    });

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .advanced-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
        }
        
        .modal-container {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            z-index: 10001;
        }
        
        .modal-image-wrapper {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .modal-main-image {
            width: 100%;
            max-height: 70vh;
            object-fit: contain;
            display: block;
        }
        
        .modal-info {
            padding: 2rem;
            background: var(--cream);
        }
        
        .modal-title {
            color: var(--primary-brown);
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }
        
        .modal-description {
            color: var(--text-dark);
            line-height: 1.8;
            margin-bottom: 1rem;
        }
        
        .modal-year {
            display: inline-block;
            background: var(--golden);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .modal-close, .modal-prev, .modal-next {
            position: absolute;
            background: rgba(139, 69, 19, 0.9);
            color: white;
            border: none;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10002;
        }
        
        .modal-close {
            top: -60px;
            right: 0;
        }
        
        .modal-prev {
            left: -70px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .modal-next {
            right: -70px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .modal-close:hover, .modal-prev:hover, .modal-next:hover {
            background: var(--golden);
            transform: translateY(-50%) scale(1.1);
        }
        
        .modal-close:hover {
            transform: scale(1.1);
        }
        
        .modal-counter {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        @keyframes modalZoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @media (max-width: 968px) {
            .modal-prev, .modal-next {
                width: 40px;
                height: 40px;
                font-size: 2rem;
            }
            .modal-prev { left: 10px; }
            .modal-next { right: 10px; }
        }
    `;
    document.head.appendChild(modalStyles);
}

// Animate text elements on scroll
function animateTextOnScroll() {
    const textElements = document.querySelectorAll('.section-title, .section-subtitle, .timeline-content h3, .gallery-info h3');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        textObserver.observe(el);
    });
}

// Interactive decorative patterns
function createInteractivePatterns() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const pattern = document.createElement('div');
            pattern.className = 'decorative-pattern';
            pattern.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                ${Math.random() > 0.5 ? 'left: 5%' : 'right: 5%'};
                width: 100px;
                height: 100px;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 5 L45 25 L25 45 L5 25 Z" fill="%23DAA520" opacity="0.1"/></svg>');
                background-size: contain;
                pointer-events: none;
                z-index: 1;
                animation: float ${5 + Math.random() * 3}s ease-in-out infinite;
            `;
            section.style.position = 'relative';
            section.appendChild(pattern);
        }
    });
}

// Rotating testimonials or quotes
function rotateTestimonials() {
    const quotes = [
        {
            text: "Every thread carries the wisdom of generations.",
            author: "Blaan Weaving Tradition"
        },
        {
            text: "To weave is to preserve our ancestors' voices.",
            author: "Indigenous Philosophy"
        },
        {
            text: "In patterns, we find our identity and purpose.",
            author: "Yabing's Teaching"
        }
    ];
    
    const quoteSection = document.createElement('div');
    quoteSection.className = 'rotating-quote';
    quoteSection.style.cssText = `
        position: fixed;
        bottom: 240px;
        right: 30px;
        max-width: 300px;
        background: linear-gradient(135deg, var(--primary-brown), var(--golden));
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 997;
        opacity: 0;
        transition: all 0.5s ease;
        pointer-events: none;
    `;
    
    quoteSection.innerHTML = `
        <div class="quote-text" style="font-style: italic; margin-bottom: 0.5rem; font-size: 0.95rem;"></div>
        <div class="quote-author" style="text-align: right; font-size: 0.85rem; opacity: 0.8;"></div>
    `;
    
    document.body.appendChild(quoteSection);
    
    let currentQuote = 0;
    let quoteVisible = false;
    
    function updateQuote() {
        const quoteText = quoteSection.querySelector('.quote-text');
        const quoteAuthor = quoteSection.querySelector('.quote-author');
        
        quoteText.textContent = `"${quotes[currentQuote].text}"`;
        quoteAuthor.textContent = `— ${quotes[currentQuote].author}`;
        
        currentQuote = (currentQuote + 1) % quotes.length;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 800 && window.scrollY < 3000) {
            if (!quoteVisible) {
                quoteVisible = true;
                quoteSection.style.opacity = '1';
                quoteSection.style.transform = 'translateX(0)';
                updateQuote();
            }
        } else {
            quoteVisible = false;
            quoteSection.style.opacity = '0';
            quoteSection.style.transform = 'translateX(50px)';
        }
    });
    
    setInterval(() => {
        if (quoteVisible) {
            quoteSection.style.opacity = '0';
            setTimeout(() => {
                updateQuote();
                quoteSection.style.opacity = '1';
            }, 500);
        }
    }, 8000);
}

// Share functionality
function addShareButtons() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-buttons';
    shareContainer.style.cssText = `
        position: fixed;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 15px;
        z-index: 998;
    `;
    
    const shareButtons = [
        { icon: '📘', name: 'Facebook', color: '#3b5998' },
        { icon: '🐦', name: 'Twitter', color: '#1da1f2' },
        { icon: '📧', name: 'Email', color: '#ea4335' },
        { icon: '🔗', name: 'Copy Link', color: '#666' }
    ];
    
    shareButtons.forEach(btn => {
        const button = document.createElement('button');
        button.innerHTML = btn.icon;
        button.title = `Share on ${btn.name}`;
        button.style.cssText = `
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            background: ${btn.color};
            color: white;
            font-size: 1.3rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        `;
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) rotate(0deg)';
        });
        
        button.addEventListener('click', () => {
            const url = window.location.href;
            const title = 'Yabing Masalon Dulo - National Living Treasure';
            
            switch(btn.name) {
                case 'Facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    break;
                case 'Twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
                    break;
                case 'Email':
                    window.location.href = `mailto:?subject=${title}&body=Check out this tribute: ${url}`;
                    break;
                case 'Copy Link':
                    navigator.clipboard.writeText(url).then(() => {
                        const tooltip = document.createElement('span');
                        tooltip.textContent = 'Copied!';
                        tooltip.style.cssText = `
                            position: absolute;
                            left: 60px;
                            background: var(--dark-brown);
                            color: white;
                            padding: 5px 10px;
                            border-radius: 5px;
                            font-size: 0.85rem;
                            white-space: nowrap;
                        `;
                        button.style.position = 'relative';
                        button.appendChild(tooltip);
                        setTimeout(() => tooltip.remove(), 2000);
                    });
                    break;
            }
        });
        
        shareContainer.appendChild(button);
    });
    
    document.body.appendChild(shareContainer);
    
    // Hide on mobile
    if (window.innerWidth < 768) {
        shareContainer.style.display = 'none';
    }
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: var(--golden);
        color: white;
        padding: 1rem;
        z-index: 10000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add aria labels to interactive elements
    document.querySelectorAll('button, a').forEach(el => {
        if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
            el.setAttribute('aria-label', 'Interactive element');
        }
    });
    
    // Ensure all images have alt text
    document.querySelectorAll('img').forEach(img => {
        if (!img.alt) {
            img.alt = 'Decorative image related to Yabing Masalon Dulo';
        }
    });
    
    // Add focus visible styles
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
        *:focus-visible {
            outline: 3px solid var(--golden);
            outline-offset: 3px;
        }
        
        .skip-link:focus {
            top: 0 !important;
        }
    `;
    document.head.appendChild(focusStyles);
}

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-image {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }
    
    .modal-close:hover {
        color: var(--golden);
    }
    
    .modal-caption {
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);