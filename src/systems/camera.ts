import { mat4, vec2 } from 'gl-matrix';
import { Pointer } from '../utils/pointer';
import { World } from '../utils/ecs';

export const setCamSize = (mat: mat4, width: number, height: number) => {
    mat4.ortho(mat, 0, width, 0, height, 0, 50);
};

const translateVec = vec2.create();
const DRAG_SPEED = 1.;

export const cameraSystem = (world: World) => {
    const { viewVec } = world;
    if (Pointer.pressed) {
        vec2.set(translateVec, Pointer.dx * DRAG_SPEED, -Pointer.dy * DRAG_SPEED);
        vec2.add(viewVec, viewVec, translateVec);
    }
    Pointer.dx = 0;
    Pointer.dy = 0;
    return world;
};
