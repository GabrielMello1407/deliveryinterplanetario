import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

interface FormValues {
  nome: string;
  sobrenome: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  planeta: string;
  lote?: string;
  pais?: string;
}

const EdicaoEndereco: React.FC = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    nome: '',
    sobrenome: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    planeta: 'Terra',
    lote: '',
    pais: '',
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEnderecos = JSON.parse(
      localStorage.getItem('enderecos') || '[]',
    );
    const endereco = storedEnderecos.find(
      (_: any, index: number) => index === parseInt(id),
    );
    if (endereco) {
      setInitialValues(endereco);
    }
  }, [id]);

  return (
    <div className="container">
      <h2 className="title">Edição de Endereço</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
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
          console.log('Endereço editado:', values);

          const storedEnderecos = JSON.parse(
            localStorage.getItem('enderecos') || '[]',
          );
          storedEnderecos[parseInt(id)] = values;
          localStorage.setItem('enderecos', JSON.stringify(storedEnderecos));

          setSubmitting(false);
          navigate('/');
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
                  <Field type="text" name="cep" className="input" />
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
                {values.planeta === 'Terra' && (
                  <label className="label">
                    País:
                    <Field type="text" name="pais" className="input" />
                    <ErrorMessage name="pais" component="p" className="error" />
                  </label>
                )}
              </>
            )}
            <button type="submit" className="button" disabled={isSubmitting}>
              Editar Endereço
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EdicaoEndereco;
