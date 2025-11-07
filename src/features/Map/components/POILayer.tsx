import { useMemo } from 'react';
import { useMapProviderContext } from '@providers/MapProviderContext';
import { POI } from '@models';

type POILayerProps = {
  pois: POI[];
  onPoiClick?: (poi: POI) => void;
};

export const POILayer = ({ pois, onPoiClick }: POILayerProps) => {
  const {
    Primitives: { Marker },
  } = useMapProviderContext();

  const items = useMemo(() => pois, [pois]);

  return (
    <>
      {items.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          label={poi.label}
          type={poi.type}
          onClick={() => onPoiClick?.(poi)}
        />
      ))}
    </>
  );
};
