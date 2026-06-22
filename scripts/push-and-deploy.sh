#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REMOTE="git@github.com:kavtunov/7-zhizney-belarusi.git"
SITE_URL="https://kavtunov.github.io/7-zhizney-belarusi/"

echo "→ Проверка SSH-доступа к GitHub…"
if ! ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -T git@github.com 2>&1 | grep -qi "successfully authenticated"; then
  echo ""
  echo "SSH ещё не настроен. Добавьте ключ на GitHub:"
  echo "  https://github.com/settings/ssh/new"
  echo ""
  if [[ -f "$HOME/.ssh/id_ed25519_github.pub" ]]; then
    echo "Публичный ключ (скопирован в буфер обмена):"
    cat "$HOME/.ssh/id_ed25519_github.pub"
    pbcopy < "$HOME/.ssh/id_ed25519_github.pub" 2>/dev/null || true
    open "https://github.com/settings/ssh/new?title=7-zhizney-belarusi" 2>/dev/null || true
  fi
  exit 1
fi

git remote set-url origin "$REMOTE"
echo "→ git push…"
git push -u origin main

echo ""
echo "✓ Код на GitHub."
echo "  Репозиторий: https://github.com/kavtunov/7-zhizney-belarusi"
echo "  Сайт (через 1–3 мин): $SITE_URL"
echo ""
echo "Если Pages ещё не включены:"
echo "  Settings → Pages → Source: GitHub Actions"
