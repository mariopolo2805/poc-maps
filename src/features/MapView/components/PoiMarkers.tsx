import { useMemo } from 'react';
import { useMapProviderContext } from '../../../core/providers/MapProviderContext';
import { PoiMarkersProps } from '@models';

// Renderiza una capa de marcadores independiente del provider activo.
export const PoiMarkers = ({ pois, onPoiClick }: PoiMarkersProps) => {
  const {
    primitives: { Marker },
  } = useMapProviderContext();

  const items = useMemo(() => pois, [pois]);

  return (
    <>
      {items.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          label={poi.title}
          onClick={() => onPoiClick?.(poi)}
        />
      ))}
    </>
  );
};
