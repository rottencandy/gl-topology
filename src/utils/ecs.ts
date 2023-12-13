import { K8sResourceCommon } from "@openshift-console/dynamic-plugin-sdk";
import { addComponent, addEntity, createWorld, defineComponent, pipe, resetWorld, Types } from "bitecs";
import { mat3 } from "gl-matrix";
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
    camMat: mat3.create(),
});

export type World = typeof ecsWorld;

const pipeline = pipe(timeSystem, cameraSystem, renderSystem);

let req = 0;
export const startECSPipeline = (gl: WebGL2RenderingContext) => {
    ecsWorld.gl = gl;
    setupRenderer(ecsWorld);
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

export const alignCam = () => {
    const { camMat, gl: { canvas: { width, height } } } = ecsWorld;
    setCamSize(camMat, width, height);
};

const Vec2 = { x: Types.f32, y: Types.f32 };
const Uid = { uid: Types.ui16 };
const Position = defineComponent(Vec2);
const Metadata = defineComponent(Uid);
const slowOjbects = [];

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
        slowOjbects.push({ name: obj.metadata.name, uid: obj.metadata.uid, eid });
    }
};
