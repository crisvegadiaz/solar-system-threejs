import * as THREE from "three";
import type { AtmosphereOptions, Planet, PlanetMesh } from "../types/common";

export function planetModel(obj: Planet): PlanetMesh {
  const { options, atmosphereOptions } = obj;
  
  const loader = new THREE.TextureLoader();

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(options.r, options.hs, options.ws),
    new THREE.MeshStandardMaterial({
      map: loader.load(options.texture),
    }),
  );

  if (atmosphereOptions) {
    sphere.add(createAtmosphere(atmosphereOptions, loader));
  }

  sphere.position.set(options.x ?? 0, options.y ?? 0, options.z ?? 0);
  sphere.castShadow = true;
  sphere.scale.setScalar(options.scale ?? 1);

  return sphere;
}

function createAtmosphere(
  atmosphere: AtmosphereOptions,
  loader: THREE.TextureLoader,
): PlanetMesh {
  const cloudsTexture = loader.load(atmosphere.texture);
  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    transparent: true,
    alphaMap: cloudsTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Mesh(
    new THREE.SphereGeometry(atmosphere.r, atmosphere.hs, atmosphere.ws),
    cloudsMaterial,
  );
}
