
let p;
let score = 0;
let apple;
let xSpeed=0;
let ySpeed=0;
let direction=39;

let trail=[];



function    drawHead(){
      let head= document.createElement("div");
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

        if(trail[0].offsetLeft===apple.offsetLeft&&trail[0].offsetTop===apple.offsetTop){
            removeApple();
            drawApple();
        }
    }

    function deleteDead(){
        for(let i=1;i<trail.length;i++)
            trail[i].classList.add("hidden");
    }

    function removeApple(){
        let rApple=document.getElementById("apple");
        rApple.remove();
    }

    function resetScore(){
        score*=0;
    }

    function reset(){
        trail[0].style.left=`0px`;
        trail[0].style.top=`0px`;
        trail=[trail[0]];     
    }


function move(direction){
    let posX=trail[0].offsetLeft;
    let posY=trail[0].offsetTop;
    let aX=apple.offsetLeft;
    let aY=apple.offsetTop;
    
    if(direction.keyCode===37){
        trail[0].style.left=`${posX-15}px`;
        if(trail[0].offsetLeft<0){
            resetScore();
            alert("loser");
            reset();
            clearInterval(moving);
            updateScore()
            deleteDead();
        }
    }
    if(direction.keyCode===38){
        trail[0].style.top=`${posY-15}px`;
        if(trail[0].offsetTop<0){
            resetScore();
            alert("loser");
            reset();
            clearInterval(moving);
            updateScore();
            deleteDead();

        }
    }
    if(direction.keyCode===39){
        trail[0].style.left=`${posX+15}px`;
        if(trail[0].offsetLeft>435){
            resetScore();
            alert("loser");
            reset();
            clearInterval(moving);
            updateScore();
            deleteDead();
        }
    }
    if(direction.keyCode===40){
        trail[0].style.top=`${posY+15}px`;
        if(trail[0].offsetTop>435){
            resetScore(); 
            alert("loser");
            reset();
            clearInterval(moving);
            updateScore();
            deleteDead();   
        }
    }

  if(posX===aX&&posY===aY){
      removeApple();
    score++;
    drawApple()
    updateScore()

   
   newSegment();
    
  }
  for(let i=trail.length-1;i>0;i--)
  {
      trail[i].style.left=`${trail[i-1].offsetLeft}px`;
      trail[i].style.top=`${trail[i-1].offsetTop}px`;
  }
  
}

function updateScore(){
    p.innerHTML=`score: ${score}`;
}
let moving = setInterval(function(){move(direction)},1000/15);

function changeDirection(d){
    clearInterval(moving);
    moving=setInterval(function(){move(d)},1000/15);
}

document.onkeydown = function(e){
    changeDirection(e);
}



document.addEventListener("DOMContentLoaded",drawHead);
document.addEventListener("DOMContentLoaded",drawApple);
document.addEventListener("DOMContentLoaded",writeScore);


