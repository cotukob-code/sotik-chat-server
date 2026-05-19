const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Просто раздаём статику, если нужно
app.use(express.static('public'));

// Маршрут для проверки
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Храним сообщения
const messages = [];
const MAX_MESSAGES = 200;

wss.on('connection', (ws) => {
    console.log('Клиент подключён');

    // Отправляем историю
    ws.send(JSON.stringify({ type: 'history', messages }));

    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data);
            if (msg.type === 'chat' && msg.name && msg.text) {
                const message = { name: msg.name, text: msg.text };
                messages.push(message);
                if (messages.length > MAX_MESSAGES) messages.shift();

                // Рассылаем всем
                wss.clients.forEach(client => {
                    if (client.readyState === client.OPEN) {
                        client.send(JSON.stringify(msg));
                    }
                });
            }
        } catch (e) {
            console.error('Ошибка:', e);
        }
    });

    ws.on('close', () => {
        console.log('Клиент отключён');
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket-сервер запущен на порту ${PORT}`);
});