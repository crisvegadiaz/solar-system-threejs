import * as THREE from "three";
import { newSphere } from "./objetos/newSphere.ts";
import { newScene } from "./escena/newScene.ts";
import { newEngine } from "./escena/newEngine.ts";
import { newCamera } from "./escena/newCamera.ts";

const scene: THREE.Scene = newScene();
const camera: THREE.PerspectiveCamera = newCamera();
const engine: THREE.WebGLRenderer = newEngine(camera);

const esferaMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  newSphere();

scene.add(esferaMesh);

const luz: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
luz.position.set(2, 4, 5);
scene.add(luz);

camera.lookAt(esferaMesh.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

  esferaMesh.rotation.y += 0.0015;

  const nubes: THREE.Object3D | undefined = esferaMesh.children[0];
  if (nubes) {
    nubes.rotation.y += 0.0008;
  }

  engine.render(scene, camera);
}

actualizar();
