"use strict";
import * as vertexBuffer from './vertex_buffer.js'
import SimpleShader from './simple_shader.js';

let mGL = null;
let mShader = null;

function getGL() { return mGL; }


function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);

    mGL = canvas.getContext("webgl2") || canvas.getContext("experimetal-webgl2");

    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
    // mGL.clearColor(0.0, 0.8, 0.0, 1.0);
}


function drawSquare() {
    // Activate the shader
    mShader.activate();

    // draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}


function createShader() {
    mShader = new SimpleShader(
        "src/glsl_shaders/simple_vs.glsl",  // Path to VertexShader
        "src/glsl_shaders/white_fs.glsl"    // Path to FragmentShader
    );
}

function clearCanvas(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color set
}

function init(htmlCanvasID) {
    initWebGL(htmlCanvasID);  // setup mGL
    vertexBuffer.init();     // setup mGLVertexBuffer
    createShader();          // create the shader
}
export { getGL, init, clearCanvas, drawSquare }