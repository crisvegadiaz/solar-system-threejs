# 🪐 Sistema Solar 3D (Three.js + TypeScript)

Simulación interactiva 3D del Sistema Solar construida con **Three.js**, **TypeScript** y **Vite**. Incluye órbitas planetarias independientes, representación de satélites (como la Luna orbitando a la Tierra) y soporte para modelos GLTF y texturas 2D.

---

## 🚀 Requisitos e Instalación

### Prerrequisitos
- Node.js (v18+)
- npm / pnpm / yarn

### Comandos principales

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción
npm run build

# Previsualizar la versión compilada
npm run preview
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/      # Ensamblador del sistema solar y bucle de renderizado
├── constants/       # Resolvedor dinámico de recursos (texturas y modelos)
├── core/            # Módulos base de Three.js (Camera, Controls, Renderer, Scene)
├── data/            # Configuración de los cuerpos celestes (planets.json)
├── factories/       # Fábrica 3D para generar esferas y cargar modelos .glb
├── types/           # Definición de interfaces TypeScript
├── utils/           # Generadores auxiliares (órbitas y pivotes)
└── main.ts          # Punto de entrada principal de la aplicación
```

---

## ⚙️ Configuración de Planetas (`src/data/planets.json`)

Para agregar o modificar planetas/satélites, edita el archivo `src/data/planets.json`:

```json
{
  "name": "earth",
  "scale": 4,
  "x": 9,
  "speed": 0.0015,
  "clouds": {
    "name": "clouds",
    "r": 0.11
  }
}
```

### Propiedades disponibles:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `name` | `string` | Nombre del cuerpo celeste (coincide con el archivo en `public/textures/` o `public/models/`). |
| `scale` | `number` | Escala visual del modelo 3D. |
| `x` | `number` | Distancia desde su centro de órbita (origen o planeta padre). |
| `speed` | `number` | Velocidad de rotación orbital alrededor del origen/padre. |
| `parent` | `string` *(Opcional)* | Nombre del planeta al que orbita (ej. `"earth"` para la Luna). |
| `clouds` | `object` *(Opcional)* | Configuración para capas de atmósfera/nubes. |
