import * as THREE from "three";

export function newScene(tex: string): THREE.Scene {
  const scene: THREE.Scene = new THREE.Scene();
  const texture: THREE.Texture = new THREE.TextureLoader().load(tex);

  scene.background = texture;

  return scene;
}
