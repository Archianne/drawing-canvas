const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorPick = document.querySelector("#color");
const rainbowPick = document.querySelector("#rainbow-button");

let drawing = false;
let rainbowIsOn = false;
let hue = 0;
let lastX = 0;
let lastY = 0;

window.addEventListener("load", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.lineCap = "round";
  ctx.lineWidth = 5;

  function drawStart(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    drawMove(e);
  }

  function drawMove(e) {
    if (!drawing) {
      return;
    } else {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
      ctx.strokeStyle = colorPick.value;
    }

    rainbowActive()
  }

  function touchMove(e) {
    e.preventDefault();
    let touch = e.touches[0];
    touchX = touch.pageX - touch.target.offsetLeft;
    touchY = touch.pageY - touch.target.offsetTop;
    
    if (!drawing) {
      return;
    } else {
      ctx.lineTo(touchX, touchY);
      ctx.stroke();
    }
    rainbowActive()
  }

  function drawEnd() {
    drawing = false;
    ctx.beginPath();
  }

  //mouse
  canvas.addEventListener("mousedown", drawStart);
  canvas.addEventListener("mousemove", drawMove);
  canvas.addEventListener("mouseup", drawEnd);
  canvas.addEventListener("mouseout", drawEnd);

  //touchscreen
  canvas.addEventListener("touchstart", (e) => (drawStart(e.touches[0])), { passive: false });
  canvas.addEventListener("touchmove", touchMove, { passive: false });
  canvas.addEventListener("touchend", () => (drawEnd()), false);

  //rainbow button
  rainbowPick.addEventListener("click", () => {
    rainbowIsOn = !rainbowIsOn;
    rainbowPick.style.backgroundColor = "red";
    if (!rainbowIsOn) {
      ctx.strokeStyle = colorPick.value;
      rainbowPick.style.backgroundColor = "";
    }
  });

  function rainbowActive() {
    if (rainbowIsOn) {
      hue++;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      if (hue >= 360) {
        hue = 0;
      }
    }
  }
});
