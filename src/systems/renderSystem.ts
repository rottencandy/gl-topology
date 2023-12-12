import { World } from "../utils/ecs";

export const renderSystem = (world: World) => {
    const { gl } = world;
    gl.clearColor(.1, .1, .1, 1.);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    return world;
};
