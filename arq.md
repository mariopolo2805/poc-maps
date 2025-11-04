Universal Map Component — Technical Specification
1) Overview
Universal Map Component is a headless, provider-agnostic React component system for rendering Points of Interest (POIs) with selection, geolocation, and clustering. The initial release supports Google Maps and is designed to incorporate Baidu Maps (and future providers) via a plugin pattern.

2) Goals and Non-Goals
Goals
Provider-agnostic API with initial Google support.
Headless design (no intrusive built-in UI controls).
Support for heterogeneous POIs (stores, drop points, etc.).
Clustering with consistent behavior across providers.
SSR compatibility (Next.js / React 18+).
Extensibility via Provider Plugin Pattern and Provider-Exposed Components (primitive bridge).
Non-Goals
Building a full set of proprietary UI controls (may be added later as optional helpers).
Granular conditional SDK loading from the core. SDKs are imported by the provider plugin, never by the core.
3) Architecture (High Level)
The system is split into three layers: App, Core, and Provider Plugin. The core defines contracts and orchestrates; the plugin implements native capabilities and exposes a registry of primitive components.


Key principles

The core does not import provider libraries; all access goes through the plugin.
Generic subcomponents (Map.Primitives.*) are resolved at runtime against the plugin registry.
Capability differences across providers are handled with fallbacks and dev warnings (safe no-ops).
4) Contracts
4.1 Provider Plugin (architectural view)
Contract for initialization, map creation/management, overlays, and primitive registry.

bootstrap(ctx): prepare SDK/wrappers and set up the registry.
createMap(el, options): instantiate the map and return a MapHandle.
createMarker(poi, ctx) / updateMarker(marker, poi).
enableClustering?(map, markers, opts?) / disableClustering?(cluster).
setViewType(map, view) and setBoundsRestriction?(map, bounds).
onIdle?(map, cb): integrate viewport lifecycle events.
registry: dictionary of exposed primitives (Marker, InfoWindow, etc.).
Note: this is a stable contract for all providers; the core is unaware of native APIs.

4.2 Primitives Contract (Provider-Exposed Components)
Normalized props that the plugin maps to native components.

Marker: position, onClick?, iconUrl?, selectedIconUrl?, providerProps?.
InfoWindow: position, visible?, onClose?, children, providerProps?.
Runtime bridge:


4.3 POI Layer Contract
Map.POILayer receives a flat list of POIs, manages selection (controlled/uncontrolled), and handles clustering by delegating to the provider.

5) Public API (Composable)
Minimal example (Google provider):

<MapProvider plugin={googlePlugin} mapSettings={...}>
  <Map.Container
    initialCenter={{ lat: 40.4, lng: -3.7 }}
    useUserLocation
    useUserLocationAsCenter
    mapBoundsRestriction={...}
    onUserLocationResolved={(loc)=>{}}
    onBoundsExceeded={(km)=>{}}
  >
    <Map.POILayer
      data={pois}
      selectedPOIId={selectedId}
      onPOISelect={setSelectedId}
      clustering
    />
  </Map.Container>
</MapProvider>
Subcomponents:

Map.Container: initializes/manages the map viewport.
Map.POILayer: renders POIs, selection, and integrates clustering.
Map.Primitives.*: bridge to provider native components (Marker, InfoWindow, ...).
Map.Controls may exist in the future as an optional helper (keep headless by default).

6) Data Schemas
export type POI = {
  id: string | number;
  type: 'store' | 'dropPoint';
  lat: number;
  lng: number;
  company?: string;
  iconDefaultUrl?: string;
  iconSelectedUrl?: string;
  iconComponent?: React.ReactNode; // takes priority over URLs
};

export type MapSettings = {
  viewType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  controls?: {
    mapType?: boolean;
    fullscreen?: boolean;
    zoom?: boolean;
    streetView?: boolean;
    pan?: boolean;
  };
};
Rules

iconComponent takes priority. If it coexists with iconDefaultUrl, a warning is logged and iconComponent is used.
7) Clustering (unified behavior)
Clustering is the responsibility of Map.POILayer and is delegated to the provider. Simple API: clustering (boolean) and optional clusterOptions (extensible).


Guidelines

Google (@googlemaps/markerclusterer): supports per-POI icons and zoom-on-click.
Baidu (PointCollection): uniform style; no per-POI icons. For heterogeneous iconography, disable clustering or segment by layers.
POI selection occurs after cluster zoom/expand; the selected style applies to the individual marker.
8) Provider Capability Matrix (summary)
Map types (viewType)
Unified API	Google	Baidu	Note
roadmap	ROADMAP	NORMAL	—
satellite	SATELLITE	SATELLITE	—
hybrid	HYBRID	HYBRID	—
terrain	TERRAIN	—	In Baidu: fallback to roadmap + dev warning
Controls (mapSettings.controls)
Control	Google	Baidu	Note
zoom	ZoomControl	NavigationControl (includes zoom)	✔
mapType	MapTypeControl	MapTypeControl	✔
streetView	StreetViewControl	PanoramaControl	Basic parity
fullscreen	FullscreenControl	—	no-op + warning in Baidu
pan	—	NavigationControl (directional)	Google: no-op
9) Lifecycle (SSR → Client)

Key points

SSR-safe: the core avoids window/document; the map initializes on the client only.
Placeholders: the consumer can provide loadingComponent during bootstrap.
onBoundsExceeded: computed in the core (e.g., displacement > 1000 km after idle).
10) Errors and Capability Tolerance
Misused props (e.g., iconComponent + iconDefaultUrl) → warning; continue with iconComponent.
Geolocation failure → onUserLocationResolved(null) and fallback to initialCenter.
Invalid provider or missing apiKey → clear developer error (no user-facing runtime crash).
Unsupported capability (control/type) → no-op + warning. Differences are documented.
11) Extensibility
New providers: implement ProviderPlugin and register primitives; the core remains unchanged.
New overlays: add to the registry contract (Polyline, Polygon, Heatmap, ...). The core exposes them as Map.Primitives.*.
Custom POI rendering: a provider may publish a native POILayer; the core keeps a generic fallback.
12) Practical Examples (condensed)
A. POIs with clustering and controlled selection

<MapProvider plugin={googlePlugin}>
  <Map.Container initialCenter={{ lat: 40.4, lng: -3.7 }}>
    <Map.POILayer data={pois} clustering selectedPOIId={selId} onPOISelect={setSel} />
  </Map.Container>
</MapProvider>
B. Using provider-bridged primitives

<MapProvider plugin={baiduPlugin}>
  <Map.Container initialCenter={{ lat: 31.23, lng: 121.47 }}>
    <Map.Primitives.Marker position={{ lat: 31.23, lng: 121.47 }} />
  </Map.Container>
</MapProvider>
C. Uncontrolled selection

<Map.POILayer data={pois} clustering onPOISelect={(poi)=>{ /* center and mark selected in core */ }} />
13) Decisions & Open Items
clusterOptions: define a minimal common shape (thresholds, cluster icon renderer) and map to what each provider supports.
onBoundsExceeded: parameterize threshold and unit (km) via prop.
14) Appendix: Interaction & State Rules
Click on POI: center the map and emit onPOISelect(poi).
Visual selection: use iconSelectedUrl or iconComponent override.
Controlled state: the App manages selectedPOIId.
Uncontrolled state: Map.POILayer maintains selection internally.
15) Quick Glossary
Registry: table of primitives published by the provider to be consumed by the core.
Primitives: atomic map components (Marker, InfoWindow, ...).
Plugin: provider adapter that implements the core contract.