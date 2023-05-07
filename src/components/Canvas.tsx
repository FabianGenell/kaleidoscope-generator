import { Canvas as glslCanvas } from "glsl-canvas-js";
import { useEffect, useRef } from "react";

import { Settings } from "../App";


const fragment = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 12.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;
uniform float imageRatio;

varying vec2 v_texcoord;



void main() {
    vec2 uv = v_texcoord; 
    uv *= 2.0;
    uv -= 1.0;
    
    //make mouse
    vec2 mouse = u_mouse / u_resolution;

    //getting the hypotenuse
    float radius = length(uv);
    radius *= mix(1.0, 2.0, mouse.x);

    //getting the angle (arc tan)
    float angle = atan(uv.x, uv.y);
    
    angle += mouse.y;

    //because atan return a float in the range of -pi to pi
    angle /= PI * 2.0;
    
    //get a segment angle *=SEGMENTS
    angle *= SEGMENTS;

    
    //repeat segment
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    }else {
        angle = 1.0 - fract(angle);
    }
    
    //make it move
    angle += u_time * 0.2;
    
    //unsquash segment
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    //creating a point and making the texture from that will make it so it never goes over 1 making it repeat itself
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point *= vec2(1.0, imageRatio);
    point = fract(point);
    
    vec4 color = texture2D(image, point);
    
    gl_FragColor = color; 

}

`;


//React.FC - A function component
export const Canvas: React.FC<{ settings: Settings }> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  
  useEffect(() => {
    if (canvasRef.current) {
        const sandbox = new glslCanvas(canvasRef.current);
        calcSize(canvasRef.current);
        sandbox.load(fragment);

        const img = new Image();
        img.onload = function () {
            sandbox.setUniform("imageRatio", this.width / this.height);
        }
        img.src = `./img/crazy-light.jpg`;
    
        sandbox.setUniform("image", img.src);
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