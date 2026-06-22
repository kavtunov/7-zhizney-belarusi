# Один раз: добавить SSH-ключ на GitHub

1. Откройте: https://github.com/settings/ssh/new  
2. **Title:** `7-zhizney-belarusi`  
3. **Key:** вставьте строку ниже целиком  
4. Нажмите **Add SSH key**

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK5rQwAVRUM2CMI3wVhfgnUmHMtTOBb6VRgL4Iib6eGV kavtunov-7-zhizney-belarusi
```

5. В терминале из корня проекта:

```bash
./scripts/push-and-deploy.sh
```

После пуша зайдите в репозиторий → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Сайт: https://kavtunov.github.io/7-zhizney-belarusi/

## Альтернатива: GitHub Desktop

1. Откройте GitHub Desktop  
2. **File → Add Local Repository** → выберите эту папку  
3. **Publish branch** / **Push origin**
