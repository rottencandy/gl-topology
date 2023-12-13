export const clamp = (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value;

export const lerp = (from: number, to: number, weight: number) =>
    from + (to - from) * weight;
