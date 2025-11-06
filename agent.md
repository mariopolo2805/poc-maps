# POC React + Vite + TypeScript

## Objetivo

Crear una prueba de concepto (POC) que implemente:

- **React 18 + Vite + TypeScript**.
- **Patrón FDS (Future-Sliced Design)** para organizar componentes.
- Una **capa de abstracción para gestión de mapas**, que seleccione el proveedor en tiempo de ejecución según `queryParam` en la URL.

## Requisitos funcionales

- Si la URL contiene `?country=CH`, usar **ProviderBaidu**.
- Para cualquier otro caso, usar **ProviderGoogle**.
- **ProviderGoogle** debe gestionar mapas usando [react-google-maps](https://visgl.github.io/react-google-maps/).

## Estructura esperada

```
src/
  core/
    providers/
      GoogleMapsProvider.tsx
      BaiduMapsProvider.tsx
    hooks/
      useMapProvider.ts
  features/
    MapView/
      components/
        MapContainer.tsx
      index.ts
  App.tsx
  main.tsx
```

## Guía para Copilot

- Genera componentes funcionales con **TypeScript**.
- Sigue el patrón **FDS**: separar lógica (hooks), UI (components) y providers.
- Añade comentarios explicativos en cada archivo.
- Usa `react-google-maps` para el caso Google.
- Implementa un hook `useMapProvider` que:
  - Lea `queryParam` de la URL.
  - Devuelva el provider adecuado.
- El `App.tsx` debe envolver la aplicación con el provider correcto.

## Iteración inicial

0. Analizar el contenido de 'arq.md' para entender los requisitos de arquitectura.
1. Crear `GoogleMapsProvider.tsx` con configuración básica de `react-google-maps`.
2. Crear `BaiduMapsProvider.tsx` (stub inicial).
3. Crear `useMapProvider.ts` para lógica de selección.
4. Crear `MapContainer.tsx` que muestre un mapa usando el provider activo.

---
