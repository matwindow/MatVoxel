let game_screen = { canvas: document.getElementById("webgl2") };
let gl = game_screen.canvas.getContext("webgl2", {});

function win_resize() {
  let canvas = game_screen.canvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);


  gl.clearColor(50 / 255, 50 / 255, 200 / 255, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.addEventListener("resize", win_resize);


win_resize();


const hud = {
  fps: document.getElementById("fps-text"),
  pos: document.getElementById("pos-text"),
  realTime: document.getElementById("r-time-text"),
  realTime: document.getElementById("webgl_-text")
};


function renderLoop(now) {
  const frameStart = performance.now();


  gl.clearColor(50 / 255, 50 / 255, 200 / 255, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);


  
  const renderMs = performance.now() - frameStart;
  gui.rendertime.textContent = `${renderMs.toFixed(2)} ms`;

  
  frameCount++;
  if (now - lastFpsTime >= 1000) {
    hud.fps.textContent = frameCount;
    frameCount = 0;
    lastFpsTime = now;
  }

 
  requestAnimationFrame(renderLoop);
}


requestAnimationFrame(renderLoop);
