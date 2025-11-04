import { PropsWithChildren, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapComponentProps, MapProviderContextProvider } from './MapProviderContext';

const DEFAULT_CENTER = { lat: 40.4168, lng: -3.7038 };
const DEFAULT_ZOOM = 5;

// Renderiza el componente Map de @vis.gl/react-google-maps con estilos responsive.
const GoogleMapSurface = ({
  className,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  children,
}: MapComponentProps) => (
  <div className={className} style={{ width: '100%', height: '100%' }}>
    <Map defaultCenter={center} defaultZoom={zoom} style={{ width: '100%', height: '100%' }}>
      {children}
    </Map>
  </div>
);

const warnMissingKey = (apiKey?: string) => {
  if (!apiKey) {
    console.warn(
      '[GoogleMapsProvider] No API key was supplied. Provide VITE_GOOGLE_MAPS_API_KEY or pass apiKey prop.',
    );
  }
};

export type GoogleMapsProviderProps = PropsWithChildren<{
  apiKey?: string;
}>;

export const GoogleMapsProvider = ({ apiKey, children }: GoogleMapsProviderProps) => {
  const resolvedKey = apiKey ?? import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Avisamos en desarrollo si falta la API key para evitar sorpresas en tiempo de ejecución.
  useEffect(() => {
    warnMissingKey(resolvedKey);
  }, [resolvedKey]);

  return (
    <APIProvider apiKey={resolvedKey ?? ''}>
      <MapProviderContextProvider value={{ providerKey: 'google', MapComponent: GoogleMapSurface }}>
        {children}
      </MapProviderContextProvider>
    </APIProvider>
  );
};
