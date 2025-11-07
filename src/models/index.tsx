type POI = {
  id: string | number;
  type: 'store' | 'dropPoint';
  lat: number;
  lng: number;
  label?: string;
  company?: string;
  iconDefaultUrl?: string;
  iconSelectedUrl?: string;
  iconComponent?: React.ReactNode; // takes priority over URLs
};

// type MapSettings = {
//   viewType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
//   controls?: {
//     mapType?: boolean;
//     fullscreen?: boolean;
//     zoom?: boolean;
//     streetView?: boolean;
//     pan?: boolean;
//   };
// };

export const TypeColors = {
  store: { background: '#2563eb', glyphColor: '#ffffff', borderColor: '#1d4ed8' },
  dropPoint: { background: '#dc2626', glyphColor: '#fff', borderColor: '#b91c1c' },
};

export type { POI };
// export type { POI, MapSettings };
