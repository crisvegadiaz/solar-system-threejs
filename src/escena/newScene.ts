import * as THREE from "three";
import fondo from "../assets/fondo.webp";

export function newScene(): THREE.Scene {
  const scene: THREE.Scene = new THREE.Scene();
  const texture: THREE.Texture = new THREE.TextureLoader().load(fondo);

  scene.background = texture;

  return scene;
}
