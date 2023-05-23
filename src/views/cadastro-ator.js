import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroAtor() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/atores`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [qtdeOscar, setQtdeOscar] = useState('');


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setNacionalidade('');
      setDataNascimento('');
      setQtdeOscar('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setNacionalidade(dados.nacionalidade);
      setDataNascimento(dados.dataNascimento);
      setQtdeOscar(dados.qtdeOscar);
    }
  }

  async function salvar() {
    let data = { id, nome, nacionalidade, dataNascimento, qtdeOscar };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ator ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-atores`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ator ${nome} alterado com sucesso!`);
          navigate(`/listagem-atores`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }


  async function buscar() {
    try {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setNacionalidade(dados.nacionalidade);
      setDataNascimento(dados.dataNascimento);
      setQtdeOscar(dados.qtdeOscar);
    } catch (error) {
      console.error(error);
      // Aqui você pode tratar o erro de status 400 como desejar, por exemplo:
      if (error.response && error.response.status === 400) {
        console.log("Erro 400: Solicitação inválida.");
        // Faça algo específico para lidar com o erro 400
      }
    }
  }
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Ator'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='nacionalidade: *' htmlFor='inputNacionalidade'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputNacionalidade'
                  value={nacionalidade}
                  className='form-control'
                  name='nacionalidade'
                  onChange={(e) => setNacionalidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='DataNascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='QtdeOscar:' htmlFor='inputQtdeOscar'>
                <input
                  type='text'
                  id='inputQtdeOscar'
                  value={qtdeOscar}
                  className='form-control'
                  name='qtdeOscar'
                  onChange={(e) => setQtdeOscar(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroAtor;