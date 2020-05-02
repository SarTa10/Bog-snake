import {Game} from './snake.js';

let direction =39;
let moving;

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const pauseBtn = document.getElementById("pause");


document.onkeydown=function(e){
    if(Math.abs(direction-e.keyCode) !== 2)
        if(e.keyCode>36 && e.keyCode<41)
    direction=e.keyCode;
}

const Snake = new Game()
Snake._spawnApple();

function stopGame (){
    clearInterval(moving);
    Snake._reset();
}

function pauseGame(){
    clearInterval(moving);
}


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


startBtn.addEventListener("click",startGame);

stopBtn.addEventListener("click",stopGame);

pauseBtn.addEventListener("click",pauseGame)