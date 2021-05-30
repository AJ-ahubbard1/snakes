// index.js 
// FRONT END JS 
const BG_COLOR = '#23120';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = '#e66916';
const gameScreen = document.getElementById('gameScreen');

// SIGNAL HANDLERS FROM SERVER
const socket = io();
socket.on('init', handleInit);
socket.on('gameState', handleGameState);


let canvas, ctx;
function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = canvas.height = 600;
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	document.addEventListener('keydown', keydown);
}


function paintGame(gs) {
	const { player, food, gridsize } = gs;
	const size = canvas.width / gridsize;

	// PAINT BACKGROUND
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// PAINT FOOD PELLET
	ctx.fillStyle = FOOD_COLOR;
	ctx.fillRect(food.x * size, food.y * size, size, size);

	// PAINT PLAYER
	paintPlayer(player, size);
}

function paintPlayer(p, sz) {
	ctx.fillStyle = SNAKE_COLOR;
	p.snake.forEach(cell => {
		ctx.fillRect(cell.x * sz, cell.y * sz, sz, sz);
	});
}

function keydown(e) {
	console.log(e.keyCode);
}

init();

function handleInit(msg) {
	console.log(msg);
}

// handles gamestates sent by server
function handleGameState(gs) {
	gs = JSON.parse(gs);
	requestAnimationFrame(() -> paintGame(gs));
}
