"use strict";  

import * as engine from '../engine/index.js';
import BlueLevel from './blue_level.js';
import SceneFileParser from './util/scene_file_parser.js';


class MyGame extends engine.Scene {
    constructor() {
        super();

        // audio clips: supports both mp3 and wav formats
        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/my_game_cue.wav";

        // textures:
        this.kPortal = "assets/minion_portal.png"; // supports png with transpareny
        this.kCollector = "assets/minion_collector.png";


        this.mSceneFile = "assets/scene.xml";
        this.mSqset = [];
        this.mCamera = null;
        this.mPortal = null;
        this.mCollector = null;
    }

    init() {
        let sceneParse = new SceneFileParser(engine.xml.get(this.mSceneFile));

        this.mCamera = sceneParse.parseCamera();

        this.mPortal = new engine.TextureRenderable(this.kPortal);
        this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
        this.mPortal.getXform().setPosition(25, 60);
        this.mPortal.getXform().setSize(3, 3);

        this.mCollector = new engine.TextureRenderable(this.kCollector);
        this.mCollector.setColor([0, 0, 0, 0]); // No tinting
        this.mCollector.getXform().setPosition(15, 60);
        this.mCollector.getXform().setSize(2, 3);

        sceneParse.parseSquares(this.mSqset);

        engine.audio.playBackground(this.mBackgroundAudio, 1.0);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.mCamera.setViewAndCameraMatrix();

        this.mPortal.draw(this.mCamera);
        let i;
        for (i = 0; i < this.mSqset.length; i++)
            this.mSqset[i].draw(this.mCamera);
        this.mCollector.draw(this.mCamera);
    }

    update() {
        let xform = this.mSqset[0].getXform();
        let deltaX = 0.05;

        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            engine.audio.playCue(this.mCue, 0.5);
            engine.audio.incBackgroundVolume(0.05);
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30)
                xform.setPosition(10, 60);
        }

        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            engine.audio.playCue(this.mCue, 1.5);
            engine.audio.incBackgroundVolume(-0.05);
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11)
                this.next();
        }

        if (engine.input.isKeyClicked(engine.input.keys.Up))
            xform.incRotationByDegree(1);

        // xform = this.mSqset[1].getXform();
        // if (engine.input.isKeyPressed(engine.input.keys.Down)) {
        //     if (xform.getWidth() > 5)
        //         xform.setSize(2, 2);

        //     xform.incSizeBy(0.05);
        // }

        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop();

        let c = this.mPortal.getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }

    next() {
        super.next();

        // next scene to run
        let nextLevel = new BlueLevel();
        nextLevel.start();
    }

    load() {
        engine.xml.load(this.mSceneFile);
        // loads the audios
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);

        // load the texture
        engine.texture.load(this.kPortal);
        engine.texture.load(this.kCollector);
    }

    unload() {
        engine.audio.stopBackground();
        
        engine.xml.unload(this.mSceneFile);

        // unload the scene resource
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);

        // Game loop not running, unload all assets
        engine.texture.unload(this.kPortal);
        engine.texture.unload(this.kCollector);
    }
}

export default MyGame;

window.onload = function() {
    engine.init('GLCanvas')
    let myGame = new MyGame();

    myGame.start()
}