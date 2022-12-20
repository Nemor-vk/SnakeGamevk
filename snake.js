import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 5;
let newSegments = 0;

const snakeBody = [
    {x:10, y:11}
]


export function update() {

    addSegments(); // expands the snake when food overlaps snake head

    let inputDirection = getInputDirection(); //gets key press to move snake

    for (let i = snakeBody.length-2; i >= 0; i--) {

        snakeBody[i + 1] = { ...snakeBody[i] };

    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

}

export function draw(gameBoard) {

    snakeBody.forEach(segment => {

        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

}

//

export function expandSnake(amount) {

    newSegments += amount;
}

export function onSnake(position, { ignoredHead = false} = {} ) {

    return snakeBody.some( (segment, index) => {
        
        // if its on head return false ( snake is not coliding ) & we ignore head
        if(ignoredHead && index === 0) return false;

        return equalPositions(segment, position);
    })
}

function equalPositions(pos1, pos2) {

    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {

    for(let i = 0; i< newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }

    newSegments = 0;
}

// function to get SNake head

export function getSnakeHead () {
    return snakeBody[0];
}

// funtion to check intersection or colision of snake head & body onto itself

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoredHead:true });
}
