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
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const loader = document.getElementById("loader");
    const statusMessage = document.getElementById("statusMessage");
    const submitBtn = document.getElementById("submitBtn");

    // Reset states
    loader.classList.remove("hidden");
    statusMessage.classList.add("hidden");
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwRQtfXY8dcUyYpDD9SeZsn4lHT38s_RifaIcRb-6MDi9PY6iTAmd7NVmAypk6DO0gB/exec", {
            method: "POST",
            body: new FormData(document.getElementById("contactForm"))
        });
        console.log("response: ", document.getElementById("contactForm"),response)
        if (response.ok) {
            loader.classList.add("hidden");
            statusMessage.textContent = "✅ Message sent successfully!";
            statusMessage.className = "success";
            statusMessage.classList.remove("hidden");
            this.reset();
        } else {
            throw new Error("Form submission failed. Try again.");
        }
    } catch (error) {
        loader.classList.add("hidden");
        statusMessage.textContent = "❌ " + error.message;
        statusMessage.className = "error";
        statusMessage.classList.remove("hidden");
    } finally {
        submitBtn.disabled = false;
    }
});


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

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const youtube = card.getAttribute('data-youtube');
    const src = card.getAttribute('data-src');

    // create modal container
    const modal = document.createElement('div');
    modal.className = 'video-modal';

    const inner = document.createElement('div');
    inner.className = 'video-inner';

    // close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));

    // add content
    if (youtube) {
      const iframe = document.createElement('iframe');
      iframe.src = `${youtube}?autoplay=1&mute=1`;
      iframe.width = '100%';
      iframe.height = '600';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.frameBorder = '0';
      inner.appendChild(iframe);
    } else if (src) {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      inner.appendChild(video);
    }

    modal.appendChild(inner);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  });
});


});