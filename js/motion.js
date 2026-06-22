(function () {
  'use strict';

  function showReveals() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(function (element) {
      element.classList.add('visible');
    });
  }

  function initTimelineCards() {
    const cards = document.querySelectorAll('.time-card');
    cards.forEach(function (card, index) {
      card.style.transitionDelay = (index * 0.08) + 's';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    showReveals();
    initTimelineCards();
  });
})();
