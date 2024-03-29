#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_angle;

float circle(vec2 st, vec2 position, float radius) {
	float pct = step(radius, distance(st, position));
	return 1.0 - pct;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	vec2 pos = st - vec2(0.5);

	float radius = length(pos) * 2.0;

	float angle = atan(pos.y, pos.x);

	float f = smoothstep(-0.5, 0.5, cos(u_time + angle * 12.0)) * 0.1 + 0.5;

	vec3 color = vec3(0);

	// vec3 gear_color = vec3(184.0, 149.0, 73.0) / 255.0;
	vec3 gear_color = vec3(227.0, 254.0, 255.0) / 255.0;

	float gear_amount = 1.0 - smoothstep(f, f+0.002, radius);
	color = mix(color, gear_color, vec3(gear_amount));

	float circle_amount = circle(st, vec2(0.5, 0.5), 0.1);
	color = mix(color, vec3(0), circle_amount);

	gl_FragColor = vec4(color, 0.);
}
