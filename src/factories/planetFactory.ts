import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { PlanetConfig, AtmosphereConfig } from "../types/planet.ts";
import { ASSETS } from "../constants/assets.ts";

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

/**
 * Creates or loads a 3D model for a planet/celestial body based on its configuration.
 */
export async function createPlanetMesh(config: PlanetConfig): Promise<THREE.Object3D> {
  const assetPath = config.texture || ASSETS.getAssetPath(config.name);

  if (ASSETS.isGltfModel(config.name)) {
    return loadGltfModel(assetPath, config);
  }

  return createSphereModel(assetPath, config);
}

function createSphereModel(texturePath: string, config: PlanetConfig): THREE.Mesh {
  const radius = config.r ?? 0.1;
  const widthSegments = config.ws ?? 32;
  const heightSegments = config.hs ?? 32;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(texturePath),
    }),
  );

  if (config.clouds) {
    const atmosphere = createAtmosphere(config.clouds);
    sphere.add(atmosphere);
  }

  sphere.position.set(config.x ?? 0, config.y ?? 0, config.z ?? 0);
  sphere.scale.setScalar(config.scale ?? 1);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.name = config.name;
  sphere.userData.planetName = config.name;

  return sphere;
}

function createAtmosphere(atmosphere: AtmosphereConfig): THREE.Mesh {
  const texturePath = atmosphere.texture || ASSETS.getAssetPath(atmosphere.name);
  const texture = textureLoader.load(texturePath);

  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    alphaMap: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const radius = atmosphere.r ?? 0.11;
  const widthSegments = atmosphere.ws ?? 32;
  const heightSegments = atmosphere.hs ?? 32;

  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    cloudsMaterial,
  );
}

async function loadGltfModel(modelPath: string, config: PlanetConfig): Promise<THREE.Object3D> {
  const gltf = await gltfLoader.loadAsync(modelPath);
  const model = gltf.scene;

  model.position.set(config.x ?? 0, config.y ?? 0, config.z ?? 0);
  model.scale.setScalar(config.scale ?? 1);
  model.name = config.name;
  model.userData.planetName = config.name;

  model.traverse((node: THREE.Object3D): void => {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.userData.planetName = config.name;
    }
  });

  return model;
}
