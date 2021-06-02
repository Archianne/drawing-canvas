const colorPick = document.querySelector("#color");

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  window.addEventListener("resize", resizeCanvas, false);

  //resizing
  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  resizeCanvas();

  //variables
  let drawing = false;

  function draw(e) {
    if (!drawing) {
      return;
    } else {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = colorPick.value;
    }
  }

  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    draw(e);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseout", () => {
    drawing = false;
    ctx.beginPath();
  })

});

// ctx.strokeStyle
