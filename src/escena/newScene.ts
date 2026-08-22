import * as THREE from "three";
import star from "../assets/star.webp";

export function newScene(): THREE.Scene {
  const scene: THREE.Scene = new THREE.Scene();
  const texture: THREE.Texture = new THREE.TextureLoader().load(star);

  scene.background = texture;

  return scene;
}
