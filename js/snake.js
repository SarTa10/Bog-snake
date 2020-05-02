localStorage.setItem("highScore",0);

class Game{
    /*
                constructor()
        we are creating head for snake and we are making array for it's body, apple, and scoreboard for our scores.
        int this constructor we are setting base position for our sanke adn it's body by using this._startPosition() function.
        at start snake has length of 5
    */
    constructor(){
        this.head=document.createElement("div");
        this.head.classList.add("snake-cube");
        document.getElementById("box").appendChild(this.head);
        this.body=[this.head];
        this.apple=document.getElementById("apple");
        this.score=document.getElementById("score");
        this.scoreValue=0;
        this.highScore=localStorage.getItem("highScore");
        this._startPosition();
        this.startLength=5;
        for(let i=1;i<this.startLength;i++){
            const seg=document.createElement("div");
            seg.classList.add("snake-cube");
            seg.style.left=`${this.head.offsetLeft-15*i}px`;
            document.getElementById("box").appendChild(seg);
            this.body.push(seg);
        
        }
    }


        /*
            this function returns if snake died or not. if snake hits border of the box or eats himself this function @returns true otherwise false
        */
    _dead(){
        if(this.head.offsetLeft<0||this.head.offsetLeft>435||this.head.offsetTop<0||this.head.offsetTop>435)
            return true;
       { for(let i=1;i<this.body.length;i++)
        {
            if(this.head.offsetTop===this.body[i].offsetTop&&this.head.offsetLeft===this.body[i].offsetLeft)
                return true;
        }
        return false;
        }
    }
        /*
            this function set's base position for snake head and also set's the scoreValue to 0
        */
    _startPosition(){
        this.head.style.left="60px";
        this.head.style.top="0px";
        this.scoreValue=0;
    }

        /*
            with this function we can track if player hit the high score or not
            after player dies if his current score will be higher than highscore it will alert message and change the highscore value
        */

    _checkHighScore(){
        if(this.scoreValue>this.highScore)
        {
            alert("congatulation! new Highscore")
            this.highScore=this.scoreValue;
            localStorage["highScore"]=this.highScore;
        }
    }
    
    /*
        this is move function which helps snake to move around. at start it set's the position of it's tale.
        in the switch we give it direction and based on it's value snake move in that direction
        37 -> left
        38 -> up
        39 -> right
        40 -> down

        by default direction is 39(right)
    */
    _move(direction){
        for(let i=this.body.length-1;i>0;i--)
        {
            this.body[i].style.left=`${this.body[i-1].offsetLeft}px`;
            this.body[i].style.top=`${this.body[i-1].offsetTop}px`;
        }

        switch(direction){
            case 37:
                this.head.style.left=`${this.head.offsetLeft-15}px`;
                break;
            case 38:
                this.head.style.top=`${this.head.offsetTop-15}px`;
                break;
            case 39:
                this.head.style.left=`${this.head.offsetLeft+15}px`;
                break;
            case 40:
                this.head.style.top=`${this.head.offsetTop+15}px`;
                break;    
        }
    }

    /*
        one of the main thing in tetris is apple(food). if head's possition is same as apple's positon this function will return true and increase scoreValue by 1
        if it is not same than it will return false
    */
    _eat(){
        if(this.head.offsetLeft===this.apple.offsetLeft&&this.head.offsetTop===this.apple.offsetTop)
           {
                this.scoreValue++
                return true;
           }
        return false;

    }

    /*
        here we update score on screen
    */
    _updateScore(){
        this.score.innerHTML=`Score:${this.scoreValue}`
    }

    /*
        after snake eats apple we need to respawn new apple by giving it position this function is seting new possition for new apple
    */
    _spawnApple(){
        let ax=Math.floor(Math.random()*435/15)*15;
        let ay=Math.floor(Math.random()*435/15)*15;

        this.apple.style.left=`${ax}px`;
        this.apple.style.top=`${ay}px`;
    }
    /*
        after snake eats apple it sould increase it's body
        here we create new segment for our snake and pushing it into our array
    */
    _grow(){
        let newSeg=document.createElement("div");
        newSeg.classList.add("snake-cube");
        document.getElementById("box").appendChild(newSeg);

        this.body.push(newSeg);
    }
    /*
    after snake dies game should reset everything
    snake must have hangth of 5,  it should have base position and scoreValue should be 0 . we are doing it by calling _startPosition();
    and with for loop
    if segment is from base length it sould reset it's position otherwise it will delete it from array and from screeen
    */
    _reset(){
        this._startPosition();
        for(let i=this.body.length-1;i>0;i--)
            if(i>=this.startLength){
                this.body[i].parentNode.removeChild(this.body[i]);
                this.body.pop();
            }
            else{
                this.body[i].style.top="0px";
                this.body[i].style.left=`${this.head.offsetLeft-i*15}px`;
            }
    }

}

export {Game};