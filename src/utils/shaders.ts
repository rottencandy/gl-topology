export const VERTEX = `#version 300 es
    precision lowp float;
    layout(location=0)in vec2 aPos;
    uniform mat4 uCam;
    uniform vec2 uPos;
    uniform vec2 uView;
    out vec2 vFragCoord;

    const float SIZE = 10.;

    void main() {
        vec2 pos = (aPos * SIZE) + uPos + uView;
        gl_Position = vec4(uCam * vec4(pos, 0., 1.));
        vFragCoord = aPos;
}`;

export const FRAGMENT = `#version 300 es
precision lowp float;
in vec2 vFragCoord;
out vec4 fragColor;

void main() {
    vec2 uv = vFragCoord;
    vec3 col = vec3(uv, 0.);
    fragColor = vec4(col, 1.);
}`;
