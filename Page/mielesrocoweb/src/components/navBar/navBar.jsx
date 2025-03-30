import React from 'react';
import './navBar.css'; // Asegúrate de crear un archivo CSS para los estilos
import logo from '../../assets/imgs/Logo_Oficial.png';


const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/"> 
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <ul className="navbar__links">
                <li><a href="/">Inicio</a></li>               
                
            </ul>
        </nav>
    );
};

export default NavBar;