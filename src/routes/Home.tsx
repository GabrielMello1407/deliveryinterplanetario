import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Importando o arquivo de estilo CSS

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Recuperando os endereços cadastrados do localStorage
  const storedEnderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');

  const handleDelete = (index: number) => {
    const updatedEnderecos = [...storedEnderecos];
    updatedEnderecos.splice(index, 1); // Remove o endereço da lista
    localStorage.setItem('enderecos', JSON.stringify(updatedEnderecos));
    window.location.reload(); // Recarrega a página para refletir as alterações
  };

  const handleEdit = (index: number) => {
    navigate(`/edicao-endereco/${index}`); // Redireciona para a página de edição com o índice do endereço
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
            <p>Cep: {endereco.cep}</p>
            <p>Planeta: {endereco.planeta}</p>
            <p>País: {endereco.pais}</p>
            {endereco.planeta === 'Marte' && <p>Lote: {endereco.lote}</p>}
            <div className="endereco-buttons">
              <button onClick={() => handleDelete(index)}>Excluir</button>
              <button>
                <Link to={`/editarCadastro/${index}`}>Editar</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
