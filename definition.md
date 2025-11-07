## OBJETIVO

El desarrollador debe familiarizarse con la librería Google Maps JavaScript API en React y entregar un POC funcional que demuestre los comportamientos mínimos que necesitaremos en el futuro componente CDS Maps.

El resultado servirá como referencia técnica y aprendizaje para el desarrollo del componente definitivo.

## ALCANCE

- [x] El desarrollador debe crear o usar un proyecto en Google Cloud y generar una API Key para Maps JS, restringiéndola por dominio y habilitando solo las APIs necesarias (Maps JavaScript API y Places API si aplica).
- [x] Se debe crear un entorno React ligero, por ejemplo con Vite o Create React App, que cargue el mapa centrado por las propiedades center (lat/lng) y zoom.
- [x] El mapa debe renderizar una lista de marcadores dinámicos con id, lat, lng y title.
- [x] Debe manejar los eventos básicos onMapClick (devuelve coordenadas), onMarkerClick (devuelve id del marcador) y onIdle (devuelve bounds y zoom actuales).
- [x] El componente debe permitir re-centrar el mapa de forma controlada cuando cambie la propiedad center.

## PROPS Y EVENTOS ESPERADOS (borrador para CDS futuro)

El POC debe incluir un README con pasos de arranque, props y eventos implementados, buenas prácticas y configuración segura de la API Key.

También se deben incluir notas de accesibilidad, como fallback si el mapa no carga y foco visible en elementos interactivos.

## FUERA DE ALCANCE

- No se debe construir aún el wrapper CDS Maps definitivo.
- No aplicar estilos de MDS ni branding visual.
- No implementar clustering, rutas ni dibujo de polígonos.

## DEFINITION OF DONE

- [ ] El playground React debe ser ejecutable (npm start o pnpm dev).
- [ ] El mapa debe ser visible y permitir controlar center y zoom.
- [ ] La lista de marcadores debe renderizarse dinámicamente.
- [ ] Los eventos onMapClick, onMarkerClick y onIdle deben funcionar correctamente.
- [ ] El mapa debe re-centrarse de forma reactiva al actualizar la propiedad center.
- [ ] Debe existir un README con pasos para crear la API Key, props y eventos definidos, y próximos pasos.
- [ ] Debe incluirse una captura o GIF demostrativo del POC.
- [ ] Se debe generar una lista de decisiones y dudas abierta para el diseño final del CDS Maps.

## DOCUMENTACIÓN DE REFERENCIA{}

Guía oficial de Google para React:

https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js?hl=es-419#7
