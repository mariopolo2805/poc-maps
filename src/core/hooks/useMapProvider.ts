import { useMemo } from 'react';
import { BaiduMapsProvider } from '../providers/BaiduMapsProvider';
import { GoogleMapsProvider } from '../providers/GoogleMapsProvider';
import type { MapProviderComponent } from '../providers/MapProviderContext';

type ProviderKey = 'google' | 'baidu';

// Determina qué provider debe activarse en función de los parámetros de la URL.
const resolveProviderKey = (): ProviderKey => {
  if (typeof window === 'undefined') {
    return 'google';
  }

  const params = new URLSearchParams(window.location.search);
  return params.get('country')?.toUpperCase() === 'CH' ? 'baidu' : 'google';
};

export const useMapProvider = () => {
  // Memoriza la elección para mantener estable el provider durante el ciclo de vida del componente.
  const providerKey = useMemo(() => resolveProviderKey(), []);
  const Provider: MapProviderComponent = useMemo(
    () => (providerKey === 'baidu' ? BaiduMapsProvider : GoogleMapsProvider),
    [providerKey],
  );

  return { Provider, providerKey };
};
