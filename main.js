const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorPick = document.querySelector("#color");
const rainbowPick = document.querySelector("#rainbow-button");
const sizePick = document.querySelector("#size");
const resetCanvas = document.querySelector("#reset-button");

let drawing = false;
let rainbowIsOn = false;
let hue = 0;
let lastX = 0;
let lastY = 0;

window.addEventListener("load", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.lineCap = "round";
});

//controls
let controls = () => {
  ctx.strokeStyle = colorPick.value;
  ctx.lineWidth = sizePick.value;
}

//drawing start, moving, end
let drawStart = (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  drawMove(e);
}

let drawMove = (e) => {
  if (!drawing) {
    return;
  } else {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    controls();
  }

  isRainbowActive();
}

let touchMove = (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  touchX = touch.pageX - touch.target.offsetLeft;
  touchY = touch.pageY - touch.target.offsetTop;

  if (!drawing) {
    return;
  } else {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(touchX, touchY);
    ctx.stroke();
    [lastX, lastY] = [touchX, touchY];
    controls();
  }
  isRainbowActive();
}

let drawEnd = () => {
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

let isRainbowActive = () => {
  if (rainbowIsOn) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue++;
    if (hue >= 360) {
      hue = 0;
    }
  }
}

//reset canvas
resetCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})
