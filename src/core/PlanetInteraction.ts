import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { SolarSystem } from "../types/planet.ts";

interface PlanetInteractionOptions {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  solarSystem: SolarSystem;
  onPlanetSelect?: (planetName: string) => void;
}

export function setupPlanetFocus({
  scene,
  camera,
  controls,
  renderer,
  solarSystem,
  onPlanetSelect,
}: PlanetInteractionOptions): void {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function getPlanetNameFromObject(object: THREE.Object3D | null): string | undefined {
    let current = object;

    while (current) {
      const name = current.userData.planetName as string | undefined;
      if (name) {
        return name;
      }
      current = current.parent;
    }

    return undefined;
  }

  function focusPlanet(name: string): void {
    const planet = solarSystem.getPlanetByName(name);
    if (!planet) {
      return;
    }

    const targetPosition = new THREE.Vector3();
    planet.getWorldPosition(targetPosition);
    const offset = camera.position.clone().sub(controls.target);

    controls.target.copy(targetPosition);
    camera.position.copy(targetPosition.clone().add(offset));
    controls.update();
  }

  let lastSelectedPlanet: string | null = null;

  renderer.domElement.addEventListener("pointerdown", (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(scene.children, true);
    const selected = intersections.find((intersection) =>
      getPlanetNameFromObject(intersection.object),
    );

    if (!selected) {
      return;
    }

    const planetName = getPlanetNameFromObject(selected.object);
    if (!planetName) {
      return;
    }

    if (lastSelectedPlanet === planetName) {
      return;
    }

    lastSelectedPlanet = planetName;
    focusPlanet(planetName);
    onPlanetSelect?.(planetName);
  });
}
