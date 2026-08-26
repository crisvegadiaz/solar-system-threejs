import * as THREE from "three";
import type { Position } from "../types/common.ts";

export function planetModel(
  scale: number,
  tex: string,
  corded: Position,
  atmosTex?: string,
): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(
    0.1,
    32,
    32,
  );

  const charger: THREE.TextureLoader = new THREE.TextureLoader();
  const texture: THREE.Texture = charger.load(tex);

  const sphereMaterial: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: texture,
    });

  const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
    new THREE.Mesh(sphereShape, sphereMaterial);

  if (atmosTex) {
    const cloudsShape: THREE.SphereGeometry = new THREE.SphereGeometry(
      0.12,
      32,
      32,
    );
    const cloudsTexture: THREE.Texture = charger.load(atmosTex);
    const cloudsMaterial: THREE.MeshStandardMaterial =
      new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        alphaMap: cloudsTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

    const cloudsMesh: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshStandardMaterial
    > = new THREE.Mesh(cloudsShape, cloudsMaterial);
    sphere.add(cloudsMesh);
  }

  sphere.position.set(corded.x, corded.y, corded.z);

  sphere.castShadow = true;
  sphere.scale.setScalar(scale);

  return sphere;
}
