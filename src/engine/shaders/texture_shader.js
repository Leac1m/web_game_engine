import * as vertexBuffer from '../core/vertex_buffer.js';
import * as glSys from '../core/gl.js';
import SimpleShader from './simple_shader.js'

class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);

        // reference to aTextureCoordinate within the shader
        this.mTextureCoordinateRef = null;

        // get the reference of aTextureCoordinate within the shader
        let gl = glSys.get();
        this.mTextureCoordinateRef = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
        this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");

    }

    // Overriding the Activation of the shader for rendering
    activate(pixelColor, trsMatrix, cameraMatrix) {
        // first call the super class's activate
        super.activate(pixelColor, trsMatrix, cameraMatrix);

        // now our own functionality: enable texture coordinate array
        let gl = glSys.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexcoordBuffer());
        gl.vertexAttribPointer(this.mTextureCoordinateRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mTextureCoordinateRef);

        // bind uSampler to texture 0
        gl.uniform1i(this.mSamplerRef, 0);
            // texture.activateTexture() binds to Texture0
    }

    _getTexcoordBuffer() { return vertexBuffer.getTextCoord(); }
}

export default TextureShader;