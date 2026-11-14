
let screen={canvas:document.getElementById("webgl2")}
let gl=screen.canvas.getContext('webgl2', {})
function win_resize (){
  let canvas=screen.canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", win_resize);
gl.clearColor(50, 50, 200)
