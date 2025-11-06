import { PropsWithChildren, useEffect } from 'react';
import {
  MapComponentProps,
  MapMarkerProps,
  MapProviderContextProvider,
} from './MapProviderContext';
import './BaiduMapsProvider.scss';

// Superficie provisional que permite probar la orquestación sin SDK real de Baidu.
const BaiduPlaceholderSurface = ({ className, onCameraChanged, children }: MapComponentProps) => {
  void onCameraChanged;

  return (
    <div className={['baidu-map-placeholder', className].filter(Boolean).join(' ')}>
      <p className="baidu-map-placeholder__message">
        Integración de Baidu pendiente. Esta superficie actúa como stub para validar el flujo de
        providers.
      </p>
      <div className="baidu-map-placeholder__markers">{children}</div>
    </div>
  );
};

const BaiduPlaceholderMarker = ({ label }: MapMarkerProps) => (
  <span className="baidu-map-placeholder__marker">{label ?? 'POI'}</span>
);

export const BaiduMapsProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.warn('[BaiduMapsProvider] Implementación real pendiente. Se usa stub de desarrollo.');
  }, []);

  return (
    <MapProviderContextProvider
      value={{
        providerKey: 'baidu',
        MapComponent: BaiduPlaceholderSurface,
        primitives: { Marker: BaiduPlaceholderMarker },
      }}
    >
      {children}
    </MapProviderContextProvider>
  );
};
