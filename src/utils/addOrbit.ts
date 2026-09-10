import * as THREE from "three";

export function addOrbit(
  target: THREE.Object3D,
  pivot: THREE.Object3D,
  color: number = 0xffffff,
  segments: number = 128,
) {
  const model = pivot.children[0];
  if (!model) return;

  const pos = model.position;
  const radius = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
  if (radius === 0) return;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius),
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.25,
  });
  const orbitLine = new THREE.LineLoop(geometry, material);

  target.add(orbitLine);
}
