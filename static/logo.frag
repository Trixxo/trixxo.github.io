#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0;

vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float circle(vec2 st, vec2 position, float radius) {
	float pct = step(radius, distance(st, position));
	return 1.0 - pct;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(0.3, 0.4, 1.);

	float rotation_amount = smoothstep(-.8,.8, cos(u_time*0.8))*0.6 - 0.3;

	vec2 rotatedUv = rotate(uv, rotation_amount, vec2(0.3));

	vec2 movedUv = vec2(rotatedUv.x, rotatedUv.y + sin(u_time) * 0.08);

	movedUv.y += sin(u_time * 5.) * 0.01;

	vec2 uv_offset_1 = vec2(u_time * 0.2, 0.);
	vec2 uv_offset_2 = vec2(0., -u_time * 0.4);

	float noise_zoom = 1.;

	float test = cnoise((movedUv + uv_offset_1) * noise_zoom) * cnoise((movedUv + uv_offset_2) * noise_zoom);

	vec4 tex = texture2D(u_tex0, (movedUv + test * 0.05) * 2. - 0.5);

	vec3 highlight_color = vec3(31., 239., 202.) / 800.;
	color = mix(test * highlight_color, vec3(1. - test * 3.), tex.a);

	float edge = 0.4 + ((cnoise(uv * 3.) + 1.) * 0.5);
	float blur_amount = 1. - smoothstep(0.4, edge, pow(length(uv - 0.5) * 2., 4.));

	vec2 angleUv = vec2(movedUv.x, movedUv.y - 0.02);
	angleUv = rotate(angleUv, -PI / 2.5, vec2(0.5));
	angleUv -= 0.5;
	float uvAngle = atan(angleUv.y, angleUv.x);

	float dist = length(angleUv);

	float rim = pow(1. - abs(length(uv - 0.5) - 0.5), 20.);
	//float rim_angle_amount = 

	if (uvAngle < 0.9 && uvAngle > 0.04) {
		//float far = (fract(u_time * 0.4) * (pow(1. - dist, 2.))) + 0.08;
		float far = 0.25;
		//float amount =  floor(max(0., dist - far) * (pow((1. - dist), 1.5) * 100.)) / 100.;
		//float t = sin(u_time * 0.8);
		float t = mod(u_time * 0.8, 2. * PI);
		float width = 0.1;
		float gradient = 0.05;
		float amount = smoothstep(t-gradient, t+gradient, dist) - smoothstep(t + width - gradient, t + width + gradient, dist);
		color = mix(color, vec3(0.7, 0.6, 1.0), 0.1 * amount);
		//color = mix(color, vec3(1.7, 1.3, 3.), tex.a);
	}

	color = blur_amount * 3. * color;
	vec2 scanUv = rotate(movedUv, -PI / 4., vec2(0.5));
	scanUv -= 0.5;
	float scanAngle = atan(scanUv.y, scanUv.x);

	float threshhold = sin(u_time * 0.8 - 0.2) * PI;

	if (abs(scanAngle) < threshhold) {
	//if (mod(abs(uvAngle - 0.5), PI.) < PI) {
		//color = mix(color, vec3(0.7, 0.6, 1.), rim * blur_amount);
		color = mix(color, vec3(0.7, 0.6, 1.), 
				blur_amount
				* rim 
				* pow(max(0., threshhold - abs(scanAngle)), 2.));
	}

	gl_FragColor = vec4(color, 0.);
}
