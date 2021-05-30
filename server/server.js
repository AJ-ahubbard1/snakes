// server.js 
// SETUP SIMPLE EXPRESS HTTP SERVER WITH SOCKET IO
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, '../client')));
const PORT = process.env.PORT || 3001;
// END SETUP 

const { createGameState, gameLoop } = require('./game');
const { FRAME_RATE } = require('./constants');

io.on('connection', client => {
	client.emit('init', { data: 'hello World' });
	const state = createGameState();

	startGameInterval(client, state);
});


function startGameInterval(client, state) {
	const intervalId = setInterval(() => { 
		const winner = gameLoop(state);

		if (!winner) {
			client.emit('gameState', JSON.stringify(state));
		} else { 
			client.emit('gameOver');
			clearInterval(intervalId);
		}
	}, 1000/FRAME_RATE);
}





server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
