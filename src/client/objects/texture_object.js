"use strict";

import engine from '../../engine/index.js';

class TextureObject extends engine.GameObject {
    constructor(texture, x, y, w, h) {
        super(null);
        this.kDelta = 0.2;

        this.mRenderComponent = new engine.TextureRenderable(texture);
        this.mRenderComponent.getColor([1, 1, 1, 0.1]);
        this.mRenderComponent.getXform().setPosition(x, y);
        this.mRenderComponent.getXform().setSize(w, h);
    }

    update(up, down, left, right) {
        let xform = this.getXform();
        if (engine.input.isKeyPressed(up)) {
            xform.incYPosBy(this.kDelta);
        }
        if (engine.input.isKeyPressed(down)) {
            xform.incYPosBy(-this.kDelta);
        }
        if (engine.input.isKeyPressed(left)) {
            xform.incXPosBy(-this.kDelta);
        }
        if (engine.input.isKeyPressed(right)) {
            xform.incXPosBy(this.kDelta);
        }
    }
}

export default TextureObject;