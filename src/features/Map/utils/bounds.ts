import type { POI } from '@models';

export type Bounds = {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
};

const DEFAULT_BOUNDS: Bounds = {
  northEast: { lat: 0, lng: 0 },
  southWest: { lat: 0, lng: 0 },
};

export const calculateBounds = (items: POI[]): Bounds => {
  if (!items.length) {
    return DEFAULT_BOUNDS;
  }

  return items.reduce<Bounds>(
    (acc, poi) => ({
      northEast: {
        lat: Math.max(acc.northEast.lat, poi.lat),
        lng: Math.max(acc.northEast.lng, poi.lng),
      },
      southWest: {
        lat: Math.min(acc.southWest.lat, poi.lat),
        lng: Math.min(acc.southWest.lng, poi.lng),
      },
    }),
    {
      northEast: { lat: -Infinity, lng: -Infinity },
      southWest: { lat: Infinity, lng: Infinity },
    },
  );
};

export const calculateBoundsCenter = (bounds: Bounds): { lat: number; lng: number } => {
  const { northEast, southWest } = bounds;

  if (
    !Number.isFinite(northEast.lat) ||
    !Number.isFinite(northEast.lng) ||
    !Number.isFinite(southWest.lat) ||
    !Number.isFinite(southWest.lng)
  ) {
    return { lat: 0, lng: 0 };
  }

  return {
    lat: (northEast.lat + southWest.lat) / 2,
    lng: (northEast.lng + southWest.lng) / 2,
  };
};
