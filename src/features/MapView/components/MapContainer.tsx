import { useMemo } from 'react';
import { useMapProviderContext } from '../../../core/providers/MapProviderContext';

type MapContainerProps = {
  providerKey: 'google' | 'baidu';
};

const DEFAULT_CENTER = { lat: 40.4168, lng: -3.7038 };
const DEFAULT_ZOOM = 5;

export const MapContainer = ({ providerKey }: MapContainerProps) => {
  const { MapComponent } = useMapProviderContext();
  // Preparamos un título amigable para identificar el proveedor activo en la UI.
  const title = useMemo(
    () => (providerKey === 'baidu' ? 'Baidu Maps (stub)' : 'Google Maps'),
    [providerKey],
  );

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <header>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h1>
        <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>
          Provider activo: <strong>{providerKey}</strong>
        </p>
      </header>
      <div style={{ flex: 1, minHeight: '420px' }}>
        <MapComponent className="map-surface" center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} />
      </div>
    </section>
  );
};
