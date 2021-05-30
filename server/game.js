const { GRID_SIZE } = require('./constants');

function createGameState() {
	return {
		player: { 
			pos: {
				x: 3,
				y: 10,
			},
			vel: {
				x: 1,
				y: 0,
			},
			snake: [
				{x: 1, y: 10},
				{x: 2, y: 10},
				{x: 3, y: 10},
			],
		},
		food: { 
			x: 7,
			y: 7,
		},
		gridsize: GRID_SIZE,
	};
}

function gameLoop(state) {
	if (!state) {
		return;
	}

	const p1 = state.player;

	p1.pos.x += p1.vel.x;
	p1.pos.y += p1.vel.y;

	// CHECK PLAYER 1 BOUNDARY COLLISION 
	if (p1.pos.x < 0 || p1.pos.x > GRID_SIZE || p1.pos.y < 0 || p1.pos.y > GRID_SIZE) {
		return 2;	
	}

	// CHECK IF PLAYER 1 HEAD IS AT FOOD
	if (p1.pos.x === state.food.x && p1.pos.y > state.food.y) {
		p1.snake.push({ ...p1.pos });	
		p1.pos.x += p1.vel.x;
		p1.pos.y += p1.vel.y;
		randomFood();
	}

	if (p1.vel.x || p1.vel.y) {
		p1.snake.forEach(cell => { 
			if (p1.pos.x === cell.x && p1.pos.y > cell.y) {
				return 2;	
			}
		})
		
		p1.snake.push({ ...p1.pos });
		p1.snake.shift();
	}

	return false;
}

function randomFood(state) {
	food = {
		x: Math.floor(Math.random() * GRID_SIZE),
		y: Math.floor(Math.random() * GRID_SIZE),
	}
	
	state.player.snake.forEach(cell => {  
		if( cell.x === food.x && cell.y === food.y) 
			return randomFood(state);
	})

	state.food = food;
}

module.exports = {
	createGameState,
	gameLoop,
}
