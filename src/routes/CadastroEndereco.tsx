import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEndereco } from '../context/EnderecoContext';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  nome: string;
  sobrenome: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  planeta: string;
  lote?: string;
  pais?: string; // Adicionando o campo "País"
}

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
    cep: endereco.cep || '',
    planeta: endereco.planeta || 'Terra',
    lote: endereco.lote || '',
    pais: endereco.pais || '', // Inicializando o campo "País"
  };

  if (submitted) {
    navigate('/');
  }

  return (
    <div className="container">
      <h2 className="title">Cadastro de Endereço</h2>
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
            // Verificando se o campo "País" está preenchido apenas para Terra
            errors.pais = 'Campo obrigatório para a Terra';
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
            pais: '', // Limpando o campo "País" após o envio
          });

          setSubmitted(true);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
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
            <div className="label">Planeta:</div>
            <div
              role="group"
              aria-labelledby="planeta-group"
              className="radio-group"
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
            <ErrorMessage name="planeta" component="p" className="error" />
            {values.planeta === 'Marte' ? (
              <>
                <label className="label">
                  Lote:
                  <Field
                    type="number"
                    name="lote"
                    className="input"
                    maxLength={4}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 4);
                    }}
                  />
                  <ErrorMessage name="lote" component="p" className="error" />
                </label>
              </>
            ) : (
              <>
                <label className="label">
                  Cep:
                  <Field type="number" name="cep" className="input" />
                  <ErrorMessage name="cep" component="p" className="error" />
                </label>
                <label className="label">
                  Rua:
                  <Field type="text" name="rua" className="input" />
                  <ErrorMessage name="rua" component="p" className="error" />
                </label>
                <label className="label">
                  Número:
                  <Field type="number" name="numero" className="input" />
                  <ErrorMessage name="numero" component="p" className="error" />
                </label>
                <label className="label">
                  Complemento:
                  <Field type="text" name="complemento" className="input" />
                </label>
                {values.planeta === 'Terra' && ( // Renderizando o campo "País" apenas para Terra
                  <label className="label">
                    País:
                    <Field type="text" name="pais" className="input" />
                    <ErrorMessage name="pais" component="p" className="error" />
                  </label>
                )}
              </>
            )}
            <button type="submit" className="button" disabled={isSubmitting}>
              Cadastrar Endereço
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroEndereco;
