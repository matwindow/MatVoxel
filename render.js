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

  const hud = {//heherhhehehehehhhjgfkgfhkjdgfhkjgfkgfhkjgfhlj
    fps: document.getElementById("fps-text"),
    renderTime: document.getElementById("webgl_-text"),
    realTime: document.getElementById("r-time-text"),
    cps: document.getElementById("cps-text")
  };

let clicks=[[],[],[]]
  
window.addEventListener('mousedown', (e) => {
  if (e.button === 0 || e.button === 1 || e.button === 2) {
    clicks[e.button].push(performance.now());
  }
});


window.addEventListener('contextmenu', (e) => e.preventDefault());
  
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
     for (let i = 0; i < 3; i++) {
      while (clicks[i].length > 0 && now - clicks[i][0] > 1000) {
        clicks[i].shift();
      }
    }
    if (hud.cps) {
      hud.cps.textContent = `${clicks[0].length}|${clicks[1].length}|${clicks[2].length}`;
    }
    if (true){
      r_clock.setTime(Date.now());
const h = r_clock.getHours();
const hh = String(h).padStart(2, '0');
const mm = String(r_clock.getMinutes()).padStart(2, '0');
const period = getTimeOfDay(h);
hud.realTime.textContent=hh+":"+mm+" ("+period+") [24h]"
    }
    

const cpsText = `CPS: ${clicks[0].length}|${clicks[1].length}|${clicks[2].length}`;

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

        if (window.drawMatVoxelCube) {
      window.drawMatVoxelCube(now);
    }
    requestAnimationFrame(renderLoop);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(renderLoop);
 //==============================
  

}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGame, { once: true });
} else {
  startGame();
}
//===================
(() => {
  const canvas = document.getElementById("webgl2");
  const gl = canvas?.getContext("webgl2");
  if (!gl) return;

  const vs = `#version 300 es
    in vec3 pos;
    in vec3 col;
    uniform float angle;
    uniform float aspect;
    out vec3 vCol;
    void main() {
      float c = cos(angle), s = sin(angle);
      vec3 p = pos;
      p.xz = mat2(c, -s, s, c) * p.xz;
      p.yz = mat2(c, -s, s, c) * p.yz;
      p.z += 3.0;
      gl_Position = vec4(p.x / aspect, p.y, p.z * 0.1, p.z);
      vCol = col;
    }`;

  const fs = `#version 300 es
    precision highp float;
    in vec3 vCol;
    out vec4 outColor;
    void main() { outColor = vec4(vCol, 1.0); }`;

  const prog = gl.createProgram();
  [vs, fs].forEach((src, i) => {
    const sh = gl.createShader(i ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    gl.attachShader(prog, sh);
  });
  gl.linkProgram(prog);

  const verts = new Float32Array([
    -0.5,-0.5, 0.5,  1,0,0,   0.5,-0.5, 0.5,  0,1,0,
     0.5, 0.5, 0.5,  0,0,1,  -0.5, 0.5, 0.5,  1,1,0,
    -0.5,-0.5,-0.5,  1,0,1,   0.5,-0.5,-0.5,  0,1,1,
     0.5, 0.5,-0.5,  1,1,1,  -0.5, 0.5,-0.5,  0.3,0.3,0.3
  ]);

  const idx = new Uint16Array([
    0, 1, 2,  0, 2, 3,
    1, 5, 6,  1, 6, 2,
    5, 4, 7,  5, 7, 6,
    4, 0, 3,  4, 3, 7,
    3, 2, 6,  3, 6, 7,
    4, 5, 1,  4, 1, 0
  ]);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(prog, "pos");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);

  const colLoc = gl.getAttribLocation(prog, "col");
  gl.enableVertexAttribArray(colLoc);
  gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 24, 12);

  const angleLoc = gl.getUniformLocation(prog, "angle");
  const aspectLoc = gl.getUniformLocation(prog, "aspect");

  window.drawMatVoxelCube = (now) => {
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(prog);
    gl.bindVertexArray(vao);
    gl.uniform1f(angleLoc, now * 0.001);
    gl.uniform1f(aspectLoc, canvas.width / canvas.height);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  };
})();
