import * as THREE from "three";

export function newRenderer(camera: THREE.PerspectiveCamera) {
  const canvas: HTMLCanvasElement | null = document.querySelector("#lienzo3d");

  if (!canvas) {
    throw new Error("Canvas element with ID 'lienzo3d' not found.");
  }

  const engine: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    engine.setSize(window.innerWidth, window.innerHeight);
    engine.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  return engine;
}
