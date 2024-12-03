import React from 'react';
import { useCart } from '../../context/CartContext';
import { Plus } from 'lucide-react';
import './ProductCart.css';

export const ProductCard = ({ product }) => {
    const { dispatch } = useCart();
    
    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.name}
                className="product-card__image"
            />
            <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__description">{product.description}</p>
                <div className="product-card__price-button">
                    <span className="product-card__price">${product.price.toFixed(0)}</span>
                    <button
                        className="product-card__button"
                        onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                    >
                        <Plus size={18} /> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};