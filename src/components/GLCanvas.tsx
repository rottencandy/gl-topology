import * as React from 'react';
import { startECSPipeline, StopECSPipeline } from '../utils/ecs';

import './GLCanvas.scss';

const prepareCanvas = (canvas: HTMLCanvasElement) => {
    const onDisplayResize = () => {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    };

    canvas.onresize = onDisplayResize;

    //canvas.ondragover = onDragOver;
    //canvas.onpointermove = onPointerMove;
    //canvas.onpointerup = onPointerUp;
    //canvas.onpointerdown = onPointerDown;

};

export const GLCanvas: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const gl = canvasRef.current.getContext('webgl2');
        prepareCanvas(canvasRef.current);
        startECSPipeline(gl);

        return () => {
            StopECSPipeline();
        };
    }, []);

    return (
        <canvas ref={canvasRef} />
    );
};
