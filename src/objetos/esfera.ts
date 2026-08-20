import * as THREE from "three";
import tierraImg from "../assets/tierra.webp";
import nubesImg from "../assets/nubes.webp";

export function esfera(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
> {
  const formaEsfera: THREE.SphereGeometry = new THREE.SphereGeometry(
    0.9,
    32,
    32,
  );

  const cargador: THREE.TextureLoader = new THREE.TextureLoader();
  const textura: THREE.Texture = cargador.load(tierraImg);

  const materialEsfera: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: textura,
    });

  const esfera: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> =
    new THREE.Mesh(formaEsfera, materialEsfera);

  const formaNubes: THREE.SphereGeometry = new THREE.SphereGeometry(
    0.93,
    32,
    32,
  );
  const texturaNubes: THREE.Texture = cargador.load(nubesImg);
  const materialNubes: THREE.MeshStandardMaterial =
    new THREE.MeshStandardMaterial({
      map: texturaNubes,
      transparent: true,
      alphaMap: texturaNubes,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

  const nubesMesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshStandardMaterial
  > = new THREE.Mesh(formaNubes, materialNubes);
  esfera.add(nubesMesh);

  esfera.position.set(0, 0, 0);

  esfera.castShadow = true;

  return esfera;
}
