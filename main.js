const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorPick = document.querySelector("#color");
const rainbowPick = document.querySelector("#rainbow-button");

let drawing = false;
let rainbowIsOn = false;
let hue = 0;

window.addEventListener("load", () => {
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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

    if (rainbowIsOn) {
      hue++;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      if (hue >= 360) {
        hue = 0;
      }
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
  });

  //rainbow button
  rainbowPick.addEventListener("click", () => {
    rainbowIsOn = !rainbowIsOn;
    if (!rainbowIsOn) {
      ctx.strokeStyle = colorPick.value;
    }
  });
});
