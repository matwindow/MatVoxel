function startGame() {
  const canvas = document.getElementById("webgl2");
  if (!canvas) {
    console.error('MatVoxel: canvas element "webgl2" was not found.');
    return;
  }

  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) {
    console.error("MatVoxel: this browser does not support WebGL.");
    return;
  }

  const hud = {
    fps: document.getElementById("fps-text"),
    renderTime: document.getElementById("webgl_-text"),
    realTime: document.getElementById("r-time-text")
  };
  let frameCount = 0;
  let lastFpsTime = performance.now();
  function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 7) return "Sunrise";
  if (hour >= 7 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 20) return "Sunset";
  if (hour >= 20 && hour < 23) return "Evening";
  return "Night";
}
  const r_clock = new Date();

  function resizeCanvas() {
    const width = Math.max(1, canvas.clientWidth || window.innerWidth);
    const height = Math.max(1, canvas.clientHeight || window.innerHeight);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function renderLoop(now) {
    if (true){
      clock.setTime(Date.now());
const h = clock.getHours();
const hh = String(h).padStart(2, '0');
const mm = String(clock.getMinutes()).padStart(2, '0');
const period = getTimeOfDay(h);
hud.realTime.textContent=hh+":"+mm+" ("+period+") [24h]"
    }
    const frameStart = performance.now();
    resizeCanvas();
    gl.clearColor(50 / 255, 50 / 255, 200 / 255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (hud.renderTime) {
      hud.renderTime.textContent = `${(performance.now() - frameStart).toFixed(2)} ms`;
    }

    frameCount++;
    const elapsed = now - lastFpsTime;
    if (elapsed >= 1000) {
      if (hud.fps) {
        hud.fps.textContent = String(Math.round((frameCount * 1000) / elapsed));
      }
      frameCount = 0;
      lastFpsTime = now;
    }
    requestAnimationFrame(renderLoop);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(renderLoop);
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGame, { once: true });
} else {
  startGame();
}
