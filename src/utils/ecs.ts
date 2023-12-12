import { createWorld, pipe, resetWorld } from "bitecs";
import { renderSystem } from "../systems/renderSystem";
import { timeSystem } from "../systems/timeSystem";

const ecsWorld = createWorld({
    time: {
        delta: 0,
        elapsed: 0,
        then: performance.now(),
    },
    gl: null as WebGL2RenderingContext,
});

export type World = typeof ecsWorld;

const pipeline = pipe(timeSystem, renderSystem);

let req = 0;
export const startECSPipeline = (gl: WebGL2RenderingContext) => {
    ecsWorld.gl = gl;
    (function loop() {
        pipeline(ecsWorld);
        req = requestAnimationFrame(loop);
    })();
};

export const StopECSPipeline = () => {
    cancelAnimationFrame(req);
    resetWorld(ecsWorld);
};
