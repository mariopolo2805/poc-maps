import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Punto de arranque que monta la aplicación dentro del contenedor raíz.

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
