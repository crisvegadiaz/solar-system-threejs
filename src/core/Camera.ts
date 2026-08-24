import * as THREE from "three";

export function newCamera(): THREE.PerspectiveCamera {
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 3;
  return camera;
}
