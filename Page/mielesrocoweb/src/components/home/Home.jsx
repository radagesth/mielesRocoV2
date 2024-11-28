import React from 'react';
import './home.css';
import { CartProvider } from '../../context/CartContext';
import { ProductList } from '../productList/productList';
import { Cart } from '../cart/Cart';

function Home() {
    return (
        <CartProvider>
            <div className="home home__min-h-screen">
                <header className="home__header">
                    <h1 className="home__title">Bienvenido a Mieles Roco</h1>
                </header>
                <div className="home__container">
                    <ProductList />
                    <Cart />
                </div>
            </div>
        </CartProvider>
    );
}

export default Home;