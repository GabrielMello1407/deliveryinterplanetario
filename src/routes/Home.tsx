import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Endereco } from '../types/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const storedEnderecos: Endereco[] = JSON.parse(
    localStorage.getItem('enderecos') || '[]',
  );

  const handleDelete = (index: number) => {
    const updatedEnderecos = storedEnderecos.filter(
      (_, i: number) => i !== index,
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
        {storedEnderecos.map((endereco: Endereco, index: number) => (
          <div key={index} className="endereco-item">
            <p>
              <span className="span-item">Nome:</span> {endereco.nome}
            </p>
            <p>
              <span className="span-item">Sobrenome:</span> {endereco.sobrenome}
            </p>
            <p>
              <span className="span-item">Planeta:</span> {endereco.planeta}
            </p>
            {endereco.planeta === 'Marte' && (
              <p>
                <span className="span-item">Lote:</span>
                {endereco.lote}
              </p>
            )}
            {endereco.planeta === 'Terra' && (
              <p>
                <span className="span-item">País:</span> {endereco.pais}
              </p>
            )}
            <p>
              <span className="span-item">Cidade:</span> {endereco.cidade}
            </p>
            <p>
              <span className="span-item">CEP:</span> {endereco.cep}
            </p>
            <p>
              <span className="span-item">Rua: </span>
              {endereco.rua}
            </p>
            <p>
              <span className="span-item">Número:</span> {endereco.numero}
            </p>
            <p>
              <span className="span-item">Complemento:</span>{' '}
              {endereco.complemento}
            </p>
            <div className="button-container">
              <button className="button" onClick={() => handleEdit(index)}>
                Editar
              </button>
              <button className="button" onClick={() => handleDelete(index)}>
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
