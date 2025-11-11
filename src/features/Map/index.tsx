import { useMapProviderContext } from '@providers/MapProviderContext';
import { MapContainer } from './components/MapContainer';
import { POILayer } from './components/POILayer';
import { calculateBounds, calculateBoundsCenter } from './utils/bounds';
import { MapMarkerProps } from '@models';

const MapProviderMarker = (props: MapMarkerProps) => {
  const {
    Primitives: { Marker },
  } = useMapProviderContext();

  return <Marker {...props} />;
};

// Namespace
const Map = {
  Container: MapContainer,
  POILayer: POILayer,
  Utils: {
    calculateBounds,
    calculateBoundsCenter,
  },
  Primitives: {
    Marker: MapProviderMarker,
  },
};

export { Map };
