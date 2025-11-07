import { useCallback } from 'react';
import { useMapProvider } from './core/hooks/useMapProvider';
import { Map } from './features/Map';
import { pois } from '@db';
import { POI } from '@models';

const App = () => {
  const { MapProvider, plugin } = useMapProvider();

  const handleCameraChanged = useCallback((data: { lat: number; lng: number; zoom: number }) => {
    console.log('[POC] (onCameraChanged): 🎥', {
      lat: data.lat,
      lng: data.lng,
      zoom: data.zoom,
    });
  }, []);

  const handleMapClick = useCallback(
    (data: { lat: number; lng: number; placeId: string | null }) => {
      console.log(`[POC] (onMapClick): 📌 ${data.placeId ?? '{no placeId}'}`, {
        lat: data.lat,
        lng: data.lng,
        ...(data.placeId && { placeId: data.placeId }),
      });
    },
    [],
  );

  const handlePoiClick = useCallback((data: POI) => {
    console.log(`[POC] (onPoiClick): 📍 ${data.label}`, {
      lat: data.lat,
      lng: data.lng,
    });
  }, []);

  const handleOnIdle = useCallback((data: string) => {
    console.log('[POC] (onIdle): 💤', { data });
  }, []);

  return (
    <MapProvider>
      <Map.Container
        plugin={plugin}
        initialCenter={{ lat: 40.4, lng: -3.7 }}
        initialZoom={6}
        onCameraChanged={handleCameraChanged}
        onMapClick={handleMapClick}
        onIdle={handleOnIdle}
      >
        <Map.POILayer pois={pois} onPoiClick={handlePoiClick} />
      </Map.Container>
    </MapProvider>
  );
};

export default App;
