(function () {
  'use strict';

  function showReveals() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(function (element) {
      element.classList.add('visible');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    showReveals();
  });
})();
