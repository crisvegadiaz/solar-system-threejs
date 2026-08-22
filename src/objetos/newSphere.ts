import * as THREE from "three";

type Sphere = {
  r: number;
  sh: number;
  sv: number;
  tex: string;
};

type Position = {
  x: number;
  y: number;
  z: number;
};

export function newSphere(
  corded: Position,
  planet: Sphere,
  atmosphere?: Sphere,
): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(
    planet.r,
    planet.sh,
    planet.sv,
  );

  const charger: THREE.TextureLoader = new THREE.TextureLoader();
  const texture: THREE.Texture = charger.load(planet.tex);

  const sphereMaterial: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: texture,
    });

  const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
    new THREE.Mesh(sphereShape, sphereMaterial);

  if (atmosphere) {
    const cloudsShape: THREE.SphereGeometry = new THREE.SphereGeometry(
      atmosphere.r,
      atmosphere.sh,
      atmosphere.sv,
    );
    const cloudsTexture: THREE.Texture = charger.load(atmosphere.tex);
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

  return sphere;
}
