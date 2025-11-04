import { MapContainer } from './components/MapContainer';

type MapViewProps = {
  providerKey: 'google' | 'baidu';
};

// Delegamos la renderización del mapa en el componente especializado del feature.
export const MapView = ({ providerKey }: MapViewProps) => (
  <MapContainer providerKey={providerKey} />
);
