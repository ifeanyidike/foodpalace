uniform float zoom;
uniform float prange;
uniform float tilt;
uniform float left;
uniform float top;
uniform vec4 resolution;
uniform float progress;
uniform sampler2D src1;
uniform sampler2D src2;
uniform sampler2D displacement;
varying vec2 vUv;
vec2 mirror(vec2 v) {
    vec2 m = mod(v, 2.0);
    return mix(m, 2.0 - m, step(1.0, m));
}
float map(float a, float b, float c, float d, float v, float cmin, float cmax) {
    return clamp((v - a) * (d - c) / (b - a) + c, cmin, cmax);
}
vec2 rotateUV(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}
void main() {
    vec2 uv = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    float m = progress;
    m = smoothstep(0., 1., m);
    vec2 nUv = vec2(.0, .0);
    if (tilt != 0.) {
        float tm = map(0.5, 1., 0., 10., m, 0., 10.);
        float mc = tm > 9.999 ? 0. : (tm < 8.236 ? max(0., sin(tm / 6.)) : sin(tm - 0.58));
        mc = map(0., 10.005, 0., 3., mc, 0., 10.005);
        nUv = rotateUV(uv, mc * -radians(360. * tilt), vec2(.5, .5));
        nUv.x += m * left;
        nUv.y += m * top;
    } else {
        nUv = vec2(uv.x + m * left, uv.y + m * top);
    }
    nUv.x -= 0.5;
    nUv.y -= 0.5;
    nUv *= 1. + (sin(m * 3.141592653)) * (1. / zoom - 1.);
    nUv.x += 0.5;
    nUv.y += 0.5;
    nUv = mirror(nUv);
    vec2 nUvIn = nUv;
    if (mod(left, 2.0) != 0.) nUvIn.x *= -1.;
    if (mod(top, 2.0) != 0.) nUvIn.y *= -1.;
    float nprog = map((0.5 - prange), (0.5 + prange), 0., 1., m, 0., 1.);
    vec4 col = mix(TEXTURE2D(src1, nUv), TEXTURE2D(src2, nUvIn), nprog);
    gl_FragColor = col;
}