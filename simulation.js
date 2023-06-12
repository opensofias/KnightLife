const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 10;
const numRows = canvas.height / cellSize;
const numCols = canvas.width / cellSize;

// Create a 2D array to represent the grid
const grid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(0));

let isRunning = false;
let timeoutId;
let speed = parseInt(document.getElementById("speedInput").value);

// Render the grid on the canvas
export function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			if (grid[row][col] === 1) {
				ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
			}
		}
	}
}

// Calculate the next generation of the grid
export function nextGeneration() {
	const newGrid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(0));

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			const cell = grid[row][col];
			const numNeighbors = countNeighbors(row, col);

			if (cell === 1) {
				if (numNeighbors < 2 || numNeighbors > 3) {
					newGrid[row][col] = 0; // Cell dies
				} else {
					newGrid[row][col] = 1; // Cell survives
				}
			} else {
				if (numNeighbors === 3) {
					newGrid[row][col] = 1; // Cell is born
				}
			}
		}
	}

	grid.splice(0, numRows, ...newGrid);
}

// Count the number of knight neighbors around a cell
function countNeighbors(row, col) {
	let count = 0;

	const knightMoves = [
		{ row: -2, col: -1 },
		{ row: -2, col: 1 },
		{ row: -1, col: -2 },
		{ row: -1, col: 2 },
		{ row: 1, col: -2 },
		{ row: 1, col: 2 },
		{ row: 2, col: -1 },
		{ row: 2, col: 1 }
	];

	for (let i = 0; i < knightMoves.length; i++) {
		const move = knightMoves[i];
		const neighborRow = (row + move.row + numRows) % numRows;
		const neighborCol = (col + move.col + numCols) % numCols;
		count += grid[neighborRow][neighborCol];
	}

	return count;
}

// Handle click/tap event on the canvas to toggle cell state
export function handleClick(event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	const col = Math.floor(x / cellSize);
	const row = Math.floor(y / cellSize);

	grid[row][col] = 1 - grid[row][col]; // Toggle cell state
	render();
}

// Run the simulation
function runSimulation() {
	render();
	nextGeneration();

	if (isRunning) {
		timeoutId = setTimeout(runSimulation, 1000 / speed);
	}
}

// Start the simulation
export function startSimulation() {
	if (!isRunning) {
		isRunning = true;
		runSimulation();
	}
}

// Stop the simulation
export function stopSimulation() {
	if (isRunning) {
		isRunning = false;
		clearTimeout(timeoutId);
	}
}

// Perform a single step of the simulation
export function stepSimulation() {
	stopSimulation();
	runSimulation();
}

// Clear the grid
export function clearGrid() {
	stopSimulation();
	grid.forEach(row => row.fill(0));
	render();
}

// Generate random noise in the grid
export function generateNoise() {
	stopSimulation();
	grid.forEach((row, i) => {
		row.forEach((_, j) => {
			grid[i][j] = Math.random() > 0.5 ? 1 : 0;
		});
	});
	render();
}

// Update simulation speed
export function updateSpeed() {
	speed = parseInt(document.getElementById("speedInput").value);
}
