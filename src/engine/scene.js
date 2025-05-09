import * as loop  from './core/loop.js';
import * as engine from './index.js';

const kAbstractClassError = new Error("Abstract Class")
const kAbstractMethodError = new Error("Abstract Method")

class Scene {
    constructor() {
        if (this.constructor === Scene)
            throw kAbstractClassError
    }

    async start() {
        await loop.start(this);
    }

    next() {
        loop.stop();
        this.unload();
    }

    stop() {
        loop.stop();
        this.unload();
        engine.cleanUp();
    }

    init() { /* to initialize the level (called from loop.start()) */}
    
    unload() { /* to load resources */}

    load() { /* to load resources */ }

    // draw/upadate must be over-written by subclass
    draw() { throw kAbstractMethodError; }

    update() { throw kAbstractMethodError; }
}

export default Scene;