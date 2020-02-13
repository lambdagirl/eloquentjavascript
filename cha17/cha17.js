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

//CURVES

//Drawing a pie chart
