//The Pie Chart

<canvas width="600" height="300"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");
  
  let total = results
    .reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let centerX = 300, centerY = 150;

  // Add code to draw the slice labels in this loop.
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    let textX = centerX;
    let textY = ;
    cx.font = "15px sans-serif";
    cx.fillStyle = "black";
    cx.fillText(result.name, 10, 100);
    
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;

    cx.fill();
    
  }
</script>