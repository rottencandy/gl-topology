export const VERTEX = `#version 300 es
    precision lowp float;
    layout(location=0)in vec2 aPos;
    out vec2 vFragCoord;

    void main() {
        // -1 -> 1
        vec2 vwPos = aPos;
        gl_Position = vec4(vwPos, 0., 1.);
        vFragCoord = vwPos;
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
