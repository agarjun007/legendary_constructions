// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize Swiper carousel
const swiper = new Swiper('.portfolio-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Contact form submission
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    form.reset();

    // In a real application, you would send this data to a server
    // Example:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));
}

// Add scroll animation for elements
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

// Observe all service cards, video cards, etc.
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .video-card, .portfolio-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Video card click handling: open YouTube links or local videos in modal
    const videoCards = document.querySelectorAll('.video-card');

    function createModal(videoSrc, isYouTube) {
        // modal container
        const modal = document.createElement('div');
        modal.className = 'video-modal';

        const inner = document.createElement('div');
        inner.className = 'video-inner';

        // close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.addEventListener('click', () => {
            if (!isYouTube) {
                const vid = modal.querySelector('video');
                if (vid) { vid.pause(); vid.src = ''; }
            }
            document.body.removeChild(modal);
        });

        if (isYouTube) {
            // open youtube in a new tab instead of modal for simplicity
            window.open(videoSrc, '_blank', 'noopener');
            return null;
        }

        // local video element
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.src = videoSrc;

        inner.appendChild(video);
        modal.appendChild(inner);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);

        return modal;
    }

    videoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const youtube = card.getAttribute('data-youtube');
            const src = card.getAttribute('data-src');

            if (youtube) {
                // open YouTube link in new tab
                createModal(youtube, true);
                return;
            }

            if (src) {
                // open modal with local video
                createModal(src, false);
                return;
            }
        });
    });
});