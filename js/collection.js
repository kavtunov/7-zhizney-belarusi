(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.Belarus7) return;

    const count = window.Belarus7.countCollected();
    const fill = document.getElementById('progress-fill');
    if (fill) {
      fill.style.width = (count / 6 * 100) + '%';
    }
  });
})();
