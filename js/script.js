localStorage.setItem("highScore",0);
let highScore=localStorage.getItem("highScore");//for highscore
let p;//for curent score
let score = 0;
let apple;//for apple
const direction=39;//start direction
let trail=[];//array of snake
let head;//for snake head
let pausable = true;
let speed=5;
let totalScore=0

function    drawHead(){
       head= document.createElement("div");
        head.classList.add("snake-cube");
        document.getElementById("box").append(head);
        trail.push(head);
    }
    function newSegment(){
        let newSeg=document.createElement("div");
        newSeg.classList.add("snake-cube");
        newSeg.classList.add("new")
        newSeg.style.left=`${trail[trail.length-1].offsetLeft}px`;
        newSeg.style.top=`${trail[trail.length-1].offsetTop}px`;
        document.getElementById("box").append(newSeg); 
        trail.push(newSeg);
    }
function writeScore(){
    p=document.createElement("p");
    p.innerHTML=`score:${totalScore}`;
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


    function end(){
        alert("loser");
        clearInterval(moving);
        updateScore();
        if(score>highScore){
            alert("congrats u have high score!"+ totalScore +", highscore was:" + highScore )
            localStorage["highScore"]=totalScore;
            highScore=localStorage.getItem("highScore");
        }
        reset();
        speed=5;
        totalScore=0;
        score*=0;
    }
  

    function removeApple(){
        let rApple=document.getElementById("apple");
        rApple.remove();
    }

    function reset(){
        for(let i=0;i<trail.length;i++){
           if(i==0){ 
        head.style.left=`0px`;
        head.style.top=`0px`;            
    }
    else 
        trail[i].style.display="none";
    }

    trail.splice(1);
    console.log(trail);
    
}

function move(direction){
    let posX=head.offsetLeft;
    let posY=head.offsetTop;
    let aX=apple.offsetLeft;
    let aY=apple.offsetTop;
    if(posX===aX&&posY===aY){
        removeApple();
      score++;
      totalScore++;
      drawApple()
      updateScore()
     newSegment();  
    }
    for(let i=trail.length-1;i>0;i--)
  {
      trail[i].style.left=`${trail[i-1].offsetLeft}px`;
      trail[i].style.top=`${trail[i-1].offsetTop}px`;
  }



    if(direction.keyCode===37){
        head.style.left=`${posX-15}px`;
        if(head.offsetLeft<0){
            end();
        }
        
        for(let i=1;i<trail.length;i++){
            if(head.offsetTop===trail[i].offsetTop&&head.offsetLeft===trail[i].offsetLeft)
                end();
  }
    }
    if(direction.keyCode===38){
        head.style.top=`${posY-15}px`;
        if(head.offsetTop<0){
            end();
        }
        
   for(let i=1;i<trail.length;i++){
    if(head.offsetTop===trail[i].offsetTop&&head.offsetLeft===trail[i].offsetLeft)
        end();
  }
    }
    if(direction.keyCode===39){
        head.style.left=`${posX+15}px`;
        if(head.offsetLeft>435){
            end()
        }
        
   for(let i=1;i<trail.length;i++){
    if(head.offsetTop===trail[i].offsetTop&&head.offsetLeft===trail[i].offsetLeft)
        end();
  }


    }
    if(direction.keyCode===40){
        head.style.top=`${posY+15}px`;
        if(head.offsetTop>435){ 
            end();
        }
        for(let i=1;i<trail.length;i++){
         if(head.offsetTop===trail[i].offsetTop&&head.offsetLeft===trail[i].offsetLeft)
             end();
       }
    }

    if(score>=5){
        speed*=2;
        score*=0;
    }
        
    
}

function updateScore(){
    p.innerHTML=`score: ${totalScore}`;
    localStorage["highScore"]=score

}


let moving = setInterval(function(){move(direction)},1000/speed);

function changeDirection(d){
    clearInterval(moving);
    moving=setInterval(function(){move(d)},1000/speed);
}

document.onkeydown = function(e){
    changeDirection(e);
}




document.addEventListener("DOMContentLoaded",drawHead);
document.addEventListener("DOMContentLoaded",drawApple);
document.addEventListener("DOMContentLoaded",writeScore);


