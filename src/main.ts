import * as THREE from "three";
import { esfera } from "./objetos/esfera.ts";
import { newScene } from "./objetos/escena.ts";

const escena: THREE.Scene = newScene();

const camara: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camara.position.z = 3;

const canvas: HTMLCanvasElement | null = document.querySelector("#lienzo3d");
if (!canvas) {
  throw new Error("Canvas element with ID '3d' not found.");
}

const motor: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

motor.setSize(window.innerWidth, window.innerHeight);

const esferaMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
  esfera();
escena.add(esferaMesh);

const luz: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
luz.position.set(2, 4, 5);
escena.add(luz);

camara.lookAt(esferaMesh.position);

function actualizar(): void {
  requestAnimationFrame(actualizar);

  esferaMesh.rotation.y += 0.0015;

  const nubes: THREE.Object3D | undefined = esferaMesh.children[0];
  if (nubes) {
    nubes.rotation.y += 0.0008;
  }

  motor.render(escena, camara);
}

actualizar();
