import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import * as React from 'react';
import { onPointerDown, onPointerMove, onPointerUp } from '../utils/pointer';
import { alignCam, repackObjects, startECSPipeline, StopECSPipeline } from '../utils/ecs';

import './GLCanvas.scss';

const prepareCanvas = (canvas: HTMLCanvasElement) => {
    const onDisplayResize = () => {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        alignCam();
    };

    canvas.onresize = onDisplayResize;

    canvas.onpointermove = onPointerMove;
    canvas.onpointerup = onPointerUp;
    canvas.onpointerdown = onPointerDown;

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
