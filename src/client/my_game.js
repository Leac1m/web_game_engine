"use strict";  

import * as loop from '../engine/core/loop.js';
import * as engine from '../engine/index.js';
import SceneFileParser from './util/scene_file_parser.js';


class MyGame {
    constructor() {
        // this.mWhiteSq = null;
        // this.mRedSq = null;

        this.mSceneFile = "assets/scene.xml";
        this.mSqset = [];
        this.mCamera = null;
    }

    init() {
        let sceneParse = new SceneFileParser(engine.xml.get(this.mSceneFile));

        this.mCamera = sceneParse.parseCamera();

        sceneParse.parseSquares(this.mSqset);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.mCamera.setViewAndCameraMatrix();

        let i;
        for (i = 0; i < this.mSqset.length; i++)
            this.mSqset[i].draw(this.mCamera);
    }

    update() {
        let xform = this.mSqset[0].getXform();
        let deltaX = 0.05;

        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (xform.getXPos() > 30)
                xform.setPosition(10, 60);
            xform.incXPosBy(deltaX);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Up))
            xform.incRotationByDegree(1);

        xform = this.mSqset[1].getXform();
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (xform.getWidth() > 5)
                xform.setSize(2, 2);

            xform.incSizeBy(0.05);
        }
    }

    load() {
        engine.xml.load(this.mSceneFile);
    }

    unload() {
        engine.xml.unload(this.mSceneFile);
    }
}

window.onload = function() {
    engine.init('GLCanvas')
    let myGame = new MyGame();

    loop.start(myGame)
}