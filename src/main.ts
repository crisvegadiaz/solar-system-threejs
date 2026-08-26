import * as THREE from "three";
import { newScene } from "./core/Scene.ts";
import { newCamera } from "./core/Camera.ts";
import { newRenderer } from "./core/Renderer.ts";
import { modelLoader } from "./utils/ModelLoader.ts";
import { planetModel } from "./components/PlanetModel.ts";

const star = "/textures/star.webp";
const sunImg = "/textures/sun.webp";
const moonImg = "/textures/moon.webp";
const venusImg = "/textures/venus.webp";
const earthImg = "/textures/earth.webp";
const plutoImg = "/textures/pluto.webp";
const uranusImg = "/textures/uranus.webp";
const cloudsImg = "/textures/clouds.webp";
const mercuryImg = "/textures/mercury.webp";
const neptuneImg = "/textures/neptune.webp";
const jupiterUrl = "/models/jupiter.glb";
const saturnUrl = "/models/saturn.glb";
const marsUrl = "/models/mars.glb";

const scene: THREE.Scene = newScene(star);
const camera: THREE.PerspectiveCamera = newCamera();
const engine: THREE.WebGLRenderer = newRenderer(camera);

const sun = planetModel(15, sunImg, { x: 0, y: 0, z: 0 });
const mercury = planetModel(2, mercuryImg, { x: 3, y: 0, z: 0 });
const venus = planetModel(4, venusImg, { x: 6, y: 0, z: 0 });
const earth = planetModel(4, earthImg, { x: 9, y: 0, z: 0 }, cloudsImg);
const moon = planetModel(0.3, moonImg, { x: 0.4, y: 0, z: 0 });
const mars = await modelLoader(0.5, marsUrl, { x: 12, y: 0, z: 0 });
const jupiter = await modelLoader(1, jupiterUrl, { x: 20, y: 0, z: 0 });
const saturn = await modelLoader(2.5, saturnUrl, { x: 30, y: 0, z: 0 });
const uranus = planetModel(8, uranusImg, { x: 40, y: 0, z: 0 });
const neptune = planetModel(7, neptuneImg, { x: 50, y: 0, z: 0 });
const pluto = planetModel(1, plutoImg, { x: 60, y: 0, z: 0 });

const earthPivot = new THREE.Object3D();
earthPivot.position.set(0, 0, 0);
earthPivot.add(earth);

const moonPivot = new THREE.Object3D();
moonPivot.position.set(0, 0, 0);
moonPivot.add(moon);
earth.add(moonPivot);

scene.add(
  sun,
  mercury,
  venus,
  earthPivot,
  mars,
  saturn,
  jupiter,
  uranus,
  neptune,
  pluto,
);

const light: THREE.PointLight = new THREE.PointLight(0xffffff, 18, 0, 2);
light.position.set(0, 0, 0);
sun.add(light);

const sunMat = sun.material as THREE.MeshStandardMaterial;
if (sunMat) {
  sunMat.emissiveMap = sunMat.map as THREE.Texture | null;
  sunMat.emissive = new THREE.Color(0xffd61f);
  sunMat.emissiveIntensity = 2;
}

camera.position.set(0, 50, 0);
camera.lookAt(sun.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

  sun.rotation.y += 0.0015;
  earth.rotation.y += 0.0015;
  moonPivot.rotation.y += 0.0095;
  earthPivot.rotation.y += 0.0055;

  const cloud: THREE.Object3D | undefined = earth.children[0];
  if (cloud) {
    cloud.rotation.y += 0.0008;
  }

  engine.render(scene, camera);
}

actualizar();
