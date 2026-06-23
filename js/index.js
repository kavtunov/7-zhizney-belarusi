(function () {
  'use strict';

  const IS_FILE_PROTOCOL = window.location.protocol === 'file:';
  const MIN_READY_STATE = IS_FILE_PROTOCOL ? 3 : 4;
  const READY_TIMEOUT_MS = IS_FILE_PROTOCOL ? 5000 : 12000;
  const IMMEDIATE_LOAD_COUNT = IS_FILE_PROTOCOL ? 99 : 0;

  function initCardVideos() {
    const videos = document.querySelectorAll('.time-grid .card-media');
    if (!videos.length) return;

    videos.forEach(function (video, index) {
      const src = video.getAttribute('src') || video.dataset.src;
      if (!src) return;

      const card = video.closest('.time-card');
      const poster = video.previousElementSibling;
      const posterImg = poster && poster.classList.contains('card-poster') ? poster : null;

      if (posterImg && posterImg.getAttribute('src')) {
        video.poster = posterImg.getAttribute('src');
      }

      video.dataset.src = src;
      video.removeAttribute('src');
      video.setAttribute('loading', 'lazy');
      video.preload = 'none';
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      function setLoadingState(isLoading) {
        if (card) card.classList.toggle('is-video-loading', isLoading);
      }

      function revealVideo() {
        if (video.classList.contains('is-playing')) return;
        video.classList.add('is-playing');
        setLoadingState(false);
        if (posterImg) posterImg.classList.add('is-hidden');
      }

      function startPlayback() {
        const playPromise = video.play();
        if (!playPromise || !playPromise.then) {
          revealVideo();
          return;
        }

        playPromise.then(function () {
          if (video.readyState >= 2 && video.currentTime > 0) {
            revealVideo();
            return;
          }

          video.addEventListener('timeupdate', function onFrame() {
            if (video.currentTime <= 0) return;
            video.removeEventListener('timeupdate', onFrame);
            revealVideo();
          });
        }).catch(function () {
          setLoadingState(false);
          /* poster stays visible if autoplay is blocked */
        });
      }

      function loadVideo() {
        if (!video.dataset.src || video.getAttribute('src') || video.dataset.loading === 'true') return;
        video.dataset.loading = 'true';
        setLoadingState(true);
        video.preload = 'auto';
        video.src = video.dataset.src;

        let started = false;
        let fallbackTimer;

        function cleanupReadyListeners() {
          video.removeEventListener('canplaythrough', onVideoReady);
          video.removeEventListener('loadeddata', onVideoReady);
          video.removeEventListener('canplay', onVideoReady);
          window.clearTimeout(fallbackTimer);
        }

        function onVideoReady() {
          if (started) return;
          if (video.readyState < MIN_READY_STATE) return;
          started = true;
          cleanupReadyListeners();
          startPlayback();
        }

        video.addEventListener('canplaythrough', onVideoReady);
        video.addEventListener('loadeddata', onVideoReady);
        video.addEventListener('canplay', onVideoReady);
        video.addEventListener('error', function () {
          cleanupReadyListeners();
          setLoadingState(false);
        }, { once: true });

        fallbackTimer = window.setTimeout(function () {
          if (video.readyState >= MIN_READY_STATE) onVideoReady();
        }, READY_TIMEOUT_MS);

        video.load();

        if (video.readyState >= MIN_READY_STATE) {
          onVideoReady();
        }
      }

      if (index < IMMEDIATE_LOAD_COUNT) {
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
