import { ComponentType, PropsWithChildren, ReactNode, createContext, useContext } from 'react';

export type MapComponentProps = {
  className?: string;
  children?: ReactNode;
  center?: { lat: number; lng: number };
  zoom?: number;
  onCameraChanged?: (position: { center: { lat: number; lng: number }; zoom: number }) => void;
};

export type MapMarkerProps = {
  position: { lat: number; lng: number };
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
};

export type MapProviderPrimitives = {
  Marker: ComponentType<MapMarkerProps>;
};

export type MapProviderContextValue = {
  providerKey: 'google' | 'baidu';
  MapComponent: ComponentType<MapComponentProps>;
  primitives: MapProviderPrimitives;
};

// Contexto compartido que expone los primitivos del provider activo.
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
