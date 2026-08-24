import { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import type { Position } from "../types/common.ts";

export async function modelLoader(
  scale: number,
  model: string,
  position: Position,
): Promise<Object3D> {
  const cargador = new GLTFLoader();

  try {
    const gltf: GLTF = await cargador.loadAsync(model, (progreso: ProgressEvent) => {
      if (progreso.total > 0) {
        const porcentaje = (progreso.loaded / progreso.total) * 100;
        console.log(`Cargando modelo: ${porcentaje.toFixed(1)}%`);
      }
    });

    const modelo: Object3D = gltf.scene as Object3D;

    modelo.position.set(position.x, position.y, position.z);
    modelo.scale.set(scale, scale, scale);

    modelo.traverse((objeto: any) => {
      if (objeto instanceof Mesh) {
        objeto.castShadow = true;
        objeto.receiveShadow = true;
      }
    });

    return modelo;
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}
