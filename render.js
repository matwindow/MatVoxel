let screen = { canvas: document.getElementById("webgl2") };
let gl = screen.canvas.getContext("webgl2", {});

function win_resize() {
  let canvas = screen.canvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);


  gl.clearColor(50 / 255, 50 / 255, 200 / 255, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.addEventListener("resize", win_resize);


win_resize();
