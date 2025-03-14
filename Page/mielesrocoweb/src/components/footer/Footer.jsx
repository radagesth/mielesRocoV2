import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__section">
                    <h3>Síguenos</h3>
                    <div className="footer__social">
                        <a href="https://www.instagram.com/mielesroco/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
                
                <div className="footer__section">
                    <h3>Contáctanos</h3>
                    <div className="footer__contact">
                        <div className="footer__contact-item">
                            <Mail size={18} />
                            <span>mielesroco@gmail.com</span>
                        </div>
                        <div className="footer__contact-item">
                            <Phone size={18} />
                            <span>+56 9 20112241</span>
                        </div>
                    </div>
                </div>
                
                <div className="footer__section">
                    <h3>Horario de Entrega</h3>
                    <p>Lunes a Viernes: 20:00 - 22:00</p>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; 2024 Mieles Roco. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer; 