import * as engine from '../engine/index.js';


class MyGame {
    constructor(htmlCanvasID) {
        
        // Initialize the game engine
        engine.init(htmlCanvasID);
        
        let trsMatrix = glMatrix.mat4.create();
        // create the Renderable objects
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        // clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);

        glMatrix.mat4.translate(trsMatrix, trsMatrix, glMatrix.vec3.fromValues(-0.25, 0.25, 0.0));
        glMatrix.mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
        glMatrix.mat4.scale(trsMatrix, trsMatrix, glMatrix.vec3.fromValues(1.2, 1.2, 1.0));
        // Draw the square
        this.mWhiteSq.draw(trsMatrix);

        glMatrix.mat4.translate(trsMatrix, trsMatrix, glMatrix.vec3.fromValues(0.25, -0.25, 0.0));
        glMatrix.mat4.rotateZ(trsMatrix, trsMatrix, -0.785);  // abput -45-degrees
        glMatrix.mat4.scale(trsMatrix, trsMatrix, glMatrix.vec3.fromValues(0.4, 0.4, 1.0));
        
        this.mRedSq.draw(trsMatrix);
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}