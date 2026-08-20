import * as THREE from "three";
import fondo from "../assets/fondo.webp";

export function newScene(): THREE.Scene {
  const escena: THREE.Scene = new THREE.Scene();
  const textura: THREE.Texture = new THREE.TextureLoader().load(fondo);

  escena.background = textura;

  return escena;
}
