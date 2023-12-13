import { FRAGMENT, VERTEX } from "../utils/shaders";
import { World } from "../utils/ecs";

const PLANE_VERTS = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1,
]);

const PLANE_ELEMENTS = new Uint16Array([0, 1, 2, 0, 2, 3]);

export const setupRenderer = (world: World) => {
    const { gl } = world;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, PLANE_VERTS, gl.STATIC_DRAW);
    const ele = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ele);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, PLANE_ELEMENTS, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);

    const prog = gl.createProgram();
    const vert = gl.createShader(gl.VERTEX_SHADER);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vert, VERTEX);
    gl.compileShader(vert);
    gl.shaderSource(frag, FRAGMENT);
    gl.compileShader(frag);
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program Link failed: ' + gl.getProgramInfoLog(prog));
    }

    world.vao = vao;
    world.prog = prog;
};

export const renderSystem = (world: World) => {
    const { gl, vao, prog } = world;
    gl.clearColor(.1, .1, .1, 1.);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindVertexArray(vao);
    gl.useProgram(prog);
    gl.drawElements(gl.TRIANGLES, PLANE_ELEMENTS.length, gl.UNSIGNED_SHORT, 0);

    return world;
};