import { Canvas as glslCanvas } from "glsl-canvas-js";

import { useEffect, useRef } from "react";

import { Settings } from "../App";

//React.FC - A function component
export const Canvas: React.FC<{ settings: Settings }> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
        const sandbox = new glslCanvas(canvasRef.current);
        calcSize(canvasRef.current);
        const fragment = "void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }";
        sandbox.load(fragment);
    }
  }, [canvasRef]);

  return <div className="canvas-holder"><canvas ref={canvasRef} /> </div>;
};



function calcSize(canvas: HTMLCanvasElement): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpi = window.devicePixelRatio;

    const size = Math.max(width + 200, height);
    canvas.width = size * dpi;
    canvas.height = size * dpi;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
  }