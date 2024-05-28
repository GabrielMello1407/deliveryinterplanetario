import React, { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import { useEndereco } from '../context/EnderecoContext';

interface Endereco {
  nome: string;
  sobrenome: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  planeta: string;
  lote?: string;
}

const EdicaoEndereco: React.FC = () => {
  const { endereco, setEndereco } = useEndereco();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });
  };

  const handleSubmit = (values: Endereco) => {
    // Lógica para enviar os dados do endereço editado para a API ou realizar outras ações
    console.log('Endereço editado:', values);
  };

  const formik = useFormik<Endereco>({
    initialValues: { ...endereco }, // Configura os valores iniciais com os dados do endereço
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors: Partial<Endereco> = {};
      // Lógica de validação dos campos
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
    <div>
      <h2>Edição de Endereço</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
          {formik.errors.nome && formik.touched.nome && (
            <p>{formik.errors.nome}</p>
          )}
        </label>
        <label>
          Sobrenome:
          <input
            type="text"
            name="sobrenome"
            value={formik.values.sobrenome}
            onChange={formik.handleChange}
          />
          {formik.errors.sobrenome && formik.touched.sobrenome && (
            <p>{formik.errors.sobrenome}</p>
          )}
        </label>
        <label>
          Planeta:
          <select
            name="planeta"
            value={formik.values.planeta}
            onChange={formik.handleChange}
          >
            <option value="Terra">Terra</option>
            <option value="Marte">Marte</option>
          </select>
        </label>
        {formik.values.planeta === 'Terra' ? (
          <>
            <label>
              Cep:
              <input
                type="number"
                name="cep"
                value={formik.values.cep}
                onChange={formik.handleChange}
              />
              {formik.errors.cep && formik.touched.cep && (
                <p>{formik.errors.cep}</p>
              )}
            </label>
            <label>
              Rua:
              <input
                type="text"
                name="rua"
                value={formik.values.rua}
                onChange={formik.handleChange}
              />
              {formik.errors.rua && formik.touched.rua && (
                <p>{formik.errors.rua}</p>
              )}
            </label>
            <label>
              Número:
              <input
                type="number"
                name="numero"
                value={formik.values.numero}
                onChange={formik.handleChange}
              />
              {formik.errors.numero && formik.touched.numero && (
                <p>{formik.errors.numero}</p>
              )}
            </label>
            <label>
              Complemento:
              <input
                type="text"
                name="complemento"
                value={formik.values.complemento}
                onChange={formik.handleChange}
              />
            </label>
          </>
        ) : (
          <label>
            Lote:
            <input
              type="number"
              name="lote"
              value={formik.values.lote}
              onChange={formik.handleChange}
              maxLength={4}
              onInput={(e) => {
                if (e.currentTarget.value.length > 4) {
                  e.currentTarget.value = e.currentTarget.value.slice(0, 4);
                }
              }}
            />
            {formik.errors.lote && formik.touched.lote && (
              <p>{formik.errors.lote}</p>
            )}
          </label>
        )}
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EdicaoEndereco;
