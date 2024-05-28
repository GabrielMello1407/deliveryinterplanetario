import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

const EdicaoEndereco = () => {
  const { id } = useParams(); // Obter o ID do parâmetro da URL
  const navigate = useNavigate();

  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  // Carregar o endereço selecionado quando o ID da rota mudar
  useEffect(() => {
    const storedEnderecos = JSON.parse(
      localStorage.getItem('enderecos') || '[]',
    );
    const enderecoEncontrado = storedEnderecos.find((end) => end.id === id);
    setEnderecoSelecionado(enderecoEncontrado || null);
  }, [id]);

  // Se o endereço selecionado não for encontrado, redirecionar de volta para a página inicial
  useEffect(() => {
    if (!enderecoSelecionado) {
      navigate('/');
    }
  }, [enderecoSelecionado, navigate]);

  // Se o endereço selecionado ainda não foi carregado, mostrar uma mensagem de carregamento
  if (!enderecoSelecionado) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Edição de Endereço</h2>
      <Formik
        initialValues={enderecoSelecionado}
        enableReinitialize={true}
        validate={(values) => {
          // Adicione suas validações de formulário aqui
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Lógica para atualizar o endereço no localStorage
          const storedEnderecos = JSON.parse(
            localStorage.getItem('enderecos') || '[]',
          );
          const index = storedEnderecos.findIndex((end) => end.id === id);
          if (index !== -1) {
            storedEnderecos[index] = values;
            localStorage.setItem('enderecos', JSON.stringify(storedEnderecos));
          }
          // Redirecionar de volta para a página inicial após a atualização
          navigate('/');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <label className="label">
              Nome:
              <Field type="text" name="nome" className="input" />
              <ErrorMessage name="nome" component="p" className="error" />
            </label>
            <label className="label">
              Sobrenome:
              <Field type="text" name="sobrenome" className="input" />
              <ErrorMessage name="sobrenome" component="p" className="error" />
            </label>
            <label className="label">
              Rua:
              <Field type="text" name="rua" className="input" />
              <ErrorMessage name="rua" component="p" className="error" />
            </label>
            <label className="label">
              Número:
              <Field type="text" name="numero" className="input" />
              <ErrorMessage name="numero" component="p" className="error" />
            </label>
            <label className="label">
              Complemento:
              <Field type="text" name="complemento" className="input" />
              <ErrorMessage
                name="complemento"
                component="p"
                className="error"
              />
            </label>
            <label className="label">
              CEP:
              <Field type="text" name="cep" className="input" />
              <ErrorMessage name="cep" component="p" className="error" />
            </label>
            <label className="label">
              Planeta:
              <Field type="text" name="planeta" className="input" />
              <ErrorMessage name="planeta" component="p" className="error" />
            </label>
            {enderecoSelecionado.planeta === 'Marte' && (
              <label className="label">
                Lote:
                <Field type="text" name="lote" className="input" />
                <ErrorMessage name="lote" component="p" className="error" />
              </label>
            )}
            {enderecoSelecionado.planeta === 'Terra' && (
              <label className="label">
                País:
                <Field type="text" name="pais" className="input" />
                <ErrorMessage name="pais" component="p" className="error" />
              </label>
            )}
            <button type="submit" className="button" disabled={isSubmitting}>
              Atualizar Endereço
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EdicaoEndereco;
