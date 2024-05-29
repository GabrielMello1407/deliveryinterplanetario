import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const storedEnderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');

  const handleDelete = (index: number) => {
    const updatedEnderecos = storedEnderecos.filter(
      (_: any, i: number) => i !== index,
    );
    localStorage.setItem('enderecos', JSON.stringify(updatedEnderecos));
    window.location.reload();
  };

  const handleEdit = (index: number) => {
    navigate(`/editarCadastro/${index}`);
  };

  return (
    <div className="home-container">
      <h1>Endereços Cadastrados</h1>
      <div className="endereco-list">
        {storedEnderecos.map((endereco: any, index: number) => (
          <div key={index} className="endereco-item">
            <p>Nome: {endereco.nome}</p>
            <p>Sobrenome: {endereco.sobrenome}</p>
            <p>Rua: {endereco.rua}</p>
            <p>Número: {endereco.numero}</p>
            <p>Complemento: {endereco.complemento}</p>
            <p>CEP: {endereco.cep}</p>
            <p>Planeta: {endereco.planeta}</p>
            {endereco.planeta === 'Marte' && <p>Lote: {endereco.lote}</p>}
            {endereco.planeta === 'Terra' && <p>País: {endereco.pais}</p>}
            <button onClick={() => handleEdit(index)}>Editar</button>
            <button onClick={() => handleDelete(index)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
