// let start;

// const targetBytes = 500 * 1024 * 1024;
// // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D#internalformat
// const bytesPerTexel = 4 as 1 | 2 | 4;
// const textureWidth = 1024;
// const textureHeight = 1024;
// const textures = Math.floor(targetBytes / (textureWidth * textureHeight * bytesPerTexel));
// const actualTargetBytes = textures * textureWidth * textureHeight * bytesPerTexel;

// async function run() {
//     start = performance.now();
//     log(
//         "Started " +
//             textures +
//             " textures, target " +
//             actualTargetBytes / 1024 / 1024 +
//             " MB, width " +
//             textureWidth +
//             ", height " +
//             textureHeight
//     );

//     const canvas2D = document.createElement("canvas")! as HTMLCanvasElement;
//     canvas2D.width = textureWidth;
//     canvas2D.height = textureHeight;
//     const context2D = canvas2D.getContext("2d")!;

//     const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
//     const gl = canvas.getContext("webgl2");
//     let achievedBytes = 0;

//     const allTextures: WebGLTexture[] = [];

//     let i = 0;
//     function doTexture() {
//         if (i >= textures) return;
//         const texture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, texture);
//         // random color
//         context2D.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//         context2D.fillRect(0, 0, textureWidth, textureHeight);

//         switch (bytesPerTexel) {
//             case 1:
//                 gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, gl.ALPHA, gl.UNSIGNED_BYTE, canvas2D);
//                 break;
//             case 2:
//                 gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, canvas2D);
//                 break;
//             case 4:
//                 gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas2D);
//                 break;
//             default:
//                 throw new Error("Invalid bytesPerTexel");
//         }

//         achievedBytes += textureWidth * textureHeight * bytesPerTexel;
//         if (achievedBytes % (1024 * 1024 * 100) === 0) log("Allocated " + achievedBytes / 1024 / 1024 + " MB");

//         allTextures.push(texture);
//         i++;
//         requestAnimationFrame(doTexture);
//     }

//     requestAnimationFrame(doTexture);

//     // for (let i = 0; i < textures; i++) {}

//     // multiply imageUrls
//     // const multiply = 10;
//     // const imageUrls = Array.from({ length: multiply }, () => imageUrlsOrig).flat();

//     // console.log("imageUrls", imageUrls);

//     // const images = await Promise.all<HTMLImageElement>(imageUrls.map(loadImage));
//     // console.log("images", images);

//     // const allTextures: WebGLTexture[] = [];
//     // const bytesPerTexel = 4;
//     // let totalBytes = 0;

//     // for (const image of images) {
//     //     const texture = gl.createTexture();
//     //     const imageBytes = image.width * image.height * bytesPerTexel;
//     //     gl.bindTexture(gl.TEXTURE_2D, texture);
//     //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//     //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//     //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

//     //     // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, image);

//     //     totalBytes += imageBytes;
//     //     allTextures.push(texture);
//     // }

//     log("Done " + achievedBytes / 1024 / 1024 + " MB");
// }

// // async function loadImage(url: string): Promise<HTMLImageElement> {
// //     return new Promise((resolve, reject) => {
// //         const img = new Image();
// //         img.onload = () => resolve(img);
// //         img.onerror = reject;
// //         img.src = url;
// //     });
// // }

// function log(text) {
//     const elapsed = Math.ceil(performance.now() - start);
//     console.log(elapsed, text);

//     const logElement = document.getElementById("log")!;
//     // with date
//     logElement.innerHTML = `${elapsed} ${text}\n${logElement.innerHTML}`;
// }

// document.getElementById("startButton")!.addEventListener("click", run);
