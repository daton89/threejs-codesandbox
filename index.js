import {
  Scene,
  Color,
  Mesh,
  MeshNormalMaterial,
  BoxBufferGeometry,
  PerspectiveCamera,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";

const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(50, aspect, 1, 1000);
camera.position.z = 700;

const controls = new OrbitControls(camera);

const geometry = new BoxBufferGeometry(200, 200, 200);
const material = new MeshNormalMaterial();
const mesh = new Mesh(geometry, material);

const scene = new Scene();
scene.background = new Color("#191919");
scene.add(mesh);

const renderer = new WebGLRenderer({
  powerPreference: "high-performance",
  antialias: true
});

document.body.appendChild(renderer.domElement);
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onWindowResize);

const stats = new Stats();
document.body.appendChild(stats.dom);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
const animate = () => {
  stats.begin();

  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.001;

  controls.update();
  renderer.render(scene, camera);

  stats.end();
};
renderer.setAnimationLoop(animate);
