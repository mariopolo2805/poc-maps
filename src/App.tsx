import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMapProvider } from './core/hooks/useMapProvider';
import { Map } from './features/Map';
import { spainPois, francePois } from '@db';
// import { DROPPOINT_ICON_URL, POI, STORE_ICON_URL } from '@models';
import { POI } from '@models';

const DEBOUNCE_CAMERA_CHANGE_MS = 300;

const App = () => {
  const { MapProvider, plugin } = useMapProvider();
  // POI info: pois and selectedPOI
  const [pois, setPois] = useState<POI[]>(spainPois);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  // Map info: bounds and center
  const bounds = useMemo(() => Map.Utils.calculateBounds(pois), [pois]);
  const center = useMemo(() => Map.Utils.calculateBoundsCenter(bounds), [bounds]);

  // Debounced camera change handling (to prevent excessive calls)
  const cameraTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCameraDataRef = useRef<{ lat: number; lng: number; zoom: number } | null>(null);

  useEffect(
    () => () => {
      if (cameraTimerRef.current) clearTimeout(cameraTimerRef.current);
    },
    [],
  );

  // Container events: handleCameraChanged
  const handleCameraChanged = useCallback((data: { lat: number; lng: number; zoom: number }) => {
    lastCameraDataRef.current = data;
    if (cameraTimerRef.current) clearTimeout(cameraTimerRef.current);

    cameraTimerRef.current = setTimeout(() => {
      const lastData = lastCameraDataRef.current;
      if (!lastData) return;

      console.log('[POC] (onCameraChanged): 🎥', lastData);
    }, DEBOUNCE_CAMERA_CHANGE_MS);
  }, []);

  // Container events: handleMapClick
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

  // Container events: handleOnIdle
  const handleOnIdle = useCallback((data: string) => {
    console.log('[POC] (onIdle): 💤', { data });
  }, []);

  // POILayer events: handlePoiClick
  const handlePoiClick = useCallback((data: POI) => {
    console.log(`[POC] (onPoiClick): 📍 ${data.label}`, {
      lat: data.lat,
      lng: data.lng,
    });
    setSelectedPOI(data);
  }, []);

  // Marker events: handleMarkerClick
  // const handleMarkerClick = useCallback((data: { id: string }) => {
  //   console.log('[POC] (onMarkerClick): 🚩', data);
  // }, []);

  // Top bar handlers: handleSetPois
  const handleSetPois = (newPois: POI[]) => {
    setPois(newPois);
    setSelectedPOI(null);
  };

  // Top bar handlers: handleProviderChange
  const handleProviderChange = () => {
    const currentUrl = new URL(window.location.href);
    const currentCountry = currentUrl.searchParams.get('country');
    if (currentCountry === 'CH') {
      currentUrl.searchParams.delete('country');
    } else {
      currentUrl.searchParams.set('country', 'CH');
    }
    window.location.href = currentUrl.toString();
  };

  return (
    <>
      {selectedPOI?.id && <span className="selected-poi">Selected POI ID: {selectedPOI?.id}</span>}
      <div className="top-bar">
        <div className="poi-switcher">
          <span className="poi-switcher__label">Change POC POIs:</span>
          <button className="poi-switcher__button" onClick={() => handleSetPois(spainPois)}>
            Spain
          </button>
          <button className="poi-switcher__button" onClick={() => handleSetPois(francePois)}>
            France
          </button>
        </div>
        <div className="provider-switcher">
          <button className="provider-switcher__button" onClick={() => handleProviderChange()}>
            Change Provider
          </button>
        </div>
      </div>
      <MapProvider>
        <Map.Container
          plugin={plugin}
          initialCenter={center}
          onCameraChanged={handleCameraChanged}
          onMapClick={handleMapClick}
          onIdle={handleOnIdle}
        >
          {/* <Map.Primitives.Marker
            id="burgos-store"
            label="burgos-store"
            type="store"
            position={{ lat: 42.33, lng: -3.68 }}
            iconUrl={STORE_ICON_URL}
            onClick={() => handleMarkerClick({ id: 'burgos-store' })}
          />
          <Map.Primitives.Marker
            id="burdeos-dropPoint"
            label="burdeos-dropPoint"
            type="dropPoint"
            position={{ lat: 44.84, lng: -0.58 }}
            iconUrl={DROPPOINT_ICON_URL}
            onClick={() => handleMarkerClick({ id: 'burdeos-dropPoint' })}
          /> */}
          <Map.POILayer pois={pois} onPoiClick={handlePoiClick} clustering />
        </Map.Container>
      </MapProvider>
    </>
  );
};

export default App;
