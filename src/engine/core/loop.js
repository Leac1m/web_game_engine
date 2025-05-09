"use strict"
import * as input from "../input.js";
import * as map from './resource_map.js';

const kUPS = 60; // Updates per second
const kMPF = 100 / kUPS; // Milliseconds per update.
// Variable for timing gameloop.
let mPrevTime;
let mLagTime;
// The current loop state (running or should stop)
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

function loopOnce() {
    if (mLoopRunning) {
        // Step up for next call to LoopOnce
        mFrameID = requestAnimationFrame(loopOnce);

        // now let's draw
        //      draw() MUST be called before update()
        //      as update() may stop the loop!
        mCurrentScene.draw();

        // compute time elasped since laast loopOnce was executed
        let currentTime = performance.now();
        let elaspedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elaspedTime;

        // update only the game the appropriate number of times.
        //      Update only every kMPF (1/60 of a second)
        //      If lag larger then update frames, update untill caught up.
        while ((mLagTime >= kMPF) && mLoopRunning) {
            input.update();
            mCurrentScene.update();
            mLagTime -= kMPF;
        }
    }
}

async function start(scene) {
   
 if (mLoopRunning) {
        throw new Error("loop already running")
    }

    // wait for any async requests before game-load
    await map.waitOnPromise();
    
    mCurrentScene = scene;
    mCurrentScene.load();

    await map.waitOnPromise();
    mCurrentScene.init();

    mPrevTime = performance.now();
    mLagTime = 0.0;
    mLoopRunning = true;
    mFrameID = requestAnimationFrame(loopOnce);
}

function stop() {
    mLoopRunning = false;
    // make sure no more animation frames
    cancelAnimationFrame(mFrameID);
}

function cleanUp() {
    if ( mLoopRunning) {
        stop();
        // unload all resources
        mCurrentScene.unload();
        mCurrentScene = null;
    }
}

export {start, stop, cleanUp}