import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFilme() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/filmes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [idGenero, setIdGenero] = useState('');
  const [idDiretor, setIdDiretor] = useState('');
  const [idAtor, setIdAtor] = useState('');


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setNota('');
      setIdGenero('');
      setIdDiretor('');
      setIdAtor('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setNota(dados.nota);
      setIdGenero(dados.idGenero);
      setIdDiretor(dados.idDiretor);
      setIdAtor(dados.idAtor);
    }
  }

  async function salvar() {
    let data = { id, nome, nota, idGenero, idDiretor, idAtor};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Filme ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-filmes`);
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
          mensagemSucesso(`Filme ${nome} alterado com sucesso!`);
          navigate(`/listagem-filmes`);
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
      setNota(dados.nota);
      setIdGenero(dados.idGenero);
      setIdDiretor(dados.idDiretor);
      setIdAtor(dados.idAtor);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        console.log("Erro 400: Solicitação inválida.");
      }
    }
  }

const [dadosGeneros, setDadosGeneros] = React.useState(null);
const [dadosDiretores, setDadosDiretores] = React.useState(null);
const [dadosAtores, setDadosAtores] = React.useState(null);

useEffect(() => {
    axios.get(`${BASE_URL}/generos`).then((response) => {
      setDadosGeneros(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/diretores`).then((response) => {
      setDadosDiretores(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/atores`).then((response) => {
      setDadosAtores(response.data);
    });
  }, []);
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosGeneros) return null;
  if (!dadosDiretores) return null;
  if (!dadosAtores) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Filme'>
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
              <FormGroup label='nota: *' htmlFor='inputNota'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputNota'
                  value={nota}
                  className='form-control'
                  name='nota'
                  onChange={(e) => setNota(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Genero: *' htmlFor='selectGenero'>
                <select
                  className='form-select'
                  id='selectGenero'
                  name='idGenero'
                  value={idGenero}
                  onChange={(e) => setIdGenero(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosGeneros.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Diretor: *' htmlFor='selectDiretor'>
                <select
                  className='form-select'
                  id='selectDiretor'
                  name='idDiretor'
                  value={idDiretor}
                  onChange={(e) => setIdDiretor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosDiretores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Ator: *' htmlFor='selectAtor'>
                <select
                  className='form-select'
                  id='selectAtor'
                  name='idAtor'
                  value={idAtor}
                  onChange={(e) => setIdAtor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosAtores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
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

export default CadastroFilme;