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

  function startPosition(e) {
      drawing = true;
      draw(e);
  }
  
  function endPosition() {
      drawing = false;
      ctx.beginPath();
  }

  function draw(e) {
      if(!drawing) {
          return
      } else {
          ctx.lineWidth = 5;
          ctx.lineCap = 'round';

          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY)
  }
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw)


});
