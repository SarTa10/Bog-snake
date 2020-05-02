import {Game} from './snake.js';

let direction =39;//setting default value for direction (right)
let moving;

//variables for buttons on screen;
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const pauseBtn = document.getElementById("pause");

/*
    this function first checks if the new direction is oposite of last direction and if it is not oposite it will change it and if it is oposite that it iwll do nothing
*/
document.onkeydown=function(e){
    if(Math.abs(direction-e.keyCode) !== 2)
        if(e.keyCode>36 && e.keyCode<41)
    direction=e.keyCode;
}
//creating game and placing apple on boxl
const Snake = new Game()
Snake._spawnApple();


/*
    this function stops game and resets everything
*/
function stopGame (){
    clearInterval(moving);
    Snake._reset();
}

/*
    this function pauses the game
*/

function pauseGame(){
    clearInterval(moving);
}

/*
this function starts the game. game will wait until someone presees start button
*/
function startGame(){
 moving = setInterval(function(){
    Snake._move(direction);
    if(Snake._eat()){
        Snake._grow();
        Snake._spawnApple();
        Snake._updateScore();
    }
    if(Snake._dead()){
        Snake._checkHighScore();
        Snake._reset();
        Snake._updateScore();
        direction=39;
        clearInterval(moving);

    }
    
},1000/15)
}

//adding events for buttons.
startBtn.addEventListener("click",startGame);

stopBtn.addEventListener("click",stopGame);

pauseBtn.addEventListener("click",pauseGame);