(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('start-journey');
    if (!button || !window.Belarus7) return;

    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.Belarus7.navigateWithTransition('01-origins.html', '#FFFFFF', '#F7F5E8');
    });
  });
})();
