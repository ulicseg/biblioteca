import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './src/assets/styles.css';

/**
 * Punto de entrada de la aplicación React
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
