import { Canvas as glslCanvas } from "glsl-canvas-js";

import { useEffect, useRef } from "react";

import { Settings } from "../App";

//React.FC - A function component
export const Canvas: React.FC<{ settings: Settings }> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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


  useEffect(() => {
    const sandbox = canvasRef.current ? new glslCanvas(canvasRef.current) : null;
    if (sandbox) {
        calcSize(canvasRef.current);
      const fragment =
        "void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }";
      sandbox.load(fragment);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};
