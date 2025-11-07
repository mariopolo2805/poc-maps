import { PropsWithChildren, useEffect } from 'react';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  AdvancedMarker,
  Pin,
  MapMouseEvent,
  MapEvent,
} from '@vis.gl/react-google-maps';
import {
  MapInfoWindowProps,
  MapMarkerProps,
  MapProviderContextProvider,
} from '../MapProviderContext';
import './GoogleMapsProvider.scss';
import { TypeColors } from '@models';

const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
if (!mapId) {
  throw new Error(
    '[GoogleMapsProvider] Google Map ID is missing. Please set VITE_GOOGLE_MAPS_MAP_ID in your .env file.',
  );
}

const GoogleInfoWindow = ({
  className,
  center,
  zoom,
  children,
  onCameraChanged,
  onClick,
  onIdle,
}: MapInfoWindowProps) => (
  <div className={['google-map-surface', className].filter(Boolean).join(' ')}>
    <Map
      center={center}
      zoom={zoom}
      mapId={mapId}
      className="google-map-surface__canvas"
      onCameraChanged={(ev: MapCameraChangedEvent) => {
        const data = {
          center: ev.detail.center,
          zoom: ev.detail.zoom,
        };
        onCameraChanged?.(data);
      }}
      onClick={(ev: MapMouseEvent) => {
        const data = {
          latLng: ev.detail.latLng,
          placeId: ev.detail.placeId,
        };
        onClick?.(data);
      }}
      onIdle={(ev: MapEvent) => {
        onIdle?.(ev.type);
      }}
    >
      {children}
    </Map>
  </div>
);

const GoogleMarker = ({ position, onClick, label, type, children }: MapMarkerProps) => {
  const pinProps = TypeColors[type] || TypeColors.store;

  return (
    <AdvancedMarker position={position} onClick={onClick} title={label}>
      {children ?? <Pin {...pinProps} />}
    </AdvancedMarker>
  );
};

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

  useEffect(() => {
    warnMissingKey(resolvedKey);
  }, [resolvedKey]);

  return (
    <APIProvider apiKey={resolvedKey ?? ''}>
      <MapProviderContextProvider
        value={{
          plugin: 'google',
          Primitives: {
            Marker: GoogleMarker,
            InfoWindow: GoogleInfoWindow,
          },
        }}
      >
        {children}
      </MapProviderContextProvider>
    </APIProvider>
  );
};
