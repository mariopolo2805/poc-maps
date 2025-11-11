import { PropsWithChildren, useEffect } from 'react';
import { MapProviderContextProvider } from '../MapProviderContext';
import { MapInfoWindowProps, MapMarkerProps } from '@models';
import './BaiduMapsProvider.scss';

const BaiduPlaceholderInfoWindow = ({ className, children }: MapInfoWindowProps) => {
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
        plugin: 'baidu',
        Primitives: {
          Marker: BaiduPlaceholderMarker,
          InfoWindow: BaiduPlaceholderInfoWindow,
        },
      }}
    >
      {children}
    </MapProviderContextProvider>
  );
};
