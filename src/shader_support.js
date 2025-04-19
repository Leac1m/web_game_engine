"use strict";
import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

let mCompiledShader = null;
let mVertexPositionRef = null;

function loadAndComplileShader(id, shaderType) {
    let shaderSource = null, compiledShader = null;

    // Getting the shader source from index.html
    let shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    let gl = core.getGL();
    // Create shader based on type: vertex or fragment
    compiledShader = gl.createShader(shaderType);

    // Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Checking for errors
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occurred: " + 
            gl.getShaderInfoLog(compiledShader)
        );
    }

    return compiledShader;
}

function init(vertexShaderID, fragmentShaderID) {
    let gl = core.getGL();

    // loading and compiling vertex and fragment shaders
    let vertexShader = loadAndComplileShader(vertexShaderID, gl.VERTEX_SHADER);
    let fragmentShader = loadAndComplileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

    // Create and link the shaders into a program.
    mCompiledShader = gl.createProgram();
    gl.attachShader(mCompiledShader, vertexShader);
    gl.attachShader(mCompiledShader, fragmentShader);
    gl.linkProgram(mCompiledShader);

    // check for error
    if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
        throw new Error("Error linking shader");
        return null;
    }

    // Gers reference to aVertexPosition attribute in the shader
    mVertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPositon");
}

function activate() {
    // access to the webgl context
    let gl = core.getGL();

    // Identify the compiled shafer to use
    gl.useProgram(mCompiledShader);

    // bind vertex buffer to attribute defined in vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(this.mVertexPositionRef,
        3, // each element is a 3-float (x, y, z)
        gl.FLOAT,  //if the content is normalized vectors
        false, // if the content is normailized vectoer
        0,  // number of bytes to skip in between elements
        0); // offsets to the first element
    gl.enableVertexAttribArray(this.mVertexPositionRef);
}

export { init, activate}