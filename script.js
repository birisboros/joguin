const canvas= document.querySelector("canvas");
const contx= canvas.getContext('2d');
const gforce= 0.5;
var tID;
var sr;
var sr2;
let cara = "sprite0002.png";
var pontosganhos = 1;
var pontuacao = 0;
var pontos= 0;

function score() {
        if (pontosganhos === pontuacao){
                document.getElementById("score").innerHTML = "SCORE :" + " " + " " + pontos;
            }
        else  {
                document.getElementById("time").innerHTML = "TEMPO :" + " " + pontosganhos + "s";
                document.getElementById("score").innerHTML = "SCORE :" + " " + " " + pontos;
                return pontos = pontos + 100;
            }
}
canvas.width= 500;
canvas.height= 500;

contx.fillRect(0, 0, canvas.width, canvas.height);

setInterval(spawnRate, 200);
function spawnRate() {
    sr= Math.floor(Math.random() * 11);
    return sr;
}
spawnRate();

setInterval(spawnRate2, 100);
function spawnRate2() {
    sr2= Math.floor(Math.random() * 11);
    return sr2;
}
spawnRate2();

setInterval(spawnRate3, 1000);
function spawnRate3() {
    pontosganhos ++ ;
    score();
    
}
spawnRate3();

class  Personagem{
    constructor({position, velo, framesMax =1,imageSrc}){
        this.position = position;
        this.velo = velo;
        this.width= 50;
        this.height= 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        
        
    }
    

    drw() {
        
            contx.drawImage(
              this.image,
              this.framesCurrent * (this.image.width / this.framesMax),
              0,
              this.image.width / this.framesMax,
              this.image.height,
              this.position.x,
              this.position.y,
              this.image.width / this.framesMax,
              this.image.height
            )
          }
        
        
    
    animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    
    update() {
        
        this.drw()
        this.animateFrames()
        
        this.position.x += this.velo.x;
        this.position.y += this.velo.y;

        

        if(this.position.y + this.height + this.velo.y >= canvas.height){
            this.velo.y = 0;
        }else {
            this.velo.y += gforce;
            
         }
        
    }
}




const player1 = new Personagem({
    position:{
    x: 10,
    y: 400
},
    velo:{
    x:0,
    y:0
},

imageSrc : cara,
framesMax: 4,



})


const player11 = new Personagem({
    position: player1.position,
    
    velo:{
    x:player1.velo.x,
    y: player1.velo.y
},
imageSrc : "explos.png",
framesMax: 4
})

const player2 = new Personagem({
    position:{
    x: sr * 50,
    y: 10
},
    velo:{
    x:0,
    y:0
},
imageSrc : "comet002.png",
framesMax: 4
})

const player3 = new Personagem({
    position:{
    x: sr2 * 50,
    y: 10
},
    velo:{
    x:0,
    y:0
},
imageSrc : "explos.png",
framesMax: 4
})


const keys = {
    l: {
        pressed: false
    },
    r: {
        pressed: false
    },
    u: {
        pressed: false
    }
}
let lastkey

function anim(){
    
    window.requestAnimationFrame(anim);
    contx.fillStyle= "black";
    contx.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    player2.update();
    player2.update();
    player3.update();
    
    

    player1.velo.x= 0;
    
    if (player1.position.x < player2.position.x + 25 &&
        player1.position.x + 25 > player2.position.x &&
        player1.position.y < player2.position.y + 25 &&
        player1.position.y + 25 > player2.position.y) {
        
        
        pontuacao = pontosganhos + 1;
        console.log("hit")
        player11.update();
        keys.u.pressed = false;
        player1.velo.x= 0;
        player1.velo.y= 0;
        return
    }

    if (keys.l.pressed && lastkey === "Arrowleft") {
       player1.velo.x= -5; 
       if (player1.position.x === 0) {
        player1.velo.x= 5;
        
        }
        
    }
    else if (keys.r.pressed && lastkey === "ArrowRight") {
        player1.velo.x= 5; 
        if (player1.position.x === 450) {
            player1.velo.x= -5;
        }
        
    }
    
    if (player2.position.y === 450) {
        player2.position.y = 0;
        player2.position.x = sr *50;
       
    }
    if (player3.position.y === 450) {
        player3.position.y = 0;
        player3.position.x = sr2 *50;
       
    }
    
    
    
}
anim();

window.addEventListener("keydown" , (event) => {
    switch (event.key) {
        case "ArrowRight":
            keys.r.pressed = true;
            lastkey= "ArrowRight";
            break;
        
        case "ArrowLeft":
            keys.l.pressed = true;
            lastkey= "Arrowleft";
            break;
        
        case "ArrowUp":
            if ((player1.position.y === player2.position.y) && 
            (player1.position.x === player2.position.x)) {
        
        
        
                keys.u.pressed = false;
              
                return
            }
            if (player1.position.y >50) {
                player1.velo.y= -10;
            }
            
            keys.u.pressed = true;
            
            break;
    
       
    }
})

window.addEventListener("keyup" , (event) => {
    switch (event.key) {
        case "ArrowRight":
            keys.r.pressed = false;
            break;
        case "ArrowLeft":
            keys.l.pressed = false;
            break;
        case "ArrowUp":
            keys.u.pressed = false;
             break;
   
    }
})


