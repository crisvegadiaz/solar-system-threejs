const GLTF_PLANETS = new Set(["jupiter", "saturn", "mars"]);

export const ASSETS = {
  star: "/textures/star.webp",
  isGltfModel(name: string): boolean {
    return GLTF_PLANETS.has(name.toLowerCase());
  },
  getAssetPath(name: string): string {
    return this.isGltfModel(name)
      ? `/models/${name.toLowerCase()}.glb`
      : `/textures/${name.toLowerCase()}.webp`;
  },
} as const;
