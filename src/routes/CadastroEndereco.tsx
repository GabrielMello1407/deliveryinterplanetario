import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEndereco } from '../context/EnderecoContext';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { FormValues } from '../types/types';

const CadastroEndereco: React.FC = () => {
  const { endereco, setEndereco } = useEndereco();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const initialValues: FormValues = {
    nome: endereco.nome || '',
    sobrenome: endereco.sobrenome || '',
    rua: endereco.rua || '',
    numero: endereco.numero || '',
    complemento: endereco.complemento || '',
    cep: '',
    planeta: endereco.planeta || 'Terra',
    lote: endereco.lote || '',
    pais: endereco.pais || '',
    cidade: endereco.cidade || '',
  };

  if (submitted) {
    navigate('/');
  }

  return (
    <div className="container">
      <div className="container-content">
        <h2 className="title">Cadastro de Endereço Delivery</h2>
        <p>Cadastre seu endereço para realizar a sua entrega!</p>
      </div>
      <div className="container-form">
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.nome) {
              errors.nome = 'Campo obrigatório';
            }
            if (!values.sobrenome) {
              errors.sobrenome = 'Campo obrigatório';
            }
            if (!values.planeta) {
              errors.planeta = 'Selecione um planeta';
            }
            if (values.planeta === 'Marte' && !values.lote) {
              errors.lote = 'Campo obrigatório para Marte';
            }
            if (values.planeta === 'Terra' && !values.pais) {
              errors.pais = 'Campo obrigatório para a Terra';
            }
            if (values.planeta === 'Terra' && !values.cep) {
              errors.cep = 'Campo obrigatório';
            } else if (
              values.planeta === 'Terra' &&
              values.cep &&
              !/^\d{5}-\d{3}$/.test(values.cep)
            ) {
              errors.cep = 'CEP inválido';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Endereço cadastrado:', values);

            const storedEnderecos = JSON.parse(
              localStorage.getItem('enderecos') || '[]',
            );
            storedEnderecos.push(values);
            localStorage.setItem('enderecos', JSON.stringify(storedEnderecos));

            setEndereco({
              nome: '',
              sobrenome: '',
              rua: '',
              numero: '',
              complemento: '',
              cep: '',
              planeta: 'Terra',
              lote: '',
              pais: '',
              cidade: '',
            });

            setSubmitted(true);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="form">
              <label className="label">
                Nome
                <Field
                  type="text"
                  name="nome"
                  className="input"
                  placeholder="Insira seu nome"
                />
                <ErrorMessage name="nome" component="p" className="error" />
              </label>
              <label className="label">
                Sobrenome
                <Field
                  type="text"
                  name="sobrenome"
                  className="input"
                  placeholder="Insira seu sobrenome"
                />
                <ErrorMessage
                  name="sobrenome"
                  component="p"
                  className="error"
                />
              </label>
              <div>
                <div className="label">Planeta</div>
                <div
                  role="group"
                  aria-labelledby="planeta-group"
                  className="radio-input"
                >
                  <label>
                    <Field type="radio" name="planeta" value="Terra" />
                    Terra
                  </label>
                  <label>
                    <Field type="radio" name="planeta" value="Marte" />
                    Marte
                  </label>
                </div>
              </div>
              <ErrorMessage name="planeta" component="p" className="error" />
              {values.planeta === 'Marte' ? (
                <>
                  <label className="label">
                    Lote
                    <Field
                      type="number"
                      name="lote"
                      className="input"
                      maxLength={4}
                      placeholder="Insira seu lote"
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          4,
                        );
                      }}
                    />
                    <ErrorMessage name="lote" component="p" className="error" />
                  </label>
                </>
              ) : (
                <>
                  {values.planeta === 'Terra' && (
                    <label className="label">
                      País
                      <Field
                        type="text"
                        name="pais"
                        className="input"
                        placeholder="Insira seu país"
                      />
                      <ErrorMessage
                        name="pais"
                        component="p"
                        className="error"
                      />
                    </label>
                  )}
                  <label className="label">
                    Cep
                    <Field
                      type="text"
                      name="cep"
                      className="input"
                      placeholder="00000-000"
                    />
                    <ErrorMessage name="cep" component="p" className="error" />
                  </label>

                  <label className="label">
                    Cidade
                    <Field
                      type="text"
                      name="cidade"
                      className="input"
                      placeholder="Insira sua cidade"
                    />
                    <ErrorMessage
                      name="cidade"
                      component="p"
                      className="error"
                    />
                  </label>

                  <label className="label">
                    Rua
                    <Field
                      type="text"
                      name="rua"
                      className="input"
                      placeholder="Insira sua rua"
                    />
                    <ErrorMessage name="rua" component="p" className="error" />
                  </label>
                  <label className="label">
                    Número
                    <Field
                      type="number"
                      name="numero"
                      className="input"
                      placeholder="Insira seu número"
                    />
                    <ErrorMessage
                      name="numero"
                      component="p"
                      className="error"
                    />
                  </label>
                  <label className="label">
                    Complemento
                    <Field
                      type="text"
                      name="complemento"
                      className="input"
                      placeholder="Insira seu complemento(opcional)"
                    />
                  </label>
                </>
              )}
              <button type="submit" className="btn-12" disabled={isSubmitting}>
                <span>Cadastrar Endereço</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CadastroEndereco;
