import React from 'react';


import ListagemAtores from './views/listagem-atores';

import CadastroAtor from './views/cadastro-ator';

import ListagemGeneros from './views/listagem-generos';

import CadastroGenero from './views/cadastro-genero';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-atores/:idParam?' element={<CadastroAtor />} />
        <Route path='/listagem-atores' element={<ListagemAtores />} />
        <Route path='/cadastro-generos/:idParam?' element={<CadastroGenero />} />
        <Route path='/listagem-generos' element={<ListagemGeneros />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;