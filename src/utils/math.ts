export const clamp = (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value;

export const lerp = (from: number, to: number, weight: number) =>
    from + (to - from) * weight;

export const nearest_sqrt = (n: number) => Math.round(Math.sqrt(n));

export type Tween = {
    val: number;
    done: boolean;
    from: number,
    to: number,
    step: (delta: number) => number;
    setRange: (from: number, to: number) => void;
    reset: () => void;
};

export const makeTween = (from: number, to: number, duration: number): Tween => {
    // goes from 0 -> duration
    let t = 0;

    const obj: Tween = {
        val: from,
        from,
        to,
        done: from === to,
        step(delta: number) {
            if (obj.done) {
                return obj.to;
            }

            if (t >= duration) {
                obj.done = true;
                obj.val = obj.to;
                return obj.to;
            }

            t += delta;
            obj.val = lerp(obj.from, obj.to, t / duration)
            return obj.val;
        },
        setRange: (newFrom, newTo) => {
            obj.from = newFrom;
            obj.to = newTo;
            obj.reset();
        },
        reset: () => {
            t = 0;
            obj.val = obj.from;
            obj.done = obj.from === obj.to;
        },
    };

    return obj;

};
