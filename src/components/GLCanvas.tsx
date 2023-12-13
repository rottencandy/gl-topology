import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import * as React from 'react';
import { onPointerDown, onPointerMove, onPointerUp } from '../utils/pointer';
import { alignCam, repackObjects, startECSPipeline, StopECSPipeline } from '../utils/ecs';

import './GLCanvas.scss';


const prepareCanvas = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
    const onDisplayResize = () => {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            gl.viewport(0, 0, displayWidth, displayHeight);
            alignCam();
        }
    };

    const observer = new ResizeObserver(onDisplayResize);
    observer.observe(canvas);
    canvas.onpointermove = onPointerMove;
    canvas.onpointerup = onPointerUp;
    canvas.onpointerdown = onPointerDown;

};

export const GLCanvas: React.FC<{ res: K8sResourceCommon[] }> = ({ res }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const gl = canvasRef.current.getContext('webgl2');
        prepareCanvas(canvasRef.current, gl);
        startECSPipeline(gl);

        return () => {
            StopECSPipeline();
        };
    }, []);

    React.useEffect(() => {
        repackObjects(res);
    }, [res]);

    return (
        <canvas ref={canvasRef} />
    );
};
