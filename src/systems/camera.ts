import { mat4, vec2 } from 'gl-matrix';
import { Pointer } from '../utils/pointer';
import { World } from '../utils/ecs';

export const setCamSize = (mat: mat4, width: number, height: number) => {
    mat4.ortho(mat, 0, width, 0, height, 0, 50);
};

const translateVec = vec2.create();

export const cameraSystem = (world: World) => {
    const { viewVec, zoom } = world;
    if (Pointer.pressed) {
        const dx = Pointer.dx / zoom;
        const dy = -Pointer.dy / zoom;
        vec2.set(translateVec, dx, dy);
        vec2.add(viewVec, viewVec, translateVec);

        Pointer.dx = 0;
        Pointer.dy = 0;
    }
    if (Pointer.scroll) {
        world.zoom += Pointer.scroll < 0 ?
            1 :
            // avoid completely going to zero when zooming out
            -Math.min(1, zoom / 2);

        Pointer.scroll = 0;
    }
    return world;
};
