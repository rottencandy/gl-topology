export const Pointer = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    scroll: 0,
    pressed: false,
};

export const onPointerMove = (e: PointerEvent) => {
    Pointer.x = e.offsetX;
    Pointer.y = e.offsetY;
    Pointer.dx = e.movementX;
    Pointer.dy = e.movementY;
};

export const onPointerUp = () => {
    Pointer.pressed = false;
};

export const onPointerDown = () => {
    Pointer.pressed = true;
};

export const onWheel = (e: WheelEvent) => {
    Pointer.scroll = e.deltaY;
};
