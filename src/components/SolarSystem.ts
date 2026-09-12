import * as THREE from "three";
import type { PlanetConfig, SolarSystem } from "../types/planet.ts";
import { createPlanetMesh } from "../factories/planetFactory.ts";
import { createPivotModel } from "../utils/createPivotModel.ts";
import { addOrbit } from "../utils/addOrbit.ts";
import planetsData from "../data/planets.json";

interface CelestialItem {
  config: PlanetConfig;
  mesh: THREE.Object3D;
  pivot?: THREE.Object3D;
}

/**
 * Creates and initializes the complete solar system scene with planets, orbits, and lights.
 */
export async function createSolarSystem(scene: THREE.Scene): Promise<SolarSystem> {
  const planetsConfig = planetsData as PlanetConfig[];

  const items: CelestialItem[] = await Promise.all(
    planetsConfig.map(async (config) => {
      const mesh = await createPlanetMesh(config);
      return { config, mesh };
    }),
  );

  const mainBodies: CelestialItem[] = [];
  const satellites: CelestialItem[] = [];
  const meshesMap = new Map<string, THREE.Object3D>();
  const pivotsMap = new Map<string, THREE.Object3D>();
  const infoMap = new Map<string, PlanetConfig>();

  planetsConfig.forEach((config) => {
    infoMap.set(config.name, config);
  });

  const getPlanetByName = (name: string): THREE.Object3D | undefined => meshesMap.get(name);
  const getPlanetInfoByName = (name: string): PlanetConfig | undefined => infoMap.get(name);

  items.forEach((item) => {
    meshesMap.set(item.config.name, item.mesh);
    if (item.config.parent) {
      satellites.push(item);
    } else {
      mainBodies.push(item);
    }
  });

  // Setup Sun and main planets orbiting the Sun
  mainBodies.forEach((item) => {
    const { config, mesh } = item;

    if (config.name === "sun") {
      setupSun(scene, mesh);
      pivotsMap.set("sun", mesh);
    } else {
      const pivot = createPivotModel(mesh);
      pivot.name = config.name;
      item.pivot = pivot;
      scene.add(pivot);
      addOrbit(scene, pivot);
      pivotsMap.set(config.name, pivot);
    }
  });

  // Setup satellites orbiting parent planets (e.g. Moon)
  satellites.forEach((item) => {
    const { config, mesh } = item;
    const parentName = config.parent!;
    const parentPivot = pivotsMap.get(parentName);
    const parentMesh = meshesMap.get(parentName);

    if (parentPivot && parentMesh) {
      const satellitePivot = createPivotModel(mesh);
      satellitePivot.name = `${config.name}Pivot`;
      satellitePivot.position.copy(parentMesh.position);
      item.pivot = satellitePivot;

      parentPivot.add(satellitePivot);
      addOrbit(satellitePivot, satellitePivot, 0x888888);
      pivotsMap.set(`${config.name}Pivot`, satellitePivot);
    }
  });

  function update(): void {
    // Rotate main planets around Sun and on their axes
    mainBodies.forEach(({ config, mesh, pivot }) => {
      if (config.name === "sun") return;

      if (pivot) {
        pivot.rotation.y += config.speed ?? 0.001;
      }
      if (mesh) {
        mesh.rotation.y += 0.01;
      }

      if (config.name === "earth") {
        const cloud = mesh.children?.[0] as THREE.Object3D | undefined;
        if (cloud) {
          cloud.rotation.y += 0.0008;
        }
      }
    });

    // Rotate satellites around parent planets and on their axes
    satellites.forEach(({ config, mesh, pivot }) => {
      if (pivot) {
        pivot.rotation.y += config.speed ?? 0.003;
      }
      if (mesh) {
        mesh.rotation.y += 0.008;
      }
    });
  }

  const sunModel = meshesMap.get("sun") ?? new THREE.Object3D();

  return {
    sun: sunModel,
    update,
    getPlanetByName,
    getPlanetInfoByName,
  };
}

function setupSun(scene: THREE.Scene, sunMesh: THREE.Object3D): void {
  scene.add(sunMesh);

  const light = new THREE.PointLight(0xffffff, 1000, 0, 2);
  light.position.set(0, 0, 0);
  sunMesh.add(light);

  if (sunMesh instanceof THREE.Mesh) {
    const sunMat = sunMesh.material as THREE.MeshStandardMaterial | undefined;
    if (sunMat) {
      sunMat.emissiveMap = sunMat.map;
      sunMat.emissive = new THREE.Color(0xffd61f);
      sunMat.emissiveIntensity = 2;
    }
  }
}
