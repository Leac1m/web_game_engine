import * as engine from '../engine/index.js';


class MyGame {
    constructor(htmlCanvasID) {
        // Initialize the game engine
        engine.init(htmlCanvasID);

        // create the Renderable objects
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        // clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);

        // Draw the square
        this.mWhiteSq.draw();
        this.mRedSq.draw();
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}