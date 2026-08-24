import * as THREE from "three";
import { newScene } from "./core/Scene.ts";
import { newCamera } from "./core/Camera.ts";
import { newRenderer } from "./core/Renderer.ts";
import { modelLoader } from "./utils/ModelLoader.ts";
import { planetModel } from "./components/PlanetModel.ts";

const star = "/textures/star.webp";
const sunImg = "/textures/sun.webp";
const moonImg = "/textures/moon.webp";
const earthImg = "/textures/earth.webp";
const cloudsImg = "/textures/clouds.webp";
const jupiterUrl = "/models/jupiter.glb";
const saturnUrl = "/models/saturn.glb";
const marsUrl = "/models/mars.glb";

const scene: THREE.Scene = newScene(star);
const camera: THREE.PerspectiveCamera = newCamera();
const engine: THREE.WebGLRenderer = newRenderer(camera);

const sun: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  planetModel({ x: 0, y: 0, z: 0 }, { r: 0.7, sh: 32, sv: 32, tex: sunImg });

const earth: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  planetModel(
    { x: 3, y: 0, z: 0 },
    { r: 0.2, sh: 32, sv: 32, tex: earthImg },
    { r: 0.22, sh: 32, sv: 32, tex: cloudsImg },
  );

const moon: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  planetModel(
    { x: 0.5, y: 0, z: 0 },
    { r: 0.05, sh: 32, sv: 32, tex: moonImg },
  );

const saturn = await modelLoader(0.9, saturnUrl, { x: 6, y: 0, z: 0 });
const jupiter = await modelLoader(0.9, jupiterUrl, { x: -6, y: 0, z: 0 });
const mars = await modelLoader(0.2, marsUrl, { x: -3, y: 0, z: 0 });

const earthPivot = new THREE.Object3D();
earthPivot.position.set(0, 0, 0);
earthPivot.add(earth);

const moonPivot = new THREE.Object3D();
moonPivot.position.set(0, 0, 0);
moonPivot.add(moon);
earth.add(moonPivot);

scene.add(sun, earthPivot, mars, saturn, jupiter);

// Use a point light so the sun emits light in all directions and move it with the sun
const light: THREE.PointLight = new THREE.PointLight(0xffffff, 9, 0, 2);
light.position.set(0, 0, 0);
sun.add(light);

//Make the sun material emissive so it appears to glow
const sunMat = sun.material as THREE.MeshStandardMaterial;
if (sunMat) {
  sunMat.emissiveMap = sunMat.map as THREE.Texture | null;
  sunMat.emissive = new THREE.Color(0xffd61f);
  sunMat.emissiveIntensity = 2;
}

camera.position.set(0, 5, 8);
camera.lookAt(sun.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

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
