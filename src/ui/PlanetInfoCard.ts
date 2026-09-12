import type { PlanetConfig } from "../types/planet.ts";

export interface PlanetInfoCardApi {
  show: (planetName: string, info: PlanetConfig | undefined) => void;
  hide: () => void;
}

export function createPlanetInfoCard(): PlanetInfoCardApi {
  const card = document.getElementById("planet-info-card") as HTMLElement | null;
  const title = document.getElementById("planet-info-name") as HTMLElement | null;
  const description = document.getElementById("planet-info-description") as HTMLElement | null;
  const factsList = document.getElementById("planet-info-facts") as HTMLUListElement | null;
  const closeButton = document.getElementById("planet-info-close") as HTMLButtonElement | null;

  let lastShownPlanet: string | null = null;

  const formatPlanetName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const hide = (): void => {
    card?.classList.add("hidden");
    lastShownPlanet = null;
  };

  const show = (planetName: string, info: PlanetConfig | undefined): void => {
    if (!card || !title || !description || !factsList || !info) {
      return;
    }

    if (lastShownPlanet === planetName && !card.classList.contains("hidden")) {
      return;
    }

    title.textContent = formatPlanetName(planetName);
    description.textContent = info.description ?? "Sin descripción disponible.";

    factsList.innerHTML = "";
    const facts = info.facts && info.facts.length > 0 ? info.facts : ["No hay datos adicionales disponibles."];

    facts.forEach((fact) => {
      const item = document.createElement("li");
      item.textContent = fact;
      factsList.appendChild(item);
    });

    card.classList.remove("hidden");
    lastShownPlanet = planetName;
  };

  closeButton?.addEventListener("click", hide);

  return { show, hide };
}
