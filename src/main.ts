import * as THREE from "three";
import { newSphere } from "./objetos/newSphere.ts";
import { newScene } from "./escena/newScene.ts";
import { newEngine } from "./escena/newEngine.ts";
import { newCamera } from "./escena/newCamera.ts";
import earthImg from "./assets/earth.webp";
import cloudsImg from "./assets/clouds.webp";
import moonImg from "./assets/moon.webp";
import sunImg from "./assets/sun.webp";

const scene: THREE.Scene = newScene();
const camera: THREE.PerspectiveCamera = newCamera();
const engine: THREE.WebGLRenderer = newEngine(camera);

const sunMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  newSphere({ x: 0, y: 0, z: 0 }, { r: 0.7, sh: 32, sv: 32, tex: sunImg });

const earthMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  newSphere(
    { x: 3, y: 0, z: 0 },
    { r: 0.2, sh: 32, sv: 32, tex: earthImg },
    { r: 0.22, sh: 32, sv: 32, tex: cloudsImg },
  );

const moonMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  newSphere({ x: 0.5, y: 0, z: 0 }, { r: 0.05, sh: 32, sv: 32, tex: moonImg });

const earthPivot = new THREE.Object3D();
earthPivot.position.set(0, 0, 0);
earthPivot.add(earthMesh);

const moonPivot = new THREE.Object3D();
moonPivot.position.set(0, 0, 0);
moonPivot.add(moonMesh);
earthMesh.add(moonPivot);

scene.add(sunMesh);
scene.add(earthPivot);

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(2, 4, 5);
scene.add(light);

camera.position.set(0, 5, 0);
camera.lookAt(sunMesh.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

  earthMesh.rotation.y += 0.0015;
  moonPivot.rotation.y += 0.0095;
  earthPivot.rotation.y += 0.0055;

  const cloud: THREE.Object3D | undefined = earthMesh.children[0];
  if (cloud) {
    cloud.rotation.y += 0.0008;
  }

  engine.render(scene, camera);
}

actualizar();
