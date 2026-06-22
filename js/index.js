(function () {
  'use strict';

  function initCardVideos() {
    const videos = document.querySelectorAll('.time-grid .card-media');
    if (!videos.length) return;

    videos.forEach(function (video, index) {
      const src = video.getAttribute('src');
      if (!src) return;

      const poster = video.previousElementSibling;
      const posterImg = poster && poster.classList.contains('card-poster') ? poster : null;

      video.dataset.src = src;
      video.removeAttribute('src');
      video.preload = 'none';

      function revealVideo() {
        video.classList.add('is-playing');
        if (posterImg) posterImg.classList.add('is-hidden');
      }

      video.addEventListener('playing', revealVideo, { once: true });

      function loadVideo() {
        if (!video.dataset.src || video.getAttribute('src')) return;
        video.src = video.dataset.src;
        video.load();
        video.play().catch(function () {});
      }

      if (index < 3) {
        loadVideo();
        return;
      }

      if (!('IntersectionObserver' in window)) {
        loadVideo();
        return;
      }

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          loadVideo();
          observer.unobserve(video);
        });
      }, { rootMargin: '160px 0px' });

      observer.observe(video);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCardVideos();

    const button = document.getElementById('start-journey');
    if (!button || !window.Belarus7) return;

    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.Belarus7.navigateWithTransition('01-origins.html', '#FFFFFF', '#F7F5E8');
    });
  });
})();
