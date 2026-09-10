import { newScene } from "./core/Scene.ts";
import { newCamera } from "./core/Camera.ts";
import { newRenderer } from "./core/Renderer.ts";
import { newControls } from "./core/Controls.ts";
import { createSolarSystem } from "./components/SolarSystem.ts";
import { ASSETS } from "./constants/assets.ts";

const scene = newScene(ASSETS.star);
const camera = newCamera();
const engine = newRenderer(camera);
const controls = newControls(camera, engine.domElement);

const solarSystem = await createSolarSystem(scene);

camera.position.set(0, 40, 0);
camera.lookAt(solarSystem.sun.position);

function update(): void {
  requestAnimationFrame(update);

  solarSystem.update();
  controls.update();

  engine.render(scene, camera);
}

update();
