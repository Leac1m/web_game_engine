precision mediump float; // precision for float computation
// Color of pixel
uniform vec4 uPixelColor;
void main(void) {
    // for every pixel called sets to the user specified Color
    gl_FragColor = uPixelColor;
}