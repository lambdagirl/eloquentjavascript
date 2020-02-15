//The Canvas Element

// <p>Before canvas.</p>
// <canvas width="120" height="60"></canvas>
// <p>After canvas.</p>

let canvas = document.querySelector("canvas");
//create a context with the getContext method on the <canvas> DOM element
let context = canvas.getContext('2d');
context.fillStyle = "red";
context.fillRect(10, 10, 100, 50);
//strokeStyle; strokeRect

// <canvas></canvas>
// <script>
  let cx = document.querySelector("canvas").getContext("2d");
  cx.strokeStyle = "blue";
  cx.strokeRect(5, 5, 50, 50);
  cx.lineWidth = 5;
  cx.strokeRect(135, 5, 50, 50);
// </script>


//PATH
// <canvas></canvas>
// <script>
let cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
for(let y=0; y < 100;y += 10){
    cx.moveTo(10, y);
    cx.lineTo(90, y);
}
cx.stroke();
// </script>

// <script>
let cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
cx.moveTo(50, 10);
cx.lineTo(10,70);
cx.lineTo(90, 70);
cx.fill();
// </script>

//CURVES (quadraticCurveTo;bezierCurveTo)

// <canvas></canvas>
// <script>
let cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
cx.moveTo(10,90);
cx.quadraticCurveTo(60,10,90,90);
cx.lineTo(60,10);
cx.closePath();
cx.stroke();
// </script>

// <canvas></canvas>
// <script>
let cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
cx.moveTo(10,90);
cx.bezierCurveTo(10,10,90,10,50,90);
cx.lineTo(90,30);
cx.lineTo(10,10)
cx.closePath();
cx.stroke();
// </script>


// <canvas></canvas>
// <script>
let cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
//center =(50, 50) radius=40 angle=0 to 7
cx.arc(50, 50, 40, 0, 7);
//center = (150, 50) radius=40 angle=0 to 1/2pi
cx.arc(150, 50, 40, 0, 0.5 * Math.PI);
cx.stroke();
// a line drawn with arc is connected to the previous path segment. 
// </script>

//Drawing a pie chart

const results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
  ];

  //<canvas width="200" height="200"></canvas>
// <script>
let cx = document.querySelector("canvas").getContext("2d");
let total = results.reduce((sum,{count}) => sum + count, 0);
//Start at the top
let currentAngle = -0.5 * Math.PI;
for (let result of results) {
    let sliceAngle = (result.count / total) *2 * Math.PI;
    cx.beginPath();
    //center=100,100 redius=100;
    //from the current angle, clockwise by slice's angle;
    cx.arc(100,100,100, currentAngle,currentAngle+sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(100,100);
    cx.fillStyle = result.color;
    cx.fill();
}
// </script>

//Text (fillText;strokeText)
let cx = document.querySelector("canvas").getContext("2d");
cx.font = "28px Georgia";
cx.fillStyle = "fuchsia";
cx.fillText = ("I can fraw text too!", 10,50)


//Images(vector;bitmap)
let cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src = "img/hat.png";
img.addEventListener("load", ()=> {
    for (let x = 10; x < 200; x +=30){
        cx.drawImage(img, x, 10);
    }
})

// pack multiple sprites(image elements)
let cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src = "img/player.png";
let spriteW = 24; spriteH = 30;
img.addEventListener("load", ()=>{
    let cycle = 0;
    setInterval(() => {
        //make it transparent
        cx.clearRect(0, 0, spriteW, spriteH);
        cx.drawImage(img, 
                    // source rectangle
                    cycle * spriteW, 0, spriteW, spriteH,
                    // destination rectangle;
                    0,0,spriteW, spriteH);
            cycle = (cycle + 1) % 8;
    }, 120)
})

//Transformation

function flipHorizontally(context,around){
    context.translate(around,0);
    context.scale(-1,1);
    context.translate(-around,0)
}

let cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src - "img/player.png";
let spriteW = 24, spriteH = 30;
img.addEventListener("load", ()=>{
    flipHorizontally(cx, 0 + spriteW / 2);
    cx.drawImage(img, 0, 0, spriteW, spriteH, 0, 0, spriteW, spriteH);
})

//Strong and clearing transformations
let cx = document.querySelector("canvas").getContext("2d");
function branch(length, angle, scale){
    cx.fillRect(0,0,1,length);
    if (length < 9) return;
    cx.save();
    cx.translate(0, length);
    cx.rotate(-angle);
    branch(length * scale, angle, scale);
    cx.rotate(2 * angle);
    branch(length * scale, angle, scale);
    cx.restore()
}
cx.translate(300, 0);
branch(90, 0.5,0.8);


//Back to the game

class DOMDisplay {
    constructor(parent, level){
        this.dom = elt("div",{class:"game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }
    clear(){this.dom.remove();}
}

class CanvasDisplay {
    constructor(parent, level){
        this.canvas = document.querySelector("canvas");
        this.canvas.width = Math.min(60, level.width * scale);
        this.canvas.height = Math.min(450, level.height * scale);
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");

        this.flipPlayer = false;

        this.viewport = {
            left:0,
            top:0,
            width: this.canvas.width / scale,
            height: this.canvas.height /scale
        }
    }
    clear(){this.canvas.remove();}
}



CanvasDisplay.prototype.syncState = function(state){
    this.updateViewport(state);
    this.clearDisplay(state.level);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
}

CanvasDisplay.prototype.updateViewport = function(state) {
    let view = this.viewport, margin = view.width / 3;
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5));
  
    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width,
                           state.level.width - view.width);
    }
    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(center.y + margin - view.height,
                          state.level.height - view.height);
    }
  };

  CanvasDisplay.prototype.clearDisplay = function(status) {
    if (status == "won") {
      this.cx.fillStyle = "rgb(68, 191, 255)";
    } else if (status == "lost") {
      this.cx.fillStyle = "rgb(44, 136, 214)";
    } else {
      this.cx.fillStyle = "rgb(52, 166, 251)";
    }
    this.cx.fillRect(0, 0,
                     this.canvas.width, this.canvas.height);
  };

  let otherSprites = document.createElement("img");
  //otherSprites image contains the pictures used for elements other than the player. 
  //the wall tile, the lava tile, and the sprite for a coin.
  otherSprites.src = "img/sprites.png";
  CanvasDisplay.prototype.drawBackground = function(level) {
      let {left, top, width, height} = this.viewport;
      let xStart = Math.floor(left);
      let xEnd = Math.ceil(left, width);
      let xStart = Math.floor(top);
      let xEnd = Math.ceil(top + height);

      for (let y = yStart; y < yEnd; y++) {
          for (let x = xStart; x < xEnd, x ++) {
              let tile = level.rows[y][x];
              if (tile == "empty") continue;
              let screenX = (x - left) * scale;
              let screenY = (y - top) * scale;
              let tileX = tile == "lava" ? scale: 0;
              this.cx.drawImage(otherSprites, 
                                tileX , 0, scale, scale,
                                screenX,screenY,scale,scale);
          }
      }
  }

 

let playerSprites = document.createElement("img");
palyerSprites.src = "img/player.png";
const playerXOverlap = 4;
CanvasDisplay.prototype.drawPlayer = function(player, x, y, width, height) {
    width += playerXOverlap * 2;
    x -= playerXOverlap;
    if (player.speed.x != 0){
        this.flipPlayer == player.speed.x < 0;
    }

    let tile = 8;
    if (player.speed.y != 0){
        tile = 9;
    } else if (player.speed.x != 0){
        tile.Math.floor(Date.now() / 60) % 8;
    }

    this.cx.save;
    if ( this.flipPlayer) {
        flipHorizontally(this.cx, x + width /2);
    }
    let tileX = tile * width;
    this.cx.drawImage(playerSprites, 
                        titleX, 0, width, height,
                        x, y, width, height);
    this.cx.restore();
}