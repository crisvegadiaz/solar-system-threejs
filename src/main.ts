import * as THREE from "three";
import { newSphere } from "./objetos/newSphere.ts";
import { newScene } from "./escena/newScene.ts";
import { newEngine } from "./escena/newEngine.ts";
import { newCamera } from "./escena/newCamera.ts";

const scene: THREE.Scene = newScene();
const camera: THREE.PerspectiveCamera = newCamera();
const engine: THREE.WebGLRenderer = newEngine(camera);

const sphereMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  newSphere();

scene.add(sphereMesh);

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(2, 4, 5);
scene.add(light);

camera.lookAt(sphereMesh.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

  sphereMesh.rotation.y += 0.0015;

  const cloud: THREE.Object3D | undefined = sphereMesh.children[0];
  if (cloud) {
    cloud.rotation.y += 0.0008;
  }

  engine.render(scene, camera);
}

actualizar();
