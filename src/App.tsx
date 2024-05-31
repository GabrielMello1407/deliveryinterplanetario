// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import CadastroEndereco from './routes/CadastroEndereco';
import EdicaoEndereco from './routes/EdicaoEndereço';
import './App.css'; // Supondo que o CSS global esteja aqui

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroEndereco />} />
          <Route path="/editarCadastro/:id" element={<EdicaoEndereco />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
