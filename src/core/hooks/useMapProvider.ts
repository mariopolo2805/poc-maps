import { useMemo } from 'react';
import { BaiduMapsProvider } from '../providers/Baidu/BaiduMapsProvider';
import { GoogleMapsProvider } from '../providers/Google/GoogleMapsProvider';
import type { MapProviderComponent } from '../providers/MapProviderContext';

type ProviderPlugin = 'google' | 'baidu';

const resolveProviderPlugin = (): ProviderPlugin => {
  if (typeof window === 'undefined') {
    return 'google';
  }

  const params = new URLSearchParams(window.location.search);
  return params.get('country')?.toUpperCase() === 'CH' ? 'baidu' : 'google';
};

export const useMapProvider = () => {
  const plugin = useMemo(() => resolveProviderPlugin(), []);
  const MapProvider: MapProviderComponent = useMemo(
    () => (plugin === 'baidu' ? BaiduMapsProvider : GoogleMapsProvider),
    [plugin],
  );

  return { MapProvider, plugin };
};
