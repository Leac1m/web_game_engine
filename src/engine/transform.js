

class Transform {
    constructor() {
        this.mPosition = glMatrix.vec2.fromValues(0, 0);  // translation
        this.mScale = glMatrix.vec2.fromValues(1, 1);     // width (x), height (y)
        this.mRotationInRad = 0.0;                        // in radians!
    }

    setPosition(xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); }

    getPosition() { return this.mPosition; }

    setXPos(xPos) { this.mPosition[0] = xPos; }

    getXPos() { return this.mPosition[0]; }

    setYPos(yPos) { this.mPosition[1] = yPos; }

    getYPos() { this.mPosition[1] }

    setSize(width, height) { this.setWidth(width); this.setHeight(height); }

    getSize() { return this.mScale; }

    setWidth(width) { this.mScale[0] = width; }

    getWidth() { return this.mScale[0]; }

    setHeight(height) { this.mScale[1] = height; }

    getHeight() { return this.mScale[1]; }

    setRotationInRad(rotationInRadians) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }

    getRotationInRad() {return this.mRotationInRad; }

    setRotationInDegree(rotationInDegree) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
    }

    getTRSMatrix() {
        // Creates a blank identity matrix
        let matrix = glMatrix.mat4.create();

        glMatrix.mat4.translate(matrix, matrix, glMatrix.vec3.fromValues(this.getXPos(), this.getHeight(), 0.0));

        glMatrix.mat4.rotateZ(matrix, matrix, this.getRotationInRad());
        
        glMatrix.mat4.scale(matrix, matrix, glMatrix.vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

        console.log({"X": this.getXPos(), "Y": this.getXPos()});
        return matrix;
    }
}

export default Transform;