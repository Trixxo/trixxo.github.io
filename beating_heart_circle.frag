#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;

float circle(vec2 st, vec2 position, float radius) {
	float pct = step(radius, distance(st, position));
	return 1.0 - pct;
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	float radius = 0.3 + 0.1 * (pow(0.5 + 0.5 * (sin(6.0 * u_time)), 4.0));
	float pct = circle(st, vec2(0.5, 0.5), radius);
	vec3 color = vec3(pct);
	//color *= vec3(0.2, 0.4, 0.6);
  color *= vec3(227.0 / 255.0, 254.0 / 255.0, 1.0);

	gl_FragColor = vec4(color, 1.0);
}
