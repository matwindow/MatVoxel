let game_screen = { canvas: document.getElementById("webgl2") };
let gl = game_screen.canvas.getContext("webgl2", {});

let frameCount = 0;
let lastFpsTime = 0;

function win_resize() {
  let canvas = game_screen.canvas;
  canvas.width = Math.max(1, canvas.clientWidth || window.innerWidth);
  canvas.height = Math.max(1, canvas.clientHeight || window.innerHeight);
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
  renderTime: document.getElementById("webgl_-text")
};

function renderLoop(now) {
  const frameStart = performance.now();

  gl.clearColor(50 / 255, 50 / 255, 200 / 255, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const renderMs = performance.now() - frameStart;
  hud.renderTime.textContent = `${renderMs.toFixed(2)} ms`;

  frameCount++;
  if (now - lastFpsTime >= 1000) {
    hud.fps.textContent = String(frameCount);
    frameCount = 0;
    lastFpsTime = now;
  }

  requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);
