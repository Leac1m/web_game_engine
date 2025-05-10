"use strict";

import * as map from '../core/resource_map.js';

let unload = map.unload;
let has = map.has;

let mAudioContext = null;
let mBackgroundAudio = null;

// Volume control support
let mBackgroundGain = null; // background volume
let mCueGain = null; // cue/special effects volume
let mMasterGain = null; // overall/master volume

let kDefaultInitGain = 0.1;

function init() {
    try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;

        mAudioContext = new AudioContext();

        // connect Master volume control
        mMasterGain = mAudioContext.createGain();
        mMasterGain.connect(mAudioContext.destination);
        // set default Background volume
        mMasterGain.gain.value = kDefaultInitGain;

        // connect Background volume control
        mBackgroundGain = mAudioContext.createGain();
        mBackgroundGain.connect(mMasterGain);
        // set default Backgroud volume
        mBackgroundGain.gain.value = 1.0;

        // connect Cuevolume control
        mCueGain = mAudioContext.createGain();
        mCueGain.connect(mMasterGain);
        // set default Cue volume
        mCueGain.gain.value = 1.0;
    } catch (e) {
        console.error(e);
        throw new Error("...");
    }
}

function playCue(path, volume) {
    let source = mAudioContext.createBufferSource();
    source.buffer = map.get(path);
    source.start(0);

    // volume support for cue
    source.connect(mCueGain);
    mCueGain.gain.value = volume;
}

function playBackground(path, volume) {
    if (has(path)) {
        stopBackground();
        mBackgroundAudio = mAudioContext.createBufferSource();
        mBackgroundAudio.buffer = map.get(path);
        mBackgroundAudio.loop = true;
        mBackgroundAudio.start(0);

        // connect volume accordingly
        mBackgroundAudio.connect(mBackgroundGain);
        setBackgroundVolume(volume);
    }
}

function stopBackground() {
    if (mBackgroundAudio !== null) {
        mBackgroundAudio.stop(0);
        mBackgroundAudio = null;
    }
}

function isBackgroundPlaying() {
    return (mBackgroundAudio !== null)
}

function setBackgroundVolume(volume) {
    if (mBackgroundGain !== null) {
        mBackgroundGain.gain.value = volume;
    }
}

function incBackgroundVolume(increment) {
    if (mBackgroundGain !== null) {
        mBackgroundGain.gain.value += increment;

        // stop volume from being negative
        if (mBackgroundGain.gain.value < 0) {
            setBackgroundVolume(0);
        }
    }
}

function setMasterVolume(volume) {
    if (mMasterGain !== null) {
        mMasterGain.gain.value = volume;
    }
}

function incMasterVolume(increment) {
    if (mMasterGain !== null) {
        mMasterGain.gain.value += increment;
        
        // stop volume from being negative
        if (mMasterGain.gain.value < 0) {
            mMasterGain.gain.value = 0;
        }
    }
}

function decodeResource(data) { return data.arrayBuffer(); }

function parseResource(data) {
    return mAudioContext.decodeAudioData(data);
}

function load(path) {
    return map.loadDecodeParse(path, decodeResource, parseResource)
}

function cleanUp() {
    mAudioContext.close();
    mAudioContext = null;
}

export { init, cleanUp, has, load, unload,
playCue, playBackground, stopBackground, incBackgroundVolume,
isBackgroundPlaying, setMasterVolume, incMasterVolume }