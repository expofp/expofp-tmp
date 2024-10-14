import imageUrls from "./imageUrls";

let start = performance.now();

async function run() {
  start = performance.now();
  log("Started");

  console.log("imageUrls", imageUrls);
  const images = await Promise.all<HTMLImageElement>(imageUrls.map(loadImage));
  console.log("images", images);

  const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
  const gl = canvas.getContext("webgl2", {});

  const allTextures: WebGLTexture[] = [];
  const bytesPerTexel = 4;
  let totalBytes = 0;

  for (const image of images) {
    const texture = gl.createTexture();
    const imageBytes = image.width * image.height * bytesPerTexel;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    totalBytes += imageBytes;
    allTextures.push(texture);
  }

  log("Done " + totalBytes/1024/1024 + " MB");
}

async function loadImage(url: string): Promise<HTMLImageElement> {
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
