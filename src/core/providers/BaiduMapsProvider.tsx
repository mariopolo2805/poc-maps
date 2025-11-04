import { PropsWithChildren, useEffect } from 'react';
import {
  MapComponentProps,
  MapProviderContextProvider,
} from './MapProviderContext';

// Superficie provisional que permite probar la orquestación sin SDK real de Baidu.
const BaiduPlaceholderSurface = ({ className }: MapComponentProps) => (
  <div
    className={className}
    style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      placeItems: 'center',
      background: '#fff2cc',
      border: '1px dashed #d97706',
      color: '#92400e',
      padding: '1rem',
      textAlign: 'center',
    }}
  >
    <p>
      Integración de Baidu pendiente. Esta superficie actúa como stub para validar el flujo de
      providers.
    </p>
  </div>
);

export const BaiduMapsProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.warn('[BaiduMapsProvider] Implementación real pendiente. Se usa stub de desarrollo.');
  }, []);

  return (
    <MapProviderContextProvider value={{ providerKey: 'baidu', MapComponent: BaiduPlaceholderSurface }}>
      {children}
    </MapProviderContextProvider>
  );
};
