import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          SCF
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='#'
              label='Usuários'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-filmes' label='Filmes' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-generos' label='Generos' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true'href='/listagem-diretores'label='Diretores' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-atores' label='Atores' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='#' label='Entrar' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='#' label='Sair' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;