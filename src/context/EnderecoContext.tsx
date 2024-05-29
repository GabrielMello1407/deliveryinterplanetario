import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Endereco {
  nome: string;
  sobrenome: string;
  rua: string;
  numero: string;
  complemento: string;
  cep: string;
  planeta: string;
  pais?: string; 
}

interface EnderecoContextData {
  endereco: Endereco;
  setEndereco: (endereco: Endereco) => void;
}

const EnderecoContext = createContext<EnderecoContextData | undefined>(
  undefined,
);

export const useEndereco = () => {
  const context = useContext(EnderecoContext);
  if (!context) {
    throw new Error('useEndereco must be used within a EnderecoProvider');
  }
  return context;
};

export const EnderecoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [endereco, setEndereco] = useState<Endereco>({
    nome: '',
    sobrenome: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    planeta: 'Terra',
    pais: '', // Inicializando o campo "país" como vazio
  });

  return (
    <EnderecoContext.Provider value={{ endereco, setEndereco }}>
      {children}
    </EnderecoContext.Provider>
  );
};
