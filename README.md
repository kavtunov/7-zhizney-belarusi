# 7 жизней Беларуси

Интерактивный цифровой музей истории Беларуси. Статический сайт: HTML, CSS, JavaScript.

## Локальный запуск

Откройте `html/index.html` в браузере или поднимите локальный сервер из корня проекта:

```bash
python3 -m http.server 8080
```

Сайт: http://localhost:8080/html/index.html

## GitHub Pages

1. Создайте пустой репозиторий на GitHub.
2. Привяжите remote и запушьте:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/7-zhizney-belarusi.git
git push -u origin main
```

3. В репозитории: **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `main` / **`/ (root)`**
   - Save

Через 1–2 минуты сайт будет доступен:

`https://ВАШ_ЛОГИН.github.io/7-zhizney-belarusi/`

Белорусская версия: `.../html/be/index.html`
