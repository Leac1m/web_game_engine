"use strict";

// Engine stuff
import engine from "../engine/index.js";

// user stuff
import DyePack from './objects/dye_pack.js';
import Minion from './objects/minion.js';
import Hero from './objects/hero.js';
import Brain from "./objects/brain.js";


class MyGame extends engine.Scene {
    constructor() {
        super();
        // textures: 
        this.kMinionSprite = "assets/minion_sprite.png";

        // The camera to view the scene
        this.mCamera = null;

        // the hero and the support objects
        this.mHero = null;
        this.mMinion = null;
        this.mBrain = null;

        // mode of running:
        // H: Player drive brain
        // J: Dye drive brain, immediate orientation change
        // K: Dye drive brain, gradual orientation change
        this.mMode = 'H';

    }

    load() {
        // Step A: loads the textures    
        engine.texture.load(this.kMinionSprite);

    }

    unload() {
        engine.texture.unload(this.kMinionSprite);

    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5),   // position of the camera
            100,                       // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray

        // Step B: The dye pack: simply another GameObject
        // this.mDyePack = new DyePack(this.kMinionSprite);

        // Step C: A set of Minions
        // this.mMinionset = new engine.GameObjectSet();
        // let i = 0, randomY, aMinion;
        // // create 5 mininons at random Y values
        // for (i = 0; i < 5; i++) {
        //     randomY = Math.random() * 65;

        //     aMinion = new Minion(this.kMinionSprite);
        //     this.mMinionset.addToSet(aMinion);
        // }

        // Step D:incRotationByDegree Create the hero object
        this.mHero = new Hero(this.kMinionSprite);
        this.mBrain = new Brain(this.kMinionSprite);

        // Step E: Create and initialize message output
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        
        // Step  C: Draw everything
        this.mHero.draw(this.mCamera);
        // this.mMinionset.draw(this.mCamera);
        // this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);

        this.mBrain.draw(this.mCamera);

    }

    // The 
    //  function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg = "Brain [H:key J:imm K:gradual]: ";
        let rate = 1;

        this.mHero.update();

        switch (this.mMode) {
            case 'H':
                this.mBrain.update(); // player steers with arrow keys
                break;
            case 'K':
                rate = 0.02; // gradual rate
                // In gradual mode, the following should also be executed
            case 'J':
                this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);

                // the default GameObject: only move forward
                engine.GameObject.prototype.update.call(this.mBrain);
                break;
        }

        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.mMode = 'H';
        }

        if (engine.input.isKeyClicked(engine.input.keys.K)) {
            this.mMode = 'K';
        }

        if (engine.input.isKeyClicked(engine.input.keys.J)) {
            this.mMode = 'J'
        }

        this.mMsg.setText(msg + this.mMode);
        // this.mMinionset.update();
        // this.mDyePack.update();
    }
}

export default MyGame;

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}