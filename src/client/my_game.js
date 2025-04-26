"use strict";  

import * as loop from '../engine/core/loop.js';
import * as engine from '../engine/index.js';


class MyGame {
    constructor() {
        this.mWhiteSq = null;
        this.mRedSq = null;

        this.mCamera = null;
    }

    init() {
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );

        this.mCamera.setBackground([0.8, 0.8, 0.8, 1]);

        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        this.mWhiteSq.getXform().setPosition(20, 60);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setSize(2, 2);

        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.mCamera.setViewAndCameraMatrix();

        this.mWhiteSq.draw(this.mCamera);

        this.mRedSq.draw(this.mCamera);
    }

    update() {
        let whiteXform = this.mWhiteSq.getXform();
        let deltaX = 0.05;

        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (whiteXform.getXPos() > 30)
                whiteXform.setPosition(10, 60);
            whiteXform.incXPosBy(deltaX);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Up))
            whiteXform.incRotationByDegree(1);

        let redXform = this.mRedSq.getXform();
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (redXform.getWidth() > 5)
                redXform.setSize(2, 2);

            redXform.incSizeBy(0.05);
        }
    }
}

window.onload = function() {
    engine.init('GLCanvas')
    let myGame = new MyGame();

    loop.start(myGame)
}