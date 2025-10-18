// Traditional Kalinga Tattoo Patterns Data
const artworks = [
    {
        title: "Tabih of Abaca",
        img: "resources/images/Image_1.jpg",
        description: "The Tabih of Abaca is a traditional handwoven cloth of the T’boli people, crafted from fine abaca fibers and dyed with natural pigments.",
        details: "Its intricate patterns are created through a careful process of resist-dyeing and weaving. The cloth is often used for ceremonial garments and cultural attire, representing T’boli craftsmanship and tradition.",
        reference: "Reference: The Textile Atlas. (n.d.). T’nalak Weaving, Philippines. Retrieved from https://www.thetextileatlas.com/craft-stories/tnalak-weaving-philippines",
    },
    {
        title: "Blaan Traditional Attire",
        img: "resources/images/Image_2.png",
        description: "The Blaan Traditional Attire is a handwoven garment known for its vivid colors, detailed embroidery, and intricate beadwork.",
        details: "Each piece is made with great care and skill, showcasing traditional weaving methods passed down through generations. It is often worn during important celebrations and rituals.",
        reference: "Reference: Munting Nayon. (n.d.). The Blaan, Preserving Their Culture. Retrieved from https://muntingnayon.com/104/104839/index.php",
    },
    {
        title: "Ikat-Dyed Abaca Panels",
        img: "resources/images/Image_3.png",
        description: "The Ikat-Dyed Abaca Panels are handwoven textiles made from abaca fibers, dyed using the ikat technique where threads are patterned before weaving.",
        details: "This process produces distinctive geometric and symbolic designs. The panels are used for garments, ceremonial wear, and decoration, carrying deep cultural meanings.",
        reference: "Reference: ClothRoads. (n.d.). Woven Dreams of T’nalak Ikat. Retrieved from https://www.clothroads.com/woven-dreams-tnalak-ikat/",
    },
];

// Carousel Variables
let currentIndex = 0;
let autoRotateInterval = null;
let isAutoRotating = false;

// Initialize the carousel
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const totalItems = artworks.length;
    
    artworks.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
        <div class="artwork">
            <img src="${artwork.img}" alt="${artwork.title}">
            <h3>${artwork.title}</h3>
            <p>${artwork.description}</p>
        </div>
    `;
    
        item.addEventListener('click', () => openModal(index));
        carousel.appendChild(item);
    });
    
    updateCarousel();
    document.getElementById('total-items').textContent = totalItems;
}

// Update carousel rotation
function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const angleStep = 360 / totalItems;
    const radius = 500;
    
    items.forEach((item, index) => {
        const angle = angleStep * (index - currentIndex);
        const angleRad = (angle * Math.PI) / 180;
        
        const x = Math.sin(angleRad) * radius;
        const z = Math.cos(angleRad) * radius;
        
        item.style.transform = `translateX(-50%) translateY(-50%) 
                                translateX(${x}px) translateZ(${z}px) 
                                rotateY(${-angle}deg)`;
        
        // Adjust opacity and scale based on z position
        const scale = (z + radius) / (radius * 2);
        const opacity = z > -200 ? 1 : 0.3;
        item.style.opacity = opacity;
        item.style.zIndex = Math.floor(z);
    });
    
    document.getElementById('current-item').textContent = (currentIndex + 1);
}

// Rotate carousel
function rotateCarousel(direction) {
    const totalItems = artworks.length;
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarousel();
}

// Auto-rotate functionality
function toggleAutoRotate() {
    const toggle = document.getElementById('autoRotateToggle');
    isAutoRotating = !isAutoRotating;
    
    if (isAutoRotating) {
        toggle.classList.add('active');
        autoRotateInterval = setInterval(() => {
            rotateCarousel(1);
        }, 3000);
    } else {
        toggle.classList.remove('active');
        clearInterval(autoRotateInterval);
    }
}

// Modal functions
function openModal(index) {
    const modal = document.getElementById('modal');
    const artwork = artworks[index];
    
    document.getElementById('modal-title').textContent = artwork.title;
    document.getElementById('modal-image').src = artwork.img;
    document.getElementById('modal-description').innerHTML = 
        `${artwork.description}${artwork.details}<br><br><strong>Reference:</strong> ${artwork.reference}`;
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        rotateCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        rotateCarousel(1);
    } else if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    
    // Add scroll animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            rotateCarousel(1); // Swipe left
        } else {
            rotateCarousel(-1); // Swipe right
        }
    }
}