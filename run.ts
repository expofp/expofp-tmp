let start = performance.now();

const elMaxMBytes = document.getElementById("maxMBytes")! as HTMLInputElement;
let targetMBytes = parseInt(window.localStorage.getItem("targetMBytes"));
if (!targetMBytes) {
    targetMBytes = 1000;
    window.localStorage.setItem("targetMBytes", targetMBytes.toString());
}
elMaxMBytes.value = targetMBytes.toString();
elMaxMBytes.addEventListener("input", () => {
    targetMBytes = parseInt(elMaxMBytes.value);
    window.localStorage.setItem("targetMBytes", targetMBytes.toString());
    setup();
});

const elBytesPerTexel = document.getElementById("bytesPerTexel")! as HTMLSelectElement;
let bytesPerTexel = parseInt(window.localStorage.getItem("bytesPerTexel")) as 1 | 2 | 4;
if (!bytesPerTexel) {
    bytesPerTexel = 4;
    window.localStorage.setItem("bytesPerTexel", bytesPerTexel.toString());
}
elBytesPerTexel.value = bytesPerTexel.toString();
elBytesPerTexel.addEventListener("input", () => {
    bytesPerTexel = parseInt(elBytesPerTexel.value) as 1 | 2 | 4;
    window.localStorage.setItem("bytesPerTexel", bytesPerTexel.toString());
    setup();
});

document.getElementById("lastMBytes")!.innerText = parseInt(window.localStorage.getItem("achievedBytes")) / 1024 / 1024 + " MB";

const textureWidth = 1024;
const textureHeight = 1024;
const canvas2D = document.createElement("canvas")! as HTMLCanvasElement;
canvas2D.width = textureWidth;
canvas2D.height = textureHeight;
const context2D = canvas2D.getContext("2d")!;

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const gl = canvas.getContext("webgl2");

function setup() {
    const targetBytes = targetMBytes * 1024 * 1024;
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D#internalformat

    const textures = Math.floor(targetBytes / (textureWidth * textureHeight * bytesPerTexel));
    const actualTargetBytes = textures * textureWidth * textureHeight * bytesPerTexel;

    log(
        "Setup " +
            bytesPerTexel +
            " bytes per texel, " +
            textures +
            " textures, target " +
            actualTargetBytes / 1024 / 1024 +
            " MB, width " +
            textureWidth +
            ", height " +
            textureHeight
    );

    async function run() {
        start = performance.now();

        let achievedBytes = 0;

        const allTextures: WebGLTexture[] = [];

        const logEvery = 1024 * 1024 * 100;
        let alreadyLogged = 0;

        let i = 0;
        function doTexture() {
            if (i >= textures) {
                log("Done");
                return;
            }
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            // random color
            context2D.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            context2D.fillRect(0, 0, textureWidth, textureHeight);

            switch (bytesPerTexel) {
                case 1:
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, gl.ALPHA, gl.UNSIGNED_BYTE, canvas2D);
                    break;
                case 2:
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, canvas2D);
                    break;
                case 4:
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas2D);
                    break;
                default:
                    throw new Error("Invalid bytesPerTexel");
            }

            achievedBytes += textureWidth * textureHeight * bytesPerTexel;
            // if (achievedBytes % (1024 * 1024 * 100) === 0) {
            //     log("Allocated " + achievedBytes / 1024 / 1024 + " MB");
            // }
            if (achievedBytes - alreadyLogged > logEvery) {
                log("Allocated " + achievedBytes / 1024 / 1024 + " MB");
                alreadyLogged = achievedBytes;
            }

            window.localStorage.setItem("achievedBytes", achievedBytes.toString());

            allTextures.push(texture);
            i++;
            // doTexture();
            // window.setTimeout(doTexture, 0);
            doTexture();
            // requestAnimationFrame(doTexture);
        }

        doTexture();
    }

    document.getElementById("startButton")!.onclick = run;
}
setup();

function log(text) {
    const elapsed = Math.ceil(performance.now() - start);
    console.log(elapsed, text);
    const logElement = document.getElementById("log")!;
    logElement.innerHTML = `${elapsed} ${text}\n${logElement.innerHTML}`;
}
