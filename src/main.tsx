import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import './index.css';

// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
// pages
import CadastroEndereco from './routes/CadastroEndereco';
import EdicaoEndereco from './routes/EdicaoEndereço';
import Home from './routes/Home';
// context
import { EnderecoProvider } from './context/EnderecoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EnderecoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroEndereco />} />
          <Route path="/editarCadastro/:id" element={<EdicaoEndereco />} />
        </Routes>
      </Router>
    </EnderecoProvider>
  </React.StrictMode>,
);
