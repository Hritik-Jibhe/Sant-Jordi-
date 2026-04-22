import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

// --- HELPER: Create Petals ---
const createPetal = () => {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Randomize initial position and size
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 15 + 10;
    
    petal.style.left = `${startX}px`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(petal);

    // GSAP Animation for falling
    gsap.to(petal, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 200 - 100}`, // random horizontal drift
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        ease: 'none',
        onComplete: () => petal.remove()
    });
};

// Start petal rain
setInterval(createPetal, 300);

// --- HERO ANIMATIONS ---
gsap.from('.romantic-title', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.subtitle', {
    duration: 1.5,
    delay: 0.5,
    scale: 0.8,
    opacity: 0,
    ease: 'back.out(1.7)'
});

// --- TIMELINE SCROLL TRIGGER ---
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: i % 2 * 0.2
    });
});

// --- ROSE BLOOM LOGIC ---
const bloomBtn = document.getElementById('bloom-btn');
const roseTarget = document.getElementById('rose-target');
const bloomMessage = document.getElementById('bloom-message');

bloomBtn.addEventListener('click', () => {
    // Hide button
    gsap.to(bloomBtn, { opacity: 0, scale: 0, duration: 0.5, onComplete: () => bloomBtn.style.display = 'none' });

    // Create Rose GIF
    const roseElement = document.createElement('img');
    roseElement.src = '/assets/Red_Rose_Gif_Animation.gif';
    roseElement.className = 'rose-gif';
    roseElement.style.opacity = '0';
    roseTarget.appendChild(roseElement);

    // Animate Bloom
    const tl = gsap.timeline();
    tl.to(roseElement, {
        opacity: 1,
        scale: 1.1,
        duration: 1.5,
        ease: 'power2.out'
    })
    .to(bloomMessage, {
        opacity: 1,
        y: -10,
        duration: 1,
        ease: 'back.out'
    })
    .add(() => {
        // Trigger some hearts confetti
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e63946', '#ffb7c5', '#8b0000'],
            shapes: ['circle']
        });
    });
});

// --- DIGITAL BOOK INTERACTIONS ---
const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');

pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
    
    page.addEventListener('click', () => {
        if (index === pages.length - 1) {
            // Reset book
            pages.forEach(p => gsap.to(p, { rotateY: 0, duration: 1 }));
        } else {
            gsap.to(page, { rotateY: -160, duration: 1.5, ease: 'power2.inOut' });
        }
    });
});

// --- TYPING EFFECT ---
const finalMsg = "My dearest Isona,\n\nOur journey together began on July 17, 2024, and every day since then has been a beautiful chapter of love. Being with you is like living in the most beautiful story ever written. You are my rose, my book, and my everything. Thank you for filling my life with color and joy.\n\nWith all my love,\nForever Yours.";
const typingTarget = document.getElementById('typing-text');

let charIndex = 0;
const type = () => {
    if (charIndex < finalMsg.length) {
        typingTarget.innerText += finalMsg.charAt(charIndex);
        charIndex++;
        setTimeout(type, 50);
    }
};

ScrollTrigger.create({
    trigger: '#final-message',
    start: 'top 60%',
    onEnter: () => {
        if (charIndex === 0) type();
        // Finale confetti
        confetti({
          particleCount: 150,
          spread: 180,
          origin: { y: 0.8 },
          colors: ['#e63946', '#ffb7c5', '#ffd700']
        });
    }
});

// --- MUSIC TOGGLE ---
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.querySelector('.icon').innerText = '🔇';
    } else {
        bgMusic.play().catch(e => console.log("Audio play blocked by browser - requires interaction first."));
        musicBtn.querySelector('.icon').innerText = '🎵';
    }
    isPlaying = !isPlaying;
});

// --- FOOTER ANIMATIONS ---
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '#main-footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
});

gsap.from('.footer-message', {
    scrollTrigger: {
        trigger: '#main-footer',
        start: 'top 80%',
    },
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: 'back.out(1.7)'
});

// --- BACK TO TOP ---
const backToTopBtn = document.getElementById('back-to-top');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
