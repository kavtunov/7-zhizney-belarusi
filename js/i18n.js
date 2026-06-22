(function () {
  'use strict';

  const STRINGS = {
    ru: {
      traces: 'Следы времени',
      artifactFound: 'Артефакт найден',
      addedToCollection: 'Добавлено в коллекцию «Следы времени»',
      artifacts: {
        coin: 'Монета',
        seal: 'Печать',
        sword: 'Меч',
        book: 'Книга',
        photo: 'Фотография',
        chip: 'Микрочип'
      }
    },
    be: {
      traces: 'Сляды часу',
      artifactFound: 'Артэфакт знойдзены',
      addedToCollection: 'Дададзена ў калекцыю «Сляды часу»',
      artifacts: {
        coin: 'Манета',
        seal: 'Пячатка',
        sword: 'Меч',
        book: 'Кніга',
        photo: 'Фатаграфія',
        chip: 'Мікрочып'
      }
    }
  };

  function getLang() {
    const lang = document.documentElement.lang || 'ru';
    return lang === 'be' ? 'be' : 'ru';
  }

  function t(key) {
    const lang = getLang();
    const parts = key.split('.');
    let value = STRINGS[lang];
    for (let i = 0; i < parts.length; i++) {
      if (!value) return key;
      value = value[parts[i]];
    }
    return value || key;
  }

  window.Belarus7I18n = {
    getLang: getLang,
    t: t,
    artifactLabel: function (id) {
      return t('artifacts.' + id);
    }
  };
})();
