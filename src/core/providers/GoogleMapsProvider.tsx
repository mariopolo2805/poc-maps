import { PropsWithChildren, useEffect } from 'react';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import {
  MapComponentProps,
  MapMarkerProps,
  MapProviderContextProvider,
} from './MapProviderContext';
import './GoogleMapsProvider.scss';

const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
if (!mapId) {
  throw new Error(
    '[GoogleMapsProvider] Google Map ID is missing. Please set VITE_GOOGLE_MAPS_MAP_ID in your .env file.',
  );
}

// Renderiza el componente Map de @vis.gl/react-google-maps con estilos responsive.
const GoogleMapSurface = ({
  className,
  center,
  zoom,
  children,
  onCameraChanged,
}: MapComponentProps) => (
  <div className={['google-map-surface', className].filter(Boolean).join(' ')}>
    <Map
      center={center}
      zoom={zoom}
      mapId={mapId}
      className="google-map-surface__canvas"
      onCameraChanged={(ev: MapCameraChangedEvent) => {
        const position = { center: ev.detail.center, zoom: ev.detail.zoom };
        onCameraChanged?.(position);
      }}
    >
      {children}
    </Map>
  </div>
);

const GoogleMarker = ({ position, onClick, label, children }: MapMarkerProps) => (
  <AdvancedMarker position={position} onClick={onClick} title={label}>
    {children ?? <Pin background="#2563eb" glyphColor="#ffffff" borderColor="#1d4ed8" />}
  </AdvancedMarker>
);

const warnMissingKey = (apiKey?: string) => {
  if (!apiKey) {
    throw new Error(
      '[GoogleMapsProvider] No API key was supplied. Provide VITE_GOOGLE_MAPS_API_KEY or pass apiKey prop.',
    );
  }
};

export type GoogleMapsProviderProps = PropsWithChildren<{
  apiKey?: string;
  mapId?: string;
}>;

export const GoogleMapsProvider = ({ apiKey, children }: GoogleMapsProviderProps) => {
  const resolvedKey = apiKey ?? import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Avisamos en desarrollo si falta la API key para evitar sorpresas en tiempo de ejecución.
  useEffect(() => {
    warnMissingKey(resolvedKey);
  }, [resolvedKey]);

  return (
    <APIProvider apiKey={resolvedKey ?? ''}>
      <MapProviderContextProvider
        value={{
          providerKey: 'google',
          MapComponent: GoogleMapSurface,
          primitives: { Marker: GoogleMarker },
        }}
      >
        {children}
      </MapProviderContextProvider>
    </APIProvider>
  );
};
