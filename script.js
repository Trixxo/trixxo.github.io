document.addEventListener("keydown", onKeyDown, false);

const links = [
  "e-learning.tuhh.de",
  "https://www3.tuhh.de/e-4/teaching/rnuis-exercises-labs/",
  "https://media.tuhh.de/es/TI/",
  "https://www.math.uni-hamburg.de/teaching/export/tuhh/cm/a3/2122/lm.html.en",
  "e-learning.tuhh.de",
  "e-learning.tuhh.de",
  "e-learning.tuhh.de",
  "google.com",
];

const titles = [
  "e-learning.tuhh.de",
  "internet security",
  "ti videos",
  "Analysis",
  "e-learning.tuhh.de",
  "e-learning.tuhh.de",
  "e-learning.tuhh.de",
  "google.com",
];

const string_frag_code = `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_anim_time;

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

	float angle = atan(pos.y, pos.x) + u_anim_time * -1.;

	float f = smoothstep(-0.5, 0.5, cos(angle * 12.0)) * 0.1 + 0.5;

	vec3 color = vec3(0);

	vec3 gear_color = vec3(184.0, 149.0, 73.0) / 255.0;

	float gear_amount = 1.0 - smoothstep(f, f+0.002, radius);
	color = mix(color, gear_color, vec3(gear_amount));

	float circle_amount = circle(st, vec2(0.5, 0.5), 0.1);
	color = mix(color, vec3(0), circle_amount);

	gl_FragColor = vec4(color, 0.);
}`;

const canvas = document.querySelector("canvas.glslCanvas");
canvas.style = `position: absolute; left: ${
  window.innerWidth / 2 - 250
}px; bottom: ${window.innerHeight / 2 - 250};`;

const sandbox = new GlslCanvas(canvas);
let rotationAmount = 0;

sandbox.load(string_frag_code);
sandbox.setUniform("u_anim_time", 0);

update();
function update() {
  sandbox.setUniform("u_anim_time", 0);
  window.requestAnimationFrame(update);
}

let animTime = 0;
let dir = 0;

const buttons = [];

// function onKeyDown(e) {
//   const key = e.which;

//   if (key == 13) {
//     const i = getHighestButtonIndex();
//     window.location = links[i];
//   }

  //h
  // if (key == 72) {
  //   rotateButtons(1);

  //   animTime = 0;
  //   dir = 1;
  //   updateTime(-1);
  // }

  //l
  // if (key == 76) {
  //   rotateButtons(-1);

  //   dir = -1;
  //   animTime = 0;
  //   updateTime(1);
  // }
// }

function updateTime() {
  animTime += dir * 0.2;
  const max_angle = Math.PI / 2;
  if (!(animTime < -max_angle || animTime > max_angle)) {
    window.requestAnimationFrame(updateTime);
  }
  sandbox.setUniform("u_anim_time", animTime);
}

function getHighestButtonIndex() {
  let positionOfHighest = buttons[0].getBoundingClientRect().top;
  let highestIndex = 0;
  for (let i = 1; i < buttons.length; i++) {
    const rect = buttons[i].getBoundingClientRect();
    if (rect.top < positionOfHighest) {
      highestIndex = i;
      positionOfHighest = rect.top;
    }
  }
  return highestIndex;
}

function getHeight(element) {
  element = element.cloneNode(true);
  element.style.visibility = "hidden";
  document.body.appendChild(element);
  var height = element.offsetHeight + 0;
  document.body.removeChild(element);
  element.style.visibility = "visible";
  return height;
}

function getWidth(element) {
  element = element.cloneNode(true);
  element.style.visibility = "hidden";
  document.body.appendChild(element);
  var height = element.offsetWidth + 0;
  document.body.removeChild(element);
  element.style.visibility = "visible";
  return height;
}

function rotateButtons(dir) {
  rotationAmount += dir;
  dir *= rotationAmount;

  for (let i = 0; i < links.length; i++) {
    const button = buttons[i];
    //const angle_offset = (Math.PI * 2) / links.length;

    const posX =
      window.innerWidth / 2 -
      getWidth(button) / 2 +
      Math.cos(((Math.PI * 2) / links.length) * (i + rotationAmount)) * 300;
    const posY =
      window.innerHeight / 2 -
      getHeight(button) / 2 +
      Math.sin(((Math.PI * 2) / links.length) * (i + rotationAmount)) * 300;
    button.style = `position: absolute; left: ${posX}px; bottom: ${posY};`;
  }
}

//const canvasContainer = document.querySelector(".canvasContainer");

//for (let i = 0; i < links.length; i++) {
  //const button = document.createElement("BUTTON");
  //buttons.push(button);

  //button.innerText = titles[i];
  //const posX =
    //window.innerWidth / 2 -
    //getWidth(button) / 2 +
    //Math.cos(((Math.PI * 2) / links.length) * i) * 300;
  //const posY =
    //window.innerHeight / 2 -
    //getHeight(button) / 2 +
    //Math.sin(((Math.PI * 2) / links.length) * i) * 300;
  //button.style = `position: absolute; left: ${posX}px; bottom: ${posY};`;

  //button.onclick = () => {
    //window.location = links[i];
  //};

  // document.body.appendChild(button);
// }
