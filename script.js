const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((item) => observer.observe(item));

const tiltCards = document.querySelectorAll('.poem-card, .fragment, .closing-card, .honest-page');

const poemRotations = ['rotate(-2deg)', 'rotate(1.8deg)', 'rotate(-1deg)', 'rotate(2deg)', 'rotate(-2.2deg)', 'rotate(1.2deg)'];
const fragmentRotations = ['rotate(-2deg)', 'rotate(1.5deg)', 'rotate(-1deg)', 'rotate(2deg)', 'rotate(-1.6deg)', 'rotate(1deg)', 'rotate(-1deg)', 'rotate(1.7deg)'];

function setBaseTransform(card) {
  if (card.classList.contains('poem-card')) {
    const index = [...card.parentNode.children].indexOf(card);
    card.dataset.base = poemRotations[index] || 'rotate(0deg)';
  } else if (card.classList.contains('fragment')) {
    const index = [...card.parentNode.children].indexOf(card);
    card.dataset.base = fragmentRotations[index] || 'rotate(0deg)';
  } else if (card.classList.contains('closing-card')) {
    const index = [...card.parentNode.children].indexOf(card);
    card.dataset.base = index === 0 ? 'rotate(-1.4deg)' : 'rotate(1.2deg)';
  } else if (card.classList.contains('honest-page')) {
    card.dataset.base = 'rotate(-1deg)';
  } else {
    card.dataset.base = '';
  }
  card.style.transform = card.dataset.base;
}

tiltCards.forEach((card) => {
  setBaseTransform(card);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 4;
    const rotateX = ((y / rect.height) - 0.5) * -4;

    card.style.transform = `${card.dataset.base} perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = card.dataset.base;
  });
});

const canvas = document.getElementById('dust-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.max(40, Math.floor((window.innerWidth * window.innerHeight) / 22000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 0.4,
    vx: (Math.random() - 0.5) * 0.18,
    vy: Math.random() * 0.28 + 0.05,
    alpha: Math.random() * 0.28 + 0.08
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.y > window.innerHeight + 8) {
      p.y = -8;
      p.x = Math.random() * window.innerWidth;
    }

    if (p.x > window.innerWidth + 8) p.x = -8;
    if (p.x < -8) p.x = window.innerWidth + 8;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(95, 79, 61, ${p.alpha})`;
    ctx.fill();
  });

  animationFrameId = requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrameId);
  resizeCanvas();
  drawParticles();
});
