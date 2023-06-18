import React from 'react';


import ListagemAtores from './views/listagem-atores';
import CadastroAtor from './views/cadastro-ator';
import ListagemGeneros from './views/listagem-generos';
import CadastroGenero from './views/cadastro-genero';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroDiretor from './views/cadastro-diretor';
import ListagemDiretores from './views/listagem-diretores';
import CadastroFilme from './views/cadastro-filme';
import ListagemFilmes from './views/listagem-filmes';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-atores/:idParam?' element={<CadastroAtor />} />
        <Route path='/listagem-atores' element={<ListagemAtores />} />
        <Route path='/cadastro-generos/:idParam?' element={<CadastroGenero />} />
        <Route path='/listagem-generos' element={<ListagemGeneros />} />
        <Route path='/cadastro-diretores/:idParam?' element={<CadastroDiretor />} />
        <Route path='/listagem-diretores' element={<ListagemDiretores />} />
        <Route path='/cadastro-filme/:idParam?' element={<CadastroFilme />} />
        <Route path='/listagem-filmes' element={<ListagemFilmes />} />


      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;