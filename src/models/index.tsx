import { ComponentType, ReactNode } from 'react';

// Map Context
export type MapInfoWindowProps = {
  className?: string;
  children?: ReactNode;
  center?: { lat: number; lng: number };
  zoom?: number;
  onCameraChanged?: (data: { center: { lat: number; lng: number }; zoom: number }) => void;
  onClick?: (data: { latLng: { lat: number; lng: number }; placeId: string | null }) => void;
  onIdle?: (data: string) => void;
};

export type MapMarkerProps = {
  id: string | number;
  position: { lat: number; lng: number };
  label?: string;
  type: 'store' | 'dropPoint';
  iconUrl?: string;
  onClick?: () => void;
};

export type MapProviderPrimitives = {
  Marker: ComponentType<MapMarkerProps>;
  InfoWindow: ComponentType<MapInfoWindowProps>;
};

export type MapProviderContextValue = {
  plugin: 'google' | 'baidu';
  Primitives: MapProviderPrimitives;
  enableClustering?: {
    isEnableClustering: boolean;
    setIsEnableClustering: (value: boolean) => void;
  };
};

// POI
export type POI = {
  id: string | number;
  type: 'store' | 'dropPoint';
  lat: number;
  lng: number;
  label?: string;
  company?: string;
  iconDefaultUrl?: string;
  iconSelectedUrl?: string;
  iconComponent?: React.ReactNode;
};

export const PinColors = {
  store: { background: '#2563eb', glyphColor: '#ffffff', borderColor: '#1d4ed8' },
  dropPoint: { background: '#dc2626', glyphColor: '#fff', borderColor: '#b91c1c' },
};

// Constants for default marker icons
export const STORE_ICON_URL =
  'https://static.oysho.net/6/static2/itxwebstandard/images/google_maps_markerV4_on.png';
export const DROPPOINT_ICON_URL =
  'https://static.oysho.net/6/static2/itxwebstandard/images/droppoints/google_maps_dp_on.png';
