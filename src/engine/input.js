"use strict"
const keys = {
    // arrows
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    // space bar
    Space: 32,
    // numbers
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    Four: 52,
    Five : 53,
    Six : 54,
    Seven : 55,
    Eight : 56,
    Nine : 57,
    // Alphabets
    A : 65,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    H : 72,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    Q : 81,
    R : 82,
    S : 83,
    W : 87,
    LastKeyCode: 222
}

// Previous key state
let mKeyPreviousState = []; // a new array
// The pressed keys.
let mIsKeyPressed = [];
// Click events: once an event is set, it will remain there until polled
let mIsKeyClicked = [];

function onKeyDown(event) {
    mIsKeyPressed[event.keyCode] = true;
}

function onKeyUp(event) {
    mIsKeyPressed[event.keyCode] = false;
}

function init() {
    let i;
    for (i = 0; i < keys.LastKeyCode; i++) {
        mIsKeyPressed[i] = false;
        mKeyPreviousState[i] = false;
        mIsKeyClicked[i] = false;
    }

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
}


function update() {
    let i;
    for (i = 0; i < keys.LastKeyCode; i++) {
        mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
        mKeyPreviousState[i] = mIsKeyPressed[i];
    }
}

function isKeyPressed(keyCode) {
    return mIsKeyPressed[keyCode];
}

function isKeyClicked(keyCode) {
    return mIsKeyClicked[keyCode];
}

function cleanUp() {}

export { keys, init, cleanUp, update, isKeyClicked, isKeyPressed }