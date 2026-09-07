import * as THREE from "three";
import { newScene } from "./core/Scene.ts";
import { newCamera } from "./core/Camera.ts";
import { newRenderer } from "./core/Renderer.ts";
import { modelLoader } from "./utils/ModelLoader.ts";
import { planetModel } from "./components/PlanetModel.ts";
import { createPivotModel } from "./utils/createPivotModel.ts";
import { Planet } from "./types/common.ts";

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

const scene = newScene(star);
const camera = newCamera();
const engine = newRenderer(camera);

const sunData = new Planet({ texture: sunImg, scale: 15 });
const sun = planetModel(sunData);

const mercuryData = new Planet({ texture: mercuryImg, scale: 3, x: 4 });
const mercuryPivot = createPivotModel(planetModel(mercuryData));

const venusData = new Planet({ texture: venusImg, scale: 4, x: 6 });
const venusPivot = createPivotModel(planetModel(venusData));

const earthData = new Planet(
  { texture: earthImg, scale: 4, x: 9 },
  { texture: cloudsImg, r: 0.11 },
);
const earthPivot = createPivotModel(planetModel(earthData));

const moonData = new Planet({ texture: moonImg, scale: 0.3, x: 0.4 });
const moonPivot = createPivotModel(planetModel(moonData));

const marsData = new Planet({ texture: marsUrl, scale: 0.5, x: 12 });
const marsPivot = createPivotModel(await modelLoader(marsData));

const jupiterData = new Planet({ texture: jupiterUrl, scale: 1, x: 18 });
const jupiterPivot = createPivotModel(await modelLoader(jupiterData));

const saturnData = new Planet({ texture: saturnUrl, scale: 2.5, x: 25 });
const saturnPivot = createPivotModel(await modelLoader(saturnData));

const uranusData = new Planet({ texture: uranusImg, scale: 8, x: 32 });
const uranusPivot = createPivotModel(planetModel(uranusData));

const neptuneData = new Planet({ texture: neptuneImg, scale: 7, x: 38 });
const neptunePivot = createPivotModel(planetModel(neptuneData));

const plutoData = new Planet({ texture: plutoImg, scale: 1, x: 42 });
const plutoPivot = createPivotModel(planetModel(plutoData));

earthPivot.children[0].add(moonPivot);

scene.add(
  sun,
  mercuryPivot,
  venusPivot,
  earthPivot,
  marsPivot,
  jupiterPivot,
  saturnPivot,
  uranusPivot,
  neptunePivot,
  plutoPivot,
);

const light: THREE.PointLight = new THREE.PointLight(0xffffff, 1000, 0, 2);
light.position.set(0, 0, 0);
sun.add(light);

const sunMat = sun.material as THREE.MeshStandardMaterial;
if (sunMat) {
  sunMat.emissiveMap = sunMat.map as THREE.Texture | null;
  sunMat.emissive = new THREE.Color(0xffd61f);
  sunMat.emissiveIntensity = 2;
}

//camera.position.set(0, 40, 0);
camera.lookAt(sun.position);

function update(): void {
  requestAnimationFrame(update);

  sun.rotation.y += 0.0015;
  mercuryPivot.children[0].rotation.y += 0.0015;
  venusPivot.children[0].rotation.y += 0.0015;
  earthPivot.children[0].rotation.y += 0.0015;
  marsPivot.children[0].rotation.y += 0.0015;
  jupiterPivot.children[0].rotation.y += 0.0015;
  saturnPivot.children[0].rotation.y += 0.0015;
  uranusPivot.children[0].rotation.y += 0.0015;
  neptunePivot.children[0].rotation.y += 0.0015;
  plutoPivot.children[0].rotation.y += 0.0015;

  mercuryPivot.rotation.y += 0.02;
  venusPivot.rotation.y += 0.015;
  earthPivot.rotation.y += 0.01;
  moonPivot.rotation.y += 0.0095;
  marsPivot.rotation.y += 0.008;
  jupiterPivot.rotation.y += 0.004;
  saturnPivot.rotation.y += 0.002;
  uranusPivot.rotation.y += 0.001;
  neptunePivot.rotation.y += 0.0008;
  plutoPivot.rotation.y += 0.0005;

  const cloud: THREE.Object3D | undefined = earthPivot.children[0].children[0];
  if (cloud) {
    cloud.rotation.y += 0.0008;
  }

  engine.render(scene, camera);
}

update();
