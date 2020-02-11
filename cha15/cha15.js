//Timers

//setTimeout;clearTimeout
//requestAnimationFrame;cancelAnimationFrame

let bombTimers = setTimeout(() => {
    console.log("Boom!");
},500);
if (Math.random()<0.5){ //50% chance
    console.log("Defused.");
    clearTimeout(bombTimers);
}
//setInterval;cleatInterval
//used to set timers that should repeat every X milliseconds.
let ticks = 0;
let clock = setInterval(() => {
  console.log("tick", ticks++);
  if (ticks == 10) {
    clearInterval(clock);
    console.log("stop.");
  }
}, 200);



//Scroll Event 
// <style>
//   #progress {
//     border-bottom: 2px solid blue;
//     width: 0;
//     position: fixed;
//     top: 0; left: 0;
//   }
// </style>
// <div id="progress"></div>
document.body.appendChild(document.createTextNode(
    "supercalifragilisticexpialidocious ".repeat(1000)
));
let bar = document.querySelector("#progress");
window.addEventListener("scroll", ()=>{
    let max = document.body.scrollHeight - innerHeight;
    bar.style.width = `${(pageYOffset / max)*100}`
})
//pageOffset, the current scroll position


//Pointer Events 

// <style>
//   body {
//     height: 200px;
//     background: beige;
//   }
//   .dot {
//     height: 8px; width: 8px;
//     border-radius: 4px; /* rounds corners */
//     background: blue;
//     position: absolute;
//   }
// </style>
window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX + 4) +"px";
    dot.style.top = (event.pageY + 4) + "px";
    document.body.appendChild(dot);
})
//Mouth motion => mouse draging functions
// <p>Drag the bar to change its width:</p>
// <div style="background: orange; width: 60px; height: 20px">
// </div>
let lastX; //Tracks
let bar = document.querySelector("div");
bar.addEventListener("mousedown", event =>{
    if (event.button == 0){
        lastX = event.clientX;
        window.addEventListener("mousemove",moved);
        event.preventDefault();
    }
});

function moved(event) {
    if (event.buttons == 0){
        window.removeEventListener("mousemove", moved);
    } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
    }
}