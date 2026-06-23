(function () {
  'use strict';

  const STORAGE_KEY = 'belarus7-artifacts';
  const TOTAL_ARTIFACTS = 6;

  const ARTIFACTS = {
    coin: { labelKey: 'coin', era: 1 },
    seal: { labelKey: 'seal', era: 2 },
    sword: { labelKey: 'sword', era: 3 },
    book: { labelKey: 'book', era: 4 },
    photo: { labelKey: 'photo', era: 5 },
    chip: { labelKey: 'chip', era: 7 }
  };

  function artifactLabel(id) {
    if (window.Belarus7I18n) {
      return window.Belarus7I18n.artifactLabel(id);
    }
    const fallback = { coin: 'Монета', seal: 'Печать', sword: 'Меч', book: 'Книга', photo: 'Фотография', chip: 'Микрочип' };
    return fallback[id] || id;
  }

  const PAGE_TRANSITIONS = {
    index: { from: '#FFFFFF', to: '#F7F5E8' },
    '01-origins': { from: '#F7F5E8', to: '#F2F6FA' },
    '02-principalities': { from: '#F2F6FA', to: '#FFF5F5' },
    '03-knights': { from: '#FFF5F5', to: '#F4F6FA' },
    '04-xix': { from: '#F4F6FA', to: '#F2F7FC' },
    '05-trials': { from: '#F2F7FC', to: '#FFFFFF' },
    '06-modern': { from: '#FFFFFF', to: '#F8F7FF' },
    '07-future': { from: '#F8F7FF', to: '#7B61FF' }
  };

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      return;
    }
  }

  function isCollected(id) {
    return !!loadData()[id];
  }

  function collect(id) {
    if (!ARTIFACTS[id] || isCollected(id)) return false;
    const data = loadData();
    data[id] = Date.now();
    saveData(data);
    return true;
  }

  function countCollected() {
    return Object.keys(loadData()).length;
  }

  function allCollected() {
    return countCollected() >= TOTAL_ARTIFACTS;
  }

  function showToast(name) {
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    const toastTitle = window.Belarus7I18n ? window.Belarus7I18n.t('artifactFound') : 'Артефакт найден';
    const toastSub = window.Belarus7I18n ? window.Belarus7I18n.t('addedToCollection') : 'Добавлено в коллекцию «Следы времени»';
    toast.innerHTML =
      '<div class="toast-title">' + toastTitle + '</div>' +
      '<div>' + name + '</div>' +
      '<div class="toast-sub">' + toastSub + '</div>';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 2400);
  }

  function initPickup(button) {
    if (!button) return;
    const artifactId = button.dataset.artifact;
    if (!artifactId) return;

    if (isCollected(artifactId)) button.classList.add('collected');

    button.addEventListener('click', function () {
      if (!collect(artifactId)) return;
      button.classList.add('collected');

      showToast(artifactLabel(artifactId));

      if (window.Belarus7UI && window.Belarus7UI.playCollectSound) {
        window.Belarus7UI.playCollectSound();
      }
    });
  }

  function navigateWithTransition(href, fromColor, toColor) {
    const overlay = document.querySelector('.transition');
    if (!overlay) {
      window.location.href = href;
      return;
    }

    const layer = overlay.querySelector('.transition-layer');
    if (layer) {
      layer.style.background = 'linear-gradient(180deg, ' + fromColor + ', ' + toColor + ')';
    }

    overlay.classList.add('active');
    setTimeout(function () {
      window.location.href = href;
    }, 750);
  }

  function initEraNavigation(pageId) {
    const pageColors = PAGE_TRANSITIONS[pageId] || { from: '#F7F5E8', to: '#F7F5E8' };
    const links = document.querySelectorAll('[data-era-nav]');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;

        if (link.dataset.eraNav === 'next') {
          navigateWithTransition(href, pageColors.from, pageColors.to);
          return;
        }

        navigateWithTransition(href, pageColors.from, pageColors.from);
      });
    });
  }

  function initCollectionPage() {
    const grid = document.querySelector('.collect-grid');
    if (!grid) return;

    const collected = loadData();
    const cards = grid.querySelectorAll('[data-collection-id]');

    cards.forEach(function (card) {
      const id = card.dataset.collectionId;
      if (!id) return;
      if (collected[id]) {
        card.classList.add('unlocked');
        card.classList.remove('locked');
      }
    });

    const finale = document.querySelector('.collect-finale');
    if (finale && allCollected()) finale.classList.add('visible');
  }

  window.Belarus7 = {
    ARTIFACTS: ARTIFACTS,
    isCollected: isCollected,
    collect: collect,
    countCollected: countCollected,
    allCollected: allCollected,
    initPickup: initPickup,
    initEraNav: initEraNavigation,
    initCollectionPage: initCollectionPage,
    navigateWithTransition: navigateWithTransition
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.pickup').forEach(initPickup);
    initEraNavigation(document.body.dataset.page);
    initCollectionPage();
  });
})();
