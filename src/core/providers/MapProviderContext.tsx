import { ComponentType, PropsWithChildren, ReactNode, createContext, useContext } from 'react';

export type MapInfoWindowProps = {
  className?: string;
  children?: ReactNode;
  center?: { lat: number; lng: number };
  zoom?: number;
  onCameraChanged?: (data: { center: { lat: number; lng: number }; zoom: number }) => void;
  onClick?: (data: { latLng: { lat: number; lng: number }; placeId: string | null }) => void;
  onIdle?: (data: string) => void;
};

export type MapMarkerProps = {
  position: { lat: number; lng: number };
  label?: string;
  type: 'store' | 'dropPoint';
  onClick?: () => void;
  children?: ReactNode;
};

export type MapProviderPrimitives = {
  Marker: ComponentType<MapMarkerProps>;
  InfoWindow: ComponentType<MapInfoWindowProps>;
};

export type MapProviderContextValue = {
  plugin: 'google' | 'baidu';
  Primitives: MapProviderPrimitives;
};

const MapProviderContext = createContext<MapProviderContextValue | null>(null);

export type MapProviderComponent = ComponentType<PropsWithChildren>;

export const MapProviderContextProvider = MapProviderContext.Provider;

export const useMapProviderContext = () => {
  const context = useContext(MapProviderContext);
  if (!context) {
    throw new Error('useMapProviderContext must be used within an active map provider.');
  }
  return context;
};
