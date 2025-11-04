import { useMapProvider } from './core/hooks/useMapProvider';
import { MapView } from './features/MapView';

const App = () => {
  // Selecciona dinámicamente el provider según los parámetros de la URL.
  const { Provider, providerKey } = useMapProvider();

  return (
    <Provider>
      <MapView providerKey={providerKey} />
    </Provider>
  );
};

export default App;
