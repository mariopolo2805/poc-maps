import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useMapProviderContext } from '@providers/MapProviderContext';
import { FormComponent } from '@features/Form';
import './MapContainer.scss';

const DEFAULT_ZOOM = 6;

type MapContainerProps = {
  plugin: 'google' | 'baidu';
  initialCenter: { lat: number; lng: number };
  initialZoom?: number;
  onCameraChanged?: (data: { lat: number; lng: number; zoom: number }) => void;
  onMapClick?: (data: { lat: number; lng: number; placeId: string | null }) => void;
  onIdle?: (data: string) => void;
  children?: React.ReactNode;
};

export const MapContainer = ({
  plugin,
  initialCenter,
  initialZoom,
  onCameraChanged,
  onMapClick,
  children,
}: MapContainerProps) => {
  const {
    Primitives: { InfoWindow },
  } = useMapProviderContext();
  /* Form state */
  const [latInput, setLatInput] = useState(String(initialCenter?.lat));
  const [lngInput, setLngInput] = useState(String(initialCenter?.lng));
  const [error, setError] = useState<string | null>(null);
  /* Map state */
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom || DEFAULT_ZOOM);

  const title = useMemo(() => (plugin === 'baidu' ? 'Baidu Maps (stub)' : 'Google Maps'), [plugin]);

  useEffect(() => {
    setMapCenter(initialCenter);
    setZoom(initialZoom || DEFAULT_ZOOM);
  }, [initialCenter]);

  /* Form handlers */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedLat = Number.parseFloat(latInput);
    const parsedLng = Number.parseFloat(lngInput);

    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) {
      setError('Latitud y longitud deben ser valores numéricos.');
      return;
    }

    if (parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180) {
      setError('Introduce una latitud entre -90 y 90 y una longitud entre -180 y 180.');
      return;
    }

    setMapCenter({ lat: parsedLat, lng: parsedLng });
    setError(null);
  };

  const handleLatChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLatInput(event.target.value);
  }, []);

  const handleLngChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLngInput(event.target.value);
  }, []);

  const handleZoomChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value);
    if (!Number.isFinite(value)) {
      return;
    }

    const clampedZoom = Math.max(0, Math.min(22, value));
    setZoom(Number.parseFloat(clampedZoom.toFixed(2)));
    setError(null);
  }, []);

  /* Map handlers */
  const handleCameraChanged = useCallback(
    (data: { center: { lat: number; lng: number }; zoom: number }) => {
      const { center, zoom: nextZoom } = data;

      setMapCenter((prev) => (prev.lat === center.lat && prev.lng === center.lng ? prev : center));
      setLatInput(center.lat.toFixed(6));
      setLngInput(center.lng.toFixed(6));
      setZoom((prev) => (prev === nextZoom ? prev : Number.parseFloat(nextZoom.toFixed(2))));
      onCameraChanged?.({ lat: center.lat, lng: center.lng, zoom: nextZoom });
    },
    [],
  );

  const handleClick = useCallback(
    (data: { latLng: { lat: number; lng: number }; placeId: string | null }) => {
      onMapClick?.({ lat: data.latLng.lat, lng: data.latLng.lng, placeId: data.placeId });
    },
    [zoom],
  );

  return (
    <section className="map">
      <header className="map__header">
        <h1 className="map__title">{title}</h1>
        <p className="map__meta">
          Provider activo: <strong>{plugin}</strong>
        </p>
      </header>
      <FormComponent
        values={{ lat: latInput, lng: lngInput, zoom }}
        error={error}
        onSubmit={handleSubmit}
        onLatChange={handleLatChange}
        onLngChange={handleLngChange}
        onZoomChange={handleZoomChange}
      />
      <div className="map__map-wrapper">
        <InfoWindow
          className="map-surface map__map-surface"
          center={mapCenter}
          zoom={zoom}
          onCameraChanged={handleCameraChanged}
          onClick={handleClick}
        >
          {children}
        </InfoWindow>
      </div>
    </section>
  );
};
