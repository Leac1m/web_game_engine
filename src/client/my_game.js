import * as engine from '../engine/index.js';



class MyGame {
    constructor(htmlCanvasID) {
        
        // Initialize the game engine
        engine.init(htmlCanvasID);
        
        let transform = new engine.Transform();

        let trsMatrix = glMatrix.mat4.create();
        // create the Renderable objects
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        // clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);

        this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setSize(1.2, 1.2);
        // Draw the square
        this.mWhiteSq.draw();

        this.mRedSq.getXform().setXPos(0.25);
        this.mRedSq.getXform().setYPos(-0.25);
        this.mRedSq.getXform().setRotationInDegree(45);
        this.mRedSq.getXform().setWidth(0.4);
        this.mRedSq.getXform().setHeight(0.4);
        
        this.mRedSq.draw();
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}