import { ChangeEvent, FormEvent } from 'react';
import './Form.scss';

export type MapFormValues = {
  lat: string;
  lng: string;
  zoom: number;
};

export type FormComponentProps = {
  values: MapFormValues;
  error?: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onLatChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLngChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onZoomChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FormComponent = ({
  values,
  error,
  onSubmit,
  onLatChange,
  onLngChange,
  onZoomChange,
}: FormComponentProps) => (
  <form className="form" onSubmit={onSubmit}>
    <label className="field">
      <span className="field-label">Latitud</span>
      <input className="input" type="number" value={values.lat} onChange={onLatChange} />
    </label>
    <label className="field">
      <span className="field-label">Longitud</span>
      <input className="input" type="number" value={values.lng} onChange={onLngChange} />
    </label>
    <label className="field field--compact">
      <span className="field-label">Zoom</span>
      <input
        className="input input--zoom"
        type="number"
        value={values.zoom}
        onChange={onZoomChange}
      />
    </label>
    <button className="submit" type="submit">
      Buscar
    </button>
    {error && <span className="error">{error}</span>}
  </form>
);
