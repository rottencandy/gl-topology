import { mat3 } from 'gl-matrix';
import { Pointer } from '../utils/pointer';
import { World } from '../utils/ecs';

export const setCamSize = (mat: mat3, width: number, height: number) => {
    mat3.projection(mat, width, height);
};

export const cameraSystem = (world: World) => {
    Pointer.dx = 0;
    Pointer.dy = 0;
    return world;
};
