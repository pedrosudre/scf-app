import React from 'react';


import ListagemAtores from './views/listagem-atores';

import CadastroAtor from './views/cadastro-ator';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-atores/:idParam?' element={<CadastroAtor />} />
        <Route path='/listagem-atores' element={<ListagemAtores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;