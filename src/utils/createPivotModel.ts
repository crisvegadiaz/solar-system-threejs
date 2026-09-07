import * as THREE from "three";

export function createPivotModel(
  model: THREE.Object3D,
): THREE.Object3D {
  const pivot = new THREE.Object3D();
  pivot.add(model);
  pivot.rotation.y = Math.random() * Math.PI * 2;
  return pivot;
}
