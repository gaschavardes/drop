#include <defaultFrag>
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: blur = require('glsl-fast-gaussian-blur')
#pragma glslify: ease = require(glsl-easings/sine-in-out)
uniform vec3 uColor;
varying vec3 vNormal;
varying vec2 vUv;
uniform sampler2D envFbo;
uniform sampler2D uMap;
uniform sampler2D uMap1;
uniform sampler2D uMap2;
uniform sampler2D uMap3;
uniform sampler2D uMap4;
uniform sampler2D uMap5;
uniform sampler2D uMap6;
uniform vec2 resolution;
uniform float uTime;
uniform float uAppear;
uniform float uScroll;
uniform sampler2D uDataTexture;


void main() {

	vec4 activeTexture = texture2D(uMap, vUv);

	gl_FragColor = activeTexture;
	// gl_FragColor = vec4(alpha);
	// gl_FragColor = vec4(vec3(fract(sin(uv.x * 10.))), 1.0);

}
