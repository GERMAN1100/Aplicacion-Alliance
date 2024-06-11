import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/styles.css'; 

// Importar los polyfills
import { Buffer } from 'buffer';
import process from 'process';

// Añadir polyfills al objeto global
global.Buffer = Buffer;
global.process = process;


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
