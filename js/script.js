let head;
let p;
let score = 0;
let apple;
let xSpeed=0;
let ySpeed=0;



function    _draw(){
       head= document.createElement("div");
        head.classList.add("snake-cube");
        document.getElementById("box").append(head);
        p=document.createElement("p");
        p.innerHTML=`score:${score}`;
        p.style.color="black";
        p.style.textAlign="center";
        document.body.append(p);    
    }

    function drawApple(){


        apple=document.createElement("div");
        apple.classList.add("apple");
        apple.id="apple";
        apple.style.left=`${Math.floor(Math.random()*435/15)*15}px`
        apple.style.top=`${Math.floor(Math.random()*435/15)*15}px`
        document.getElementById("box").append(apple);

        if(head.offsetLeft===apple.offsetLeft&&head.offsetTop===apple.offsetTop){
            removeApple();
            drawApple();
        }
    }

    function removeApple(){
        let rApple=document.getElementById("apple");
        rApple.remove();
    }


    function reset(){
        head.style.left=`0px`;
        head.style.top=`0px`;
        score=0;
        
    }



function move(direction){
    let posX=head.offsetLeft;
    let posY=head.offsetTop;
    let aX=apple.offsetLeft;
    let aY=apple.offsetTop;
    
    if(direction.keyCode===37){
        head.style.left=`${posX-15}px`;
        if(head.offsetLeft<0){
            alert("loser");
            reset();

        }
    }
    if(direction.keyCode===38){
        head.style.top=`${posY-15}px`;
        if(head.offsetTop<0){
            alert("loser");
            reset();
          
        }
    }
    if(direction.keyCode===39){
        
        head.style.left=`${posX+15}px`;
        if(head.offsetLeft>435){
            alert("loser");
            reset();
           
        }
    }
    if(direction.keyCode===40){
        head.style.top=`${posY+15}px`;
        if(head.offsetTop>435){
            alert("loser");
            reset();
            
        }
    }

  if(posX===aX&&posY===aY){
      removeApple();
    score++;
    drawApple()
    updateScore()

  }

}

function updateScore(){
    p.innerHTML=`score: ${score}`;
}
let moving = setInterval(function(){move(dir)},1000/15);

function changeDirection(d){
    clearInterval(moving);
    moving=setInterval(function(){move(d)},1000/15);
}

document.onkeydown = function(e){
    changeDirection(e);
}



document.addEventListener("DOMContentLoaded",_draw);
document.addEventListener("DOMContentLoaded",drawApple);


