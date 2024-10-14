import imageUrls from "./imageUrls";

let start = performance.now();

async function run() {
  start = performance.now();
  log("Started");

  console.log("imageUrls", imageUrls);
  const images = await Promise.all(imageUrls.map(loadImage));
  console.log("images", images);

  const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
  const gl = canvas.getContext("webgl2", {});
  //gl.
  log("Done");
}

async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function log(text) {
  const elapsed = Math.ceil(performance.now() - start);
  console.log(elapsed, text);

  // with date
  document.getElementById("log")!.innerHTML += `${elapsed} ${text}\n`;
}

document.getElementById("startButton")!.addEventListener("click", run);