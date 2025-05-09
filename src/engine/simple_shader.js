import * as glSys from './core/gl.js';
import * as vertexBuffer from './core/vertex_buffer.js';
import * as text from './resources/text.js';

class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.mCompiledShader = null; // ref to compiled shader in webgl
        this.mVertexPositionRef = null; // ref to VertexPostion in shader
        this.mPixelColorRef = null; // pixelColr uniform in the fragment shader
        this.mModelMatrixRef = null;
        this.mCameraMatrixRef = null;

        let gl = glSys.get();
        // compile vertex and fragment shaders
        this.mVertexShader = complileShader(vertexShaderPath, gl.VERTEX_SHADER);
        this.mFragmentShader = complileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

        // Create and link the shaders into a program.
        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);

        // Check for erro
        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
            return null;
        }

        // Reference to aVertexPosition attribute in the shaders
        this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");

        // Gets uniform variable uPixelColor in fragment shader
        this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");

        this.mModelMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uModelXformMatrix");

        this.mCameraMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uCameraXformMatrix");
    }

    activate(pixelColor, trsMatrix, cameraMatrix) {
        let gl = glSys.get();
        gl.useProgram(this.mCompiledShader);

        // bind vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef,
            3, // each element is a 3-float (x,y,z)
            gl.FLOAT,  // data type is FLOAT
            false,  // if the content is normalied vectors
            0,  // number of bytes to skip in between elements
            0); // offsets to the firstt element
        
        gl.enableVertexAttribArray(this.mVertexPositionRef);

        // load uniforms
        gl.uniform4fv(this.mPixelColorRef, pixelColor);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
    }

    cleanUp() {
        let gl = glSys.get();
        gl.detachShader(this.mCompiledShader, this.mVertexShader);
        gl.detachShader(this.mCompiledShader, this.mFragmentShader);
        gl.deleteShader(this.mVertexShader);
        gl.deleteShader(this.mFragmentShader);
        gl.deleteProgram(this.mCompiledShader);
    }
}

function complileShader(filePath, shaderType) {
    let shaderSource = null, compiledShader = null;
    let gl = glSys.get();

    // Access the textfile
    shaderSource = text.get(filePath);

    if (shaderSource === null) {
        throw new Error("WARNING:" + filePath + " not loaded!");
        return null;
    }

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

export default SimpleShader;