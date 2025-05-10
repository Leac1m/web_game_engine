import * as engine from '../engine/index.js';
import SceneFileParser from './util/scene_file_parser.js';
import MyGame from './my_game.js';

class BlueLevel extends engine.Scene {
    constructor() {
        super();
        // audio clips: support both mp3 and wav formats
        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/blue_level_cue.wav";

        this.mSceneFile = "assets/blue_level.xml";
        this.mSqset = [];
        this.mCamera = null;
    }

    init() {
        let sceneParse = new SceneFileParser(engine.xml.get(this.mSceneFile));

        this.mCamera = sceneParse.parseCamera();

        sceneParse.parseSquares(this.mSqset);

        // start Background music
        engine.audio.playBackground(this.mBackgroundAudio, 0.5);
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
            engine.audio.playCue(this.mCue, 0.5);
            if (xform.getXPos() > 30)
                xform.setPosition(10, 60);
            xform.incXPosBy(deltaX);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Up))
            xform.incRotationByDegree(1);

        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            engine.audio.playCue(this.mCue, 1.0);
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11)
                this.next();
        }

        // xform = this.mSqset[1].getXform();
        // if (engine.input.isKeyPressed(engine.input.keys.Down)) {
        //     if (xform.getWidth() > 5)
        //         xform.setSize(2, 2);

        //     xform.incSizeBy(0.05);
        // }

        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop();
    }

    next() {
        super.next();

        // next scene to run
        let nextLevel = new MyGame();
        nextLevel.start();
    }

    load() {
        engine.xml.load(this.mSceneFile);
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);
    }

    unload() {
        // stop the backgroud audio
        engine.audio.stopBackground();

        // unload the scene file and loaded resourses
        engine.audio.unload(this.mBackgroundAudio);
        engine.xml.unload(this.mSceneFile);
    }
}

export default BlueLevel;