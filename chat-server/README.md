# Sotik Chat WebSocket Server

Это сервер для онлайн-чата на сайте Sotik.

## Запуск локально

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите сервер:
   ```bash
   npm start
   ```

3. Сервер будет доступен на `ws://localhost:3000`

## Деплой на Render

1. Залейте репозиторий на GitHub
2. На [Render](https://render.com) создайте новый Web Service
3. Выберите репозиторий
4. Укажите:
   - **Name**: `sotik-chat-ws`
   - **Region**: `Frankfurt`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Запустите сервис

После деплоя WebSocket будет доступен по адресу `wss://sotik-chat-ws.onrender.com`