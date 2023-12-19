import { FRAGMENT, VERTEX } from "../utils/shaders";
import { Position, renderQuery, World } from "../utils/ecs";
import { OCP_IMG } from "../utils/images";

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

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // set blue placeholder texture
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 2, 2, 0, gl.RED, gl.UNSIGNED_BYTE, new Uint16Array([0, 0, 255, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const img = new Image;
    img.src = OCP_IMG;
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
    };

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
    const camLoc = gl.getUniformLocation(prog, 'uCam');
    const posLoc = gl.getUniformLocation(prog, 'uPos');
    const viewLoc = gl.getUniformLocation(prog, 'uView');
    const zoomLoc = gl.getUniformLocation(prog, 'uZoom');

    world.zoom.reset();

    world.vao = vao;
    world.prog = prog;
    world.uniforms.cam = camLoc;
    world.uniforms.pos = posLoc;
    world.uniforms.view = viewLoc;
    world.uniforms.zoom = zoomLoc;
};

export const renderSystem = (world: World) => {
    const { time: { delta }, gl, vao, prog, camMat, viewVec, zoom, uniforms } = world;
    gl.clearColor(.1, .1, .1, 1.);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindVertexArray(vao);
    gl.useProgram(prog);
    gl.uniformMatrix4fv(uniforms.cam, false, camMat);
    gl.uniform2fv(uniforms.view, viewVec);
    gl.uniform1f(uniforms.zoom, zoom.step(delta));

    const ents = renderQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const id = ents[i];
        const x = Position.x[id];
        const y = Position.y[id];
        gl.uniform2f(uniforms.pos, x, y);
        gl.drawElements(gl.TRIANGLES, PLANE_ELEMENTS.length, gl.UNSIGNED_SHORT, 0);
    }

    return world;
};
