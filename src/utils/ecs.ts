import { K8sResourceCommon } from "@openshift-console/dynamic-plugin-sdk";
import { addComponent, addEntity, createWorld, defineComponent, pipe, resetWorld, Types } from "bitecs";
import { mat4, vec2 } from "gl-matrix";
import { cameraSystem, setCamSize } from "../systems/camera";
import { renderSystem, setupRenderer } from "../systems/render";
import { timeSystem } from "../systems/time";

const ecsWorld = createWorld({
    time: {
        delta: 0,
        elapsed: 0,
        then: performance.now(),
    },
    gl: null as WebGL2RenderingContext,
    vao: null as WebGLVertexArrayObject,
    prog: null as WebGLProgram,
    camMat: mat4.create(),
    viewVec: vec2.create(),
    zoom: 1,
    uniforms: {
        cam: null as WebGLUniformLocation,
        pos: null as WebGLUniformLocation,
        view: null as WebGLUniformLocation,
        zoom: null as WebGLUniformLocation,
    },
});

export type World = typeof ecsWorld;

const pipeline = pipe(timeSystem, cameraSystem, renderSystem);

let req = 0;
export const startECSPipeline = (gl: WebGL2RenderingContext) => {
    ecsWorld.gl = gl;
    setupRenderer(ecsWorld);
    (function loop() {
        pipeline(ecsWorld);
        req = requestAnimationFrame(loop);
    })();
};

export const StopECSPipeline = () => {
    cancelAnimationFrame(req);
    resetWorld(ecsWorld);
};

export const alignCam = () => {
    const { camMat, gl } = ecsWorld;
    setCamSize(camMat, gl.canvas.width, gl.canvas.height);
};

const Vec2 = { x: Types.f32, y: Types.f32 };
const Uid = { uid: Types.ui16 };
const Position = defineComponent(Vec2);
const Metadata = defineComponent(Uid);
const slowOjbects: { name: string, eid: number }[] = [];

export const repackObjects = (res: K8sResourceCommon[]) => {
    resetWorld(ecsWorld);
    slowOjbects.splice(0, slowOjbects.length);

    for (let i = 0; i < res.length; i++) {
        const obj = res[i];
        const eid = addEntity(ecsWorld);
        addComponent(ecsWorld, Position, eid);
        addComponent(ecsWorld, Metadata, eid);
        // todo: check world for old positions
        Position.x[eid] = 0;
        Position.y[eid] = 0;
        Metadata.uid[eid] = Number(obj.metadata.uid);
        slowOjbects.push({ name: obj.metadata.name, eid });
    }
};
