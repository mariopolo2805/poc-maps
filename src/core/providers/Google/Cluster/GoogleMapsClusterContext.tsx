import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  useCallback,
} from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer, type Marker } from '@googlemaps/markerclusterer';

type GoogleMapsClusterContextValue = {
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

const GoogleMapsClusterContext = createContext<GoogleMapsClusterContextValue | null>(null);

export const GoogleMapsClusterProvider = ({ children }: PropsWithChildren) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback(
    (marker: Marker | null, key: string) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;

      setMarkers((prev) => {
        if (marker) {
          return { ...prev, [key]: marker };
        } else {
          const newMarkers = { ...prev };
          delete newMarkers[key];
          return newMarkers;
        }
      });
    },
    [markers],
  );

  const value: GoogleMapsClusterContextValue = {
    setMarkerRef,
  };

  return (
    <GoogleMapsClusterContext.Provider value={value}>{children}</GoogleMapsClusterContext.Provider>
  );
};

export const useGoogleMapsCluster = (): GoogleMapsClusterContextValue => {
  const ctx = useContext(GoogleMapsClusterContext);
  if (!ctx) {
    throw new Error('useMapCluster must be used within a MapClusterProvider');
  }
  return ctx;
};
