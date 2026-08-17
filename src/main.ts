import * as THREE from "three";

const escena: THREE.Scene = new THREE.Scene();
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


function actualizar(): void {
  requestAnimationFrame(actualizar);
  
  motor.render(escena, camara);
}

actualizar();