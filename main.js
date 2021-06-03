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

  function drawStart(e) {
    drawing = true;
    ctx.beginPath();
    drawMove(e);
  }

  function drawMove(e) {
    if (!drawing) {
      return;
    } else {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
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

  function drawEnd() {
    drawing = false;
    ctx.beginPath();
  }

  canvas.addEventListener("mousedown", drawStart);
  canvas.addEventListener("mousemove", drawMove);
  canvas.addEventListener("mouseup", drawEnd);
  canvas.addEventListener("mouseout", drawEnd);
  
  //touchscreen
  canvas.addEventListener("touchstart", (e) => {
      drawStart(e.touches[0]);
    }, { passive: false }
  );

  canvas.addEventListener("touchmove", (e) => {
      drawMove(e.touches[0]);
      e.preventDefault();
    }, { passive: false }
  );

  canvas.addEventListener("touchend", (e) => {
      drawEnd(e.changedTouches[0]);
    }, false
  );

  //rainbow button
  rainbowPick.addEventListener("click", () => {
    rainbowIsOn = !rainbowIsOn;
    rainbowPick.style.backgroundColor = "red";
    if (!rainbowIsOn) {
      ctx.strokeStyle = colorPick.value;
      rainbowPick.style.backgroundColor = "";
      }
    });
    
});
