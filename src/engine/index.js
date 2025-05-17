import * as vertexBuffer from './core/vertex_buffer.js';
import * as glSys from './core/gl.js';
import * as loop from './core/loop.js';
import * as input from "./input.js";
import * as shaderResources from './core/shader_resources.js';
import * as texture from './resources/texture.js';
import * as text from './resources/text.js';
import * as xml from './resources/xml.js';
import * as audio from './resources/audio.js';
import * as font from './resources/font.js';
import * as defaultResources from './resources/default_resources.js';

// renderables
import Renderable from './renderables/renderable.js';
import TextureRenderable from './renderables/texture_renderable.js';
import SpriteRenderable from './renderables/sprite_renderable.js';
import SpriteAnimateRenderable from './renderables/sprite_animate_renderable.js';
import FontRenderable from './renderables/font_renderable.js';

import { eTexCoordArrayIndex } from './renderables/sprite_renderable.js';
import { eAnimationType } from './renderables/sprite_animate_renderable.js';

import Scene from './scene.js';
import Transform from './transform.js';
import Camera from './camera.js';

// game objects
import GameObject from './game_object/game_object.js';
import GameObjectSet from './game_object/game_object_set.js';

function init(htmlCanvasID) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
    input.init();
    audio.init();
    defaultResources.init();
}

function clearCanvas(color) {
    let gl = glSys.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT); // clear to the color set
}

function cleanUp() {
    loop.cleanUp();
    shaderResources.cleanUp();
    audio.cleanUp();
    input.cleanUp();
    shaderResources.cleanUp();
    vertexBuffer.cleanUp();
    glSys.cleanUp();
}

export default { 
    // resource support
    audio, text, xml, texture, font, defaultResources,
    
    // input support
    input, 
    
    // functions
    init, cleanUp, clearCanvas, 
    
    // Renderables
    Renderable, TextureRenderable,
    SpriteRenderable, SpriteAnimateRenderable, FontRenderable,

    // constants
    eTexCoordArrayIndex, eAnimationType,
    
    // Util classes
    Transform, Camera, Scene,

    // Game Object
    GameObject, GameObjectSet
}
