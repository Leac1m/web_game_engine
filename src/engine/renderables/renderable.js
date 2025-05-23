import * as glSys from '../core/gl.js';
import * as shaderResources from '../core/shader_resources.js';
import Transform from '../transform.js'

class Renderable {
    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1]; // color of pixel
        this.mXform = new Transform();
    }

    getXform() { return this.mXform }
    
    draw(camera) {
        let gl = glSys.get();
        this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), camera.getCameraMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color) { this.mColor = color; }
    getColor() { return this.mColor; }

    // funtion to set the shader for the Renderable
    _setShader(s) { this.mShader = s; }

}

export default Renderable;
