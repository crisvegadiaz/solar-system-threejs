import * as THREE from "three";

export function newRenderer(
  camera: THREE.PerspectiveCamera,
): THREE.WebGLRenderer {
  const canvas: HTMLCanvasElement | null = document.querySelector("#canvas3d");

  if (!canvas) {
    throw new Error("Canvas element with ID 'canvas3d' not found.");
  }

  const engine: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", (): void => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    engine.setSize(window.innerWidth, window.innerHeight);
    engine.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  return engine;
}
