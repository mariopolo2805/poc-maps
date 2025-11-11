import { ComponentType, PropsWithChildren, createContext, useContext } from 'react';
import { MapProviderContextValue } from '@models';

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
