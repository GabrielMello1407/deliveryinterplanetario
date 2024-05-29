import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <h2>DeliveryPlanet</h2>
      </NavLink>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink
            to="/cadastro"
            className="navbar-link"
            activeClassName="active"
          >
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
