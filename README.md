# 7 жизней Беларуси

Интерактивный цифровой музей истории Беларуси — статический сайт на HTML, CSS и JavaScript. Две локали: русский (`html/`) и белорусский (`html/be/`).

**Сайт:** [kavtunov.github.io/7-zhizney-belarusi](https://kavtunov.github.io/7-zhizney-belarusi/)

## Локальный запуск

```bash
python3 -m http.server 8080
```

Откройте: http://localhost:8080/html/index.html

## Деплой

Пуш в `main` автоматически публикует сайт через GitHub Actions (`.github/workflows/deploy-pages.yml`).

```bash
./scripts/push-and-deploy.sh
```

Первый раз может понадобиться добавить SSH-ключ на GitHub — скрипт откроет страницу и скопирует ключ.

## Структура

| Папка | Содержимое |
|-------|------------|
| `html/` | Страницы (RU) |
| `html/be/` | Страницы (BE) |
| `css/` | Стили |
| `js/` | Скрипты |
| `img/` | Изображения и видео |

Два 4K-видео (>100 МБ) исключены из git — GitHub их не принимает. На главной используются остальные ролики из `img/`.
