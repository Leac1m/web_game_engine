"use strict"

class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0);  // translation
        this.mScale = vec2.fromValues(1, 1);     // width (x), height (y)
        this.mRotationInRad = 0.0;                        // in radians!
    }

    setPosition(xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); }
    getPosition() { return this.mPosition; }
    getXPos() { return this.mPosition[0]; }
    setXPos(xPos) { this.mPosition[0] = xPos; }
    incXPosBy(delta) { this.mPosition[0] += delta; }
    getYPos() { return this.mPosition[1] }
    setYPos(yPos) { this.mPosition[1] = yPos; }
    incYPosBy(delta) { this.mPosition[1] += delta; }

    
    setSize(width, height) { this.setWidth(width); this.setHeight(height); }
    getSize() { return this.mScale; }
    incSizeBy(delta) {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    }
    getWidth() { return this.mScale[0]; }
    setWidth(width) { this.mScale[0] = width; }
    incWidthBy(delta) { this.mScale[0] += delta; }
    getHeight() { return this.mScale[1]; }
    setHeight(height) { this.mScale[1] = height; }
    incHeightBy(delta) { this.mScale[1] += delta; }

    setRotationInRad(rotationInRadians) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }

    getRotationInRad() { return this.mRotationInRad; }
    getRotationInDegress() { return this.mRotationInRad * 180. / Math.PI; }

    setRotationInDegree(rotationInDegree) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
    }

    incRotationByDegree(rotationInDegree) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0)
    }

    incRotationByRad(deltaRad) {
        this.setRotationInRad(this.mRotationInRad + deltaRad)
    }

    getTRSMatrix() {
        // Creates a blank identity matrix
        let matrix = mat4.create();

        mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));

        mat4.rotateZ(matrix, matrix, this.getRotationInRad());
        
        mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

        return matrix;
    }
}

export default Transform;