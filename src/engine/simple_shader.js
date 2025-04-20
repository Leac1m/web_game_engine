import * as glSys from './core/gl.js';
import * as vertexBuffer from './core/vertex_buffer.js';

class SimpleShader {
    constructor(vertexShaderID, fragmentShaderID) {
        this.mCompiledShader = null; // ref to compiled shader in webgl
        this.mVertexPositionRef = null; // ref to VertexPostion in shader
        this.mPixelColorRef = null; // pixelColr uniform in the fragment shader

        let gl = glSys.get();
        // load and compile vertex and fragment shaders
        this.mVertexShader = loadAndComplileShader(vertexShaderID, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndComplileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

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
    }

    activate(pixelColor) {
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
    }
}

function loadAndComplileShader(filePath, shaderType) {
    let xmlReq, shaderSource = null, compiledShader = null;
    let gl = glSys.get();

    // Request the text from the the given file location.
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        throw new Error("Failed to load shader: "
            + filePath
            + " [Hint: you cannot double click to run this project."
            + "The index.html file must be loaded by a web-server.]"
        );
        return null;
    }

    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        throw new Error("WARNING: Loading of:" + filePath + " Failed!");
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