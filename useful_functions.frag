vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float rect(vec2 st, vec2 size, vec2 position) {
	float left = step(position.x, st.x);
	float right = step(1.0 - size.x - position.x, 1.0 - st.x);
	float top = step(position.y, st.y);
	float bottom = step(1.0 - size.y - position.y, 1.0 - st.y);

	return left * right * top * bottom;
}

float circle(vec2 st, vec2 position, float radius) {
	float pct = step(radius, distance(st, position));
	return 1.0 - pct;
}

float circle_optimised(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}
