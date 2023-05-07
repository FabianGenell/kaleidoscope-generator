import { Canvas as glslCanvas } from "glsl-canvas-js";
import { useEffect, useRef, useState } from "react";

import { Settings } from "../App";


//React.FC - A function component
export const Canvas: React.FC<{ settings: Settings }> = ({ settings }) => {
    const [fragment, setFragment] = useState<string>(createFragment(settings));
    const [imageState, setImageState] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const sandbox = new glslCanvas(canvasRef.current);
            setFragment(createFragment(settings));
            calcSize(canvasRef.current);
            sandbox.load(fragment);

            const img = new Image();
            img.onload = function () {
                sandbox.setUniform("imageRatio", this.width / this.height);
            };

            img.src = settings.image_url

            sandbox.setUniform("image", img.src);
        }
    }, [canvasRef, settings]);

    return (
        <div className="canvas-holder">
            <canvas ref={canvasRef} />{" "}
        </div>
    );
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

function createFragment(settings: Settings): string {
    const fragment = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS ${Number(settings.segments).toFixed(2)}
#define SPEEDMULTIPLIER ${Number(settings.speedmultiplier).toFixed(2)}
#define THROBING ${settings.throbing}
#define THROBING_AMOUNT ${Number(settings.throbing_amount).toFixed(2)}
#define THROBING_SPEED ${Number(settings.throbing_speed).toFixed(2)}
#define ZOOM ${Number(settings.zoom).toFixed(2)}
#define BIDIRECTIONAL ${settings.bidirectional}
#define BIDIRECTIONAL_SEGMENTS ${settings.bidirectional_segments}
#define SEGMENT_THROBING ${settings.segment_throbing}
#define SEGMENT_THROBING_LIMIT ${Number(settings.segment_throbing_limit).toFixed(2)}
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

    if(THROBING) {
        radius *= sin(u_time * THROBING_SPEED) * THROBING_AMOUNT;
    }

    //getting the angle (arc tan)
    float angle = atan(uv.x, uv.y);
    
    if(SEGMENT_THROBING) {
        angle *= mix(1.0, SEGMENT_THROBING_LIMIT, sin(u_time));
    }

    angle += mouse.y;

    //because atan return a float in the range of -pi to pi
    angle /= PI * 2.0;
    
    //get a segment angle *=SEGMENTS
    angle *= SEGMENTS;

    
    //repeat segment
    if (BIDIRECTIONAL_SEGMENTS){
        if (mod(angle, 2.0) >= 1.0) {
            angle = fract(angle);
        }else {
            angle = 1.0 - fract(angle);
        }
    } else {
        angle = fract(angle);
    }

    
    //make it move
    if (BIDIRECTIONAL) {
        angle += sin(u_time) * SPEEDMULTIPLIER;

    }else {
        angle += u_time * SPEEDMULTIPLIER;
    }
    
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

    return fragment;
}
