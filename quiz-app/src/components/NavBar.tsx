// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Asegúrate de crear este archivo para los estilos

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
          <svg width="35" height="35" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#d1d4ed">
  <path d="
    M32 8
    C30 9, 16 20, 4.5 32
    C3.5 33, 4 35, 6 35
    H10
    A2 2 0 0 1 12 37
    V52
    A2 2 0 0 0 14 54
    H26
    A2 2 0 0 0 28 52
    V42
    A2 2 0 0 1 30 40
    H34
    A2 2 0 0 1 36 42
    V52
    A2 2 0 0 0 38 54
    H50
    A2 2 0 0 0 52 52
    V37
    A2 2 0 0 1 54 35
    H58
    C60 35, 60.5 33, 59.5 32
    C48 20, 34 9, 32 8
    C32 8, 32 8, 32 8
    Z"/>
</svg>

          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
