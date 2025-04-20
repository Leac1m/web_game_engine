"use strict";
import * as glSys from "./gl.js";

let mGLVertexBuffer = null;
function get() { return mGLVertexBuffer; }

let mVerticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

function init() {
    let gl = glSys.get();

    //Creating a buffer
    mGLVertexBuffer = gl.createBuffer();

    // Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);

    // Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, 
        new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW
    );
}

export {init, get}