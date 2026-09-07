import * as THREE from "three";

// Base types for 3D objects
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

export interface PlanetOptions extends Position3D, SphereGeometryOptions {
  texture: string;
  scale: number;
}

export interface AtmosphereOptions extends SphereGeometryOptions {
  texture: string;
}

// Valores por defecto
const DEFAULT_POSITION: Required<Position3D> = {
  x: 0,
  y: 0,
  z: 0,
};

const DEFAULT_SPHERE_GEOMETRY: Required<SphereGeometryOptions> = {
  r: 0.1,
  ws: 32,
  hs: 32,
};

/**
 * Clase que representa un planeta del sistema solar.
 *
 * `options` define las propiedades del planeta, incluyendo su textura,
 * escala y posición en el espacio.
 *
 * `atmosphereOptions` define las propiedades de la atmósfera del planeta,
 * si esta existe.
 */

export class Planet {
  public options: PlanetOptions;
  public atmosphereOptions?: AtmosphereOptions;

  constructor(
    planetOptions: PlanetOptions,
    atmosphereOptions?: AtmosphereOptions,
  ) {
    this.options = {
      ...DEFAULT_POSITION,
      ...DEFAULT_SPHERE_GEOMETRY,
      ...planetOptions,
    };

    this.atmosphereOptions = atmosphereOptions
      ? { ...DEFAULT_SPHERE_GEOMETRY, ...atmosphereOptions }
      : undefined;
  }
}

export type PlanetMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
>;

export interface PlanetModel {
  mesh: PlanetMesh;
  cloudsMesh?: PlanetMesh;
}
