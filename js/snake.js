localStorage.setItem("highScore",0);

class Game{
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

    _startPosition(){
        this.head.style.left="60px";
        this.head.style.top="0px";
        this.scoreValue=0;
    }

    _checkHighScore(){
        if(this.scoreValue>this.highScore)
        {
            alert("congatulation! new Highscore")
            this.highScore=this.scoreValue;
            localStorage["highScore"]=this.highScore;
        }
    }
    
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

    _eat(){
        if(this.head.offsetLeft===this.apple.offsetLeft&&this.head.offsetTop===this.apple.offsetTop)
           {
                this.scoreValue++
                return true;
           }
        return false;

    }
    _updateScore(){
        this.score.innerHTML=`Score:${this.scoreValue}`
    }

    _spawnApple(){
        let ax=Math.floor(Math.random()*435/15)*15;
        let ay=Math.floor(Math.random()*435/15)*15;

        this.apple.style.left=`${ax}px`;
        this.apple.style.top=`${ay}px`;
    }

    _grow(){
        let newSeg=document.createElement("div");
        newSeg.classList.add("snake-cube");
        document.getElementById("box").appendChild(newSeg);

        this.body.push(newSeg);
    }

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