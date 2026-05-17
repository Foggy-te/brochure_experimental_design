document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal, .reveal-card, .reveal-row').forEach((el) => observer.observe(el));

  const cursorGlow = document.getElementById('cursorGlow');
  const progressLine = document.getElementById('progressLine');

  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    document.querySelectorAll('.glass-panel, .profile-card, .mini-card, .metric-card, .glass-note').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        const rotX = (0.5 - y) * 5;
        const rotY = (x - 0.5) * 6;
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-1px)`;
      } else {
        card.style.transform = '';
      }
    });
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = max > 0 ? (scrollTop / max) * 100 : 0;
    if (progressLine) progressLine.style.width = `${progress}%`;
  }, { passive: true });

  const btn = document.getElementById('mockConsultBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.classList.add('clicked');
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Запрос отправлен';
      setTimeout(() => {
        alert('Запрос на персональный расчёт налоговой экономии отправлен (демо-режим брошюры).\nРекомендуем обратиться в Корпорацию развития Иркутской области.');
        btn.innerHTML = original;
        btn.classList.remove('clicked');
      }, 200);
    });
  }

  document.querySelectorAll('.reveal-row').forEach((row, index) => {
    row.style.transitionDelay = `${index * 60}ms`;
  });
});
