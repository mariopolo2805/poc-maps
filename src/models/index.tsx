type Poi = {
  id: string;
  lat: number;
  lng: number;
  title?: string;
};

type PoiMarkersProps = {
  pois: Poi[];
  onPoiClick?: (poi: Poi) => void;
};

export type { Poi, PoiMarkersProps };
