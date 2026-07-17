// ===== Viewport classes (drives responsive CSS in style.css) =====
function setViewportClass() {
  const w = window.innerWidth;
  const body = document.body;
  body.classList.remove('vp-desktop', 'vp-laptop', 'vp-tablet', 'vp-mobile', 'vp-compact');
  if (w <= 420) body.classList.add('vp-compact', 'vp-mobile');
  else if (w <= 768) body.classList.add('vp-mobile');
  else if (w <= 992) body.classList.add('vp-tablet');
  else if (w <= 1200) body.classList.add('vp-laptop');
  else body.classList.add('vp-desktop');
}
setViewportClass();
window.addEventListener('resize', setViewportClass);

// ===== Sidebar drawer (mobile/tablet) =====
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  document.body.classList.add('sidebar-open');
  sidebarToggle?.setAttribute('aria-expanded', 'true');
}
function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  sidebarToggle?.setAttribute('aria-expanded', 'false');
}
sidebarToggle?.addEventListener('click', () => {
  document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
});
sidebarOverlay?.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => {
    closeSidebar();
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== Active link on scroll =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.sidebar-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ===== Typing effect =====
function typeText(el, text, speed = 45) {
  if (!el) return Promise.resolve();
  let i = 0;
  return new Promise(resolve => {
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTyping() {
  await typeText(document.getElementById('typing-name'), 'peter_elia_nasseem_fanous');
  await typeText(document.getElementById('typing-role'), 'Full Stack Developer — POS, Gym & Coaching Systems');
  await typeText(document.getElementById('typing-passion'), '"Building real-world business systems"');
}
runTyping();

// ===== Skill bar reveal =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-item').forEach(item => skillObserver.observe(item));

// ===== Stat counter =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 25);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

// ===== Contact form (UI only) =====
const form = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formResponse) return;
  formResponse.textContent = '> message queued — this form is UI only, email beterelea020@gmail.com directly.';
  formResponse.classList.add('show');
  form.reset();
});

// ===== Custom cursor (desktop only) =====
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
if (window.matchMedia('(pointer: fine)').matches) {
  if (cursor) cursor.style.display = 'block';
  if (follower) follower.style.display = 'block';
  window.addEventListener('mousemove', (e) => {
    if (cursor) { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; }
    if (follower) {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    }
  });
}

// ===== Matrix rain canvas =====
const matrixCanvas = document.getElementById('matrix-canvas');
if (matrixCanvas) {
  const ctx = matrixCanvas.getContext('2d');
  let columns, drops;
  const chars = '01アイウエオPETERELIA{}[]<>/;=';

  function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / 18);
    drops = Array(columns).fill(1);
  }
  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10,10,10,0.06)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '14px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * 18, drops[i] * 18);
      if (drops[i] * 18 > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
}

// ===== Ambient particles canvas =====
const particlesCanvas = document.getElementById('particles-canvas');
if (particlesCanvas) {
  const pctx = particlesCanvas.getContext('2d');
  let particles = [];

  function resizeParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }
  resizeParticles();
  window.addEventListener('resize', resizeParticles);

  const colors = ['rgba(0,255,65,0.5)', 'rgba(0,212,255,0.5)', 'rgba(189,0,255,0.5)'];
  const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 22000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      r: Math.random() * 1.8 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function drawParticles() {
    pctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > particlesCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > particlesCanvas.height) p.dy *= -1;
      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fillStyle = p.color;
      pctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}
