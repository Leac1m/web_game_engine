"use strict";
import * as vertexBuffer from './vertex_buffer.js'
import * as simpleShader from './shader_support.js';

let mGL = null;
function getGL() { return mGL; }

function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);

    mGL = canvas.getContext("webgl2") || canvas.getContext("experimetal-webgl2");

    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
    mGL.clearColor(0.0, 0.8, 0.0, 1.0);

    // initializing buffer wuth vertex positions for the unit square
    vertexBuffer.init();

    // load and compile the vertex and fragment shaders
    simpleShader.init("VertexShader", "FragmentShader");
}

function clearCanvas() {
    mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
    // Activate the shader
    simpleShader.activate();

    // draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

window.onload = function() {
    initWebGL("GLCanvas");
    clearCanvas();
    drawSquare();
}

export { getGL }