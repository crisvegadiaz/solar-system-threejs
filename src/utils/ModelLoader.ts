import { Mesh, Object3D } from "three";
import type { Planet } from "../types/common";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Load a GLTF model for a Planet and apply basic transforms/shadow settings.
 * Validates required options and applies sensible defaults for position/scale.
 */
export async function modelLoader(obj: Planet): Promise<Object3D> {
  const { options } = obj;
  const { texture, x = 0, y = 0, z = 0, scale = 1 } = options ?? {};

  if (!texture) {
    throw new Error("options.texture is required to load a model.");
  }

  const loader = new GLTFLoader();

  const handleProgress = (event: ProgressEvent): void => {
    if (event.total && event.total > 0) {
      const percentage = (event.loaded / event.total) * 100;
      console.log(`Loading model: ${percentage.toFixed(1)}%`);
    }
  };

  try {
    const gltf: GLTF = await loader.loadAsync(texture, handleProgress);

    const model: Object3D = gltf.scene;

    model.position.set(x, y, z);
    model.scale.setScalar(scale);

    model.traverse((node: Object3D): void => {
      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}
