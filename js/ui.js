(function () {
  'use strict';

  function playCollectSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    function tone(freq, start, duration, volume) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    }

    tone(880, now, 0.18, 0.12);
    tone(1174, now + 0.08, 0.22, 0.08);

    setTimeout(function () {
      ctx.close();
    }, 400);
  }

  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;

    function toggle() {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initLangToggle() {
    const LANG_SWITCH_KEY = 'belarus7-lang-switch';

    document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
      const stored = sessionStorage.getItem(LANG_SWITCH_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.from && data.to && data.from !== data.to) {
            toggle.dataset.active = data.from;
            void toggle.offsetWidth;
            requestAnimationFrame(function () {
              toggle.dataset.active = data.to;
            });
          }
        } catch (error) {
          /* ignore invalid session value */
        }
        sessionStorage.removeItem(LANG_SWITCH_KEY);
      }
    });

    document.querySelectorAll('.lang-toggle a.lang-toggle-btn').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (link.getAttribute('aria-current') === 'page') {
          e.preventDefault();
          return;
        }

        const toggle = link.closest('.lang-toggle');
        if (!toggle || toggle.classList.contains('is-switching')) return;

        const targetLang = link.getAttribute('hreflang') === 'be' ? 'by' : 'ru';
        if (toggle.dataset.active === targetLang) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        const fromLang = toggle.dataset.active;
        toggle.classList.add('is-switching');
        toggle.dataset.active = targetLang;

        sessionStorage.setItem(LANG_SWITCH_KEY, JSON.stringify({
          from: fromLang,
          to: targetLang
        }));

        const href = link.href;
        window.setTimeout(function () {
          window.location.assign(href);
        }, 400);
      });
    });
  }

  window.Belarus7UI = {
    playCollectSound: playCollectSound
  };

  document.addEventListener('DOMContentLoaded', function () {
    initBackToTop();
    initLangToggle();
  });
})();
