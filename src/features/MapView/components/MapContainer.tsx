import { FormEvent, useCallback, useMemo, useState } from 'react';
import { useMapProviderContext } from '../../../core/providers/MapProviderContext';
import './MapContainer.scss';
import { Poi } from '@models';
import { pois } from '@db';
import { PoiMarkers } from './PoiMarkers';

type MapContainerProps = {
  providerKey: 'google' | 'baidu';
};

const DEFAULT_CENTER = { lat: 40.3, lng: -3.4 };
const DEFAULT_ZOOM = 6;

export const MapContainer = ({ providerKey }: MapContainerProps) => {
  const { MapComponent } = useMapProviderContext();
  const [latInput, setLatInput] = useState(String(DEFAULT_CENTER.lat));
  const [lngInput, setLngInput] = useState(String(DEFAULT_CENTER.lng));
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(
    () => (providerKey === 'baidu' ? 'Baidu Maps (stub)' : 'Google Maps'),
    [providerKey],
  );

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

  const handleCameraChanged = useCallback(
    (position: { center: { lat: number; lng: number }; zoom: number }) => {
      const { center, zoom: nextZoom } = position;

      setMapCenter((prev) => (prev.lat === center.lat && prev.lng === center.lng ? prev : center));
      setLatInput(center.lat.toFixed(6));
      setLngInput(center.lng.toFixed(6));
      setZoom((prev) => (prev === nextZoom ? prev : Number.parseFloat(nextZoom.toFixed(2))));
    },
    [],
  );

  const handlePoiClick = useCallback((poi: Poi) => {
    alert(
      `📍 ${poi.title?.toUpperCase() ?? '<Sin título>'}\n\nLatitud: ${poi.lat}\nLongitud: ${poi.lng}`,
    );
  }, []);

  return (
    <section className="map-view">
      <header className="map-view__header">
        <h1 className="map-view__title">{title}</h1>
        <p className="map-view__meta">
          Provider activo: <strong>{providerKey}</strong>
        </p>
      </header>
      <form className="map-view__form" onSubmit={handleSubmit}>
        <label className="map-view__field">
          <span className="map-view__field-label">Latitud</span>
          <input
            className="map-view__input"
            type="number"
            value={latInput}
            onChange={(event) => setLatInput(event.target.value)}
            step="0.000001"
            min="-90"
            max="90"
          />
        </label>
        <label className="map-view__field">
          <span className="map-view__field-label">Longitud</span>
          <input
            className="map-view__input"
            type="number"
            value={lngInput}
            onChange={(event) => setLngInput(event.target.value)}
            step="0.000001"
            min="-180"
            max="180"
          />
        </label>
        <label className="map-view__field map-view__field--compact">
          <span className="map-view__field-label">Zoom</span>
          <input
            className="map-view__input map-view__input--zoom"
            type="number"
            value={zoom}
            onChange={(event) => {
              const value = Number.parseFloat(event.target.value);
              if (!Number.isFinite(value)) {
                return;
              }

              const clampedZoom = Math.max(0, Math.min(22, value));
              setZoom(Number.parseFloat(clampedZoom.toFixed(2)));
              setError(null);
            }}
            min="0"
            max="22"
            step="0.1"
          />
        </label>
        <button className="map-view__submit" type="submit">
          Buscar
        </button>
        {error && <span className="map-view__error">{error}</span>}
      </form>
      <div className="map-view__map-wrapper">
        <MapComponent
          className="map-surface map-view__map-surface"
          center={mapCenter}
          zoom={zoom}
          onCameraChanged={handleCameraChanged}
        >
          <PoiMarkers pois={pois} onPoiClick={handlePoiClick} />
        </MapComponent>
      </div>
    </section>
  );
};
