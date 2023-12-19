export const VERTEX = `#version 300 es
    precision lowp float;
    layout(location=0)in vec2 aPos;
    uniform mat4 uCam;
    uniform vec2 uPos;
    uniform vec2 uView;
    uniform float uZoom;
    out vec2 vFragCoord;

    const float SIZE = 10.;

    void main() {
        vec2 pos = (aPos * SIZE) + uPos + uView;
        gl_Position = vec4(uCam * vec4(pos, 0., 1.));
        gl_Position.xy *= uZoom;
        vFragCoord = aPos;
}`;

export const FRAGMENT = `#version 300 es
precision lowp float;
in vec2 vFragCoord;
uniform sampler2D uTex;
out vec4 fragColor;

void main() {
    vec2 uv = 1. - vFragCoord;
    uv.x = 1. - uv.x;
    fragColor = texture(uTex, uv);
}`;
