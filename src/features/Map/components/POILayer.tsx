import { useMemo } from 'react';
import { useMapProviderContext } from '@providers/MapProviderContext';
import { POI } from '@models';

type POILayerProps = {
  pois: POI[];
  onPoiClick?: (poi: POI) => void;
  clustering?: boolean;
};

export const POILayer = ({ pois, onPoiClick, clustering }: POILayerProps) => {
  const {
    Primitives: { Marker },
    enableClustering,
  } = useMapProviderContext();

  useMemo(() => {
    enableClustering?.setIsEnableClustering?.(!!clustering);
  }, [clustering, enableClustering]);

  const items = useMemo(() => pois, [pois]);

  return (
    <>
      {items.map((poi) => (
        <Marker
          key={poi.id}
          id={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          label={poi.label}
          type={poi.type}
          onClick={() => onPoiClick?.(poi)}
        />
      ))}
    </>
  );
};
