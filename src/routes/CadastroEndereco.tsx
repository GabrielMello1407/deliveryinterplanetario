import React, { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import { useEndereco } from '../context/EnderecoContext';
import '../index.css'; // Importa o arquivo CSS

interface FormValues {
  nome: string;
  sobrenome: string;
  rua: string;
  numero: string;
  complemento: string;
  cep: string;
  planeta: string;
  lote?: string;
}

const CadastroEndereco: React.FC = () => {
  const { endereco, setEndereco } = useEndereco();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });
  };

  const formik = useFormik<FormValues>({
    initialValues: endereco,
    onSubmit: (values) => {
      // Lógica para enviar os dados do endereço para a API ou realizar outras ações
      console.log('Endereço cadastrado:', values);
      // Limpar o formulário após o envio bem-sucedido
      setEndereco({
        nome: '',
        sobrenome: '',
        rua: '',
        numero: '',
        complemento: '',
        cep: '',
        planeta: 'Terra',
        lote: '',
      });
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!values.nome) {
        errors.nome = 'Campo obrigatório';
      }
      if (!values.sobrenome) {
        errors.sobrenome = 'Campo obrigatório';
      }
      if (values.planeta === 'Terra') {
        if (!values.rua) {
          errors.rua = 'Campo obrigatório';
        }
        if (!values.numero) {
          errors.numero = 'Campo obrigatório';
        }
        if (!values.cep) {
          errors.cep = 'Campo obrigatório';
        }
      } else if (values.planeta === 'Marte') {
        if (!values.lote) {
          errors.lote = 'Campo obrigatório';
        } else if (!/^\d{1,4}$/.test(values.lote)) {
          errors.lote = 'Lote deve conter no máximo 4 números';
        }
      }
      return errors;
    },
  });

  return (
    <div className="container">
      <h2 className="title">Cadastro de Endereço</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <label className="label">
          Nome:
          <input
            type="text"
            name="nome"
            value={endereco.nome}
            onChange={handleChange}
            className="input"
          />
          {formik.errors.nome && formik.touched.nome && (
            <p className="error">{formik.errors.nome}</p>
          )}
        </label>
        <label className="label">
          Sobrenome:
          <input
            type="text"
            name="sobrenome"
            value={endereco.sobrenome}
            onChange={handleChange}
            className="input"
          />
          {formik.errors.sobrenome && formik.touched.sobrenome && (
            <p className="error">{formik.errors.sobrenome}</p>
          )}
        </label>
        <label className="label">
          Planeta:
          <select
            name="planeta"
            value={endereco.planeta}
            onChange={handleChange}
            className="select"
          >
            <option value="Terra">Terra</option>
            <option value="Marte">Marte</option>
          </select>
        </label>
        {endereco.planeta === 'Terra' ? (
          <>
            <label className="label">
              Cep:
              <input
                type="number"
                name="cep"
                value={endereco.cep}
                onChange={handleChange}
                className="input"
              />
              {formik.errors.cep && formik.touched.cep && (
                <p className="error">{formik.errors.cep}</p>
              )}
            </label>
            <label className="label">
              Rua:
              <input
                type="text"
                name="rua"
                value={endereco.rua}
                onChange={handleChange}
                className="input"
              />
              {formik.errors.rua && formik.touched.rua && (
                <p className="error">{formik.errors.rua}</p>
              )}
            </label>
            <label className="label">
              Número:
              <input
                type="number"
                name="numero"
                value={endereco.numero}
                onChange={handleChange}
                className="input"
              />
              {formik.errors.numero && formik.touched.numero && (
                <p className="error">{formik.errors.numero}</p>
              )}
            </label>
            <label className="label">
              Complemento:
              <input
                type="text"
                name="complemento"
                value={endereco.complemento}
                onChange={handleChange}
                className="input"
              />
            </label>
          </>
        ) : (
          <label className="label">
            Lote:
            <input
              type="number"
              name="lote"
              value={endereco.lote}
              onChange={handleChange}
              className="input"
              maxLength={4}
              onInput={(e) => {
                if (e.currentTarget.value.length > 4) {
                  e.currentTarget.value = e.currentTarget.value.slice(0, 4);
                }
              }}
            />
            {formik.errors.lote && formik.touched.lote && (
              <p className="error">{formik.errors.lote}</p>
            )}
          </label>
        )}
        <button type="submit" className="button">
          Cadastrar Endereço
        </button>
      </form>
    </div>
  );
};

export default CadastroEndereco;
