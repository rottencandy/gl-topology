import { createWorld, pipe, resetWorld } from "bitecs";
import { renderSystem } from "../systems/renderSystem";
import { timeSystem } from "../systems/timeSystem";
import { cameraSystem, setCamSize } from "../systems/camera";
import { renderSystem, setupRenderer } from "../systems/render";

const ecsWorld = createWorld({
    time: {
        delta: 0,
        elapsed: 0,
        then: performance.now(),
    },
    gl: null as WebGL2RenderingContext,
    vao: null as WebGLVertexArrayObject,
    prog: null as WebGLProgram,
    camMat: mat3.create(),
});

export type World = typeof ecsWorld;

const pipeline = pipe(timeSystem, cameraSystem, renderSystem);

let req = 0;
export const startECSPipeline = (gl: WebGL2RenderingContext) => {
    ecsWorld.gl = gl;
    alignCam();
    (function loop() {
        pipeline(ecsWorld);
        req = requestAnimationFrame(loop);
    })();
};

export const StopECSPipeline = () => {
    cancelAnimationFrame(req);
    resetWorld(ecsWorld);
};
