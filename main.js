window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  window.addEventListener("resize", resizeCanvas, false);

  //resizing
  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // draw();
  };
  resizeCanvas();

  //variables
  let drawing = false;

  function startPosition() {
      drawing = true;
  }
  
  function endPosition() {
      drawing = false
  }


  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);

  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.lineTo(200,100);
  ctx.stroke();
  //   ctx.fillRect(0, 0, canvas.width, canvas.height)

});
