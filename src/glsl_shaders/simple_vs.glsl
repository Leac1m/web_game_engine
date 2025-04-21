attribute vec3 aVertexPosition;
uniform mat4 uModelXformMatrix;


void main(void) {
    // Convert the vec3 into vec4 for scan conversion and
    // assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uModelXformMatrix * vec4(aVertexPosition, 1.0);
}