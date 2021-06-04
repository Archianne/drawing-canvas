const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorPick = document.querySelector("#color");
const rainbowPick = document.querySelector("#rainbow-button");
const sizePick = document.querySelector("#size");
const resetCanvas = document.querySelector("#reset-button");
const saveCanvas = document.querySelector("#save-button");

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
};

//drawing start, moving, end
let drawStart = (e) => {
  let X = e.offsetX;
  let Y = e.offsetY;
  drawing = true;
  [lastX, lastY] = [X, Y];
  drawMove(e);
};

let drawMove = (e) => {
  let X = e.offsetX;
  let Y = e.offsetY;
  if (!drawing) {
    return;
  } else {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(X, Y);
    ctx.stroke();
    [lastX, lastY] = [X, Y];
    controls();
  }

  isRainbowActive();
};

let touchMove = (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  let touchX = touch.pageX - touch.target.offsetLeft;
  let touchY = touch.pageY - touch.target.offsetTop;

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
};

let drawEnd = () => {
  drawing = false;
  ctx.beginPath();
};

//mouse
canvas.addEventListener("mousedown", drawStart);
canvas.addEventListener("mousemove", drawMove);
canvas.addEventListener("mouseup", drawEnd);
canvas.addEventListener("mouseout", drawEnd);

//touchscreen
canvas.addEventListener("touchstart", (e) => drawStart(e.touches[0]), { passive: false });
canvas.addEventListener("touchmove", touchMove, { passive: false });
canvas.addEventListener("touchend", () => drawEnd(), false);

//rainbow button
rainbowPick.addEventListener("click", () => {
  rainbowIsOn = !rainbowIsOn;
  rainbowPick.classList.add("rainbow-active");
  if (!rainbowIsOn) {
    ctx.strokeStyle = colorPick.value;
    rainbowPick.classList.remove("rainbow-active");
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
};

//reset canvas
resetCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//save canvas
saveCanvas.addEventListener("click", () => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `Canvas-${getTime()}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert("File downloaded!");
});

function getTime() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  return date + "-" + month + "-" + year;
}
