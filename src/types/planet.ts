import * as THREE from "three";

export interface Position3D {
  x?: number;
  y?: number;
  z?: number;
}

export interface SphereGeometryOptions {
  r?: number;
  ws?: number;
  hs?: number;
}

export interface AtmosphereConfig extends SphereGeometryOptions {
  name: string;
  texture?: string;
}

export interface PlanetConfig extends Position3D, SphereGeometryOptions {
  name: string;
  scale: number;
  texture?: string;
  parent?: string;
  speed?: number;
  clouds?: AtmosphereConfig;
  description?: string;
  facts?: string[];
}

export type PlanetMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
>;

export interface SolarSystem {
  sun: THREE.Object3D;
  update: () => void;
  getPlanetByName: (name: string) => THREE.Object3D | undefined;
  getPlanetInfoByName: (name: string) => PlanetConfig | undefined;
}
