import { startSimulation, stopSimulation, stepSimulation, clearGrid, generateNoise, updateSpeed, handleClick } from './simulation.js';

// Add event listeners to buttons
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const stepButton = document.getElementById("stepButton");
const clearButton = document.getElementById("clearButton");
const noiseButton = document.getElementById("noiseButton");
const speedInput = document.getElementById("speedInput");

startButton.addEventListener("click", startSimulation);
stopButton.addEventListener("click", stopSimulation);
stepButton.addEventListener("click", stepSimulation);
clearButton.addEventListener("click", clearGrid);
noiseButton.addEventListener("click", generateNoise);
speedInput.addEventListener("input", updateSpeed);

// Add event listener to canvas
const canvas = document.getElementById("canvas");
canvas.addEventListener("click", handleClick);
