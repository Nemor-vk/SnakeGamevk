import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

//variables
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

//functions - main_function
function main(currentTime) {

    if (gameOver) {

        if(confirm('Oops you lost. Press OK to restart') ) {

            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = ( currentTime - lastRenderTime ) / 1000;

    if ( secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    console.log("render");
    lastRenderTime = currentTime;

    update(); // call update function

    draw(); // call draw function

}

window.requestAnimationFrame(main); // call main func


//function definition

function update() {
    
    updateSnake();
    updateFood();
    checkDeath();
}

function draw () {

    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {

    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}