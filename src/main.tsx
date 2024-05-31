// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { EnderecoProvider } from './context/EnderecoContext';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <EnderecoProvider>
        <Router>
          <App />
        </Router>
      </EnderecoProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Elemento root não encontrado');
}
