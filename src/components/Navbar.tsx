import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Importa o arquivo CSS

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-logo">
            <h2>DeliveryPlanet</h2>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/cadastro"
            className="navbar-link"
            activeClassName="active"
          >
            Cadastrar
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/editarCadastro"
            className="navbar-link"
            activeClassName="active"
          >
            Editar cadastro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
