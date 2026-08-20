import * as THREE from "three";
import tierraImg from "../assets/tierra.webp";
import nubesImg from "../assets/nubes.webp";

export function newSphere(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
> {
  const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(
    0.9,
    32,
    32,
  );

  const charger: THREE.TextureLoader = new THREE.TextureLoader();
  const texture: THREE.Texture = charger.load(tierraImg);

  const sphereMaterial: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: texture,
    });

  const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
    new THREE.Mesh(sphereShape, sphereMaterial);

  const cloudsShape: THREE.SphereGeometry = new THREE.SphereGeometry(
    0.93,
    32,
    32,
  );
  const cloudsTexture: THREE.Texture = charger.load(nubesImg);
  const cloudsMaterial: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      alphaMap: cloudsTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

  const nubesMesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshStandardMaterial
  > = new THREE.Mesh(cloudsShape, cloudsMaterial);
  sphere.add(nubesMesh);

  sphere.position.set(0, 0, 0);

  sphere.castShadow = true;

  return sphere;
}
