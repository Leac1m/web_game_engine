import * as glSys from "./core/gl.js";

class Camera {
    constructor(wcCenter, wcWidth, viewportArray) {
        // WC and viewport position and size
        this.mWCCenter = wcCenter;
        this.mWCWidth = wcWidth;
        this.mViewport = viewportArray; // [x, y, width, height]

        // Camera transform operator
        this.mCameraMatrix = mat4.create();

        // backgroud color
        this.mBGColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
    }

    getWCHeight() {
        let ratio = this.mViewport[eViewport.eHeight] / this.mViewport[eViewport.eWidth];
        return this.getWCWidth() * ratio;
    }

    getWCWidth() {
        return this.mWCWidth;
    }

    setWCCenter(xPos, yPos) {
        this.mWCCenter[0] = xPos;
        this.mWCCenter[1] = yPos;
    }
    getWCCenter() { return this.mWCCenter; }
    setWCCenter(width) { this.mWCWidth = width; }

    setViewport(viewportArray) { this.mViewport = viewportArray; }
    getViewport() { return this.mViewport; }

    setBackgroundColor(newColor) { this.mBGColor = newColor; }
    getBackgroundColor() { return this.mBGColor; }

    setViewAndCameraMatrix() {
        let gl = glSys.get();

         gl.viewport(
            this.mViewport[0], // x position of bottom-left corner of the area to be drawn
            this.mViewport[1], // y position of bottom-left corner of the area to be drawn 
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]);   // height of area to be drawn

        // set up the corresponding scisseor area to clear area
        gl.scissor(this.mViewport[0], // x position of bottom-left corner of the area to be drawn
            this.mViewport[1], // y position of bottom-left corner of the area to be drawn 
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]
        );

        
        // enable scissor area, clear and the disable the scissor area
        gl.enable(gl.SCISSOR_TEST);
        gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        // Compute the Camera Matrix
        let center = this.getWCCenter();

        // scale to -1 to 1: 2x2 square at orign
        mat4.scale(this.mCameraMatrix, mat4.create(), vec3.fromValues(2.0/this.getWCWidth(), 2.0/this.getWCHeight(), 1.0));

        // first translate camera center to the origin
        mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], 0));
    }
    
    getCameraMatrix() { return this.mCameraMatrix; }
}

const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
})

export default Camera;