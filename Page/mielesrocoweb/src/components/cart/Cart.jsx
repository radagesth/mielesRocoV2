import React from 'react';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import './cart.css'; 
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export const Cart = () => {
    const { state, dispatch } = useCart();
    sessionStorage.setItem('cart', JSON.stringify(state));
    
    const navigate = useNavigate(); // Usar useNavigate

    const handleCheckout = () => {
        navigate('/CheckoutForm'); // Redirigir a la ruta del formulario por defecto
    };

    return (
        <div className="cart">
            <h2 className="cart__header">Carrito de Compra</h2>
            {state.items.length === 0 ? (
                <p className="cart__empty-message">El carrito está vacío</p>
            ) : (
                <>
                    <div className="cart__items">
                        {state.items.map((item) => (
                            <div key={item.product.id} className="cart__item">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="cart__item__image"
                                />
                                <div className="cart__item__info">
                                    <h3 className="cart__item__title">{item.product.name}</h3>
                                    <p className="cart__item__price">${item.product.price.toFixed()}</p>
                                </div>
                                <div className="cart__item__controls">
                                    <button
                                        onClick={() => dispatch({
                                            type: 'UPDATE_QUANTITY',
                                            payload: { productId: item.product.id, quantity: Math.max(0, item.quantity - 1) }
                                        })}
                                        className="cart__item__button cart__item__button--minus"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="cart__item__quantity">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch({
                                            type: 'UPDATE_QUANTITY',
                                            payload: { productId: item.product.id, quantity: item.quantity + 1 }
                                        })}
                                        className="cart__item__button cart__item__button--plus"
                                    >
                                        <Plus size={18} />
                                    </button>
                                    <button
                                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })}
                                        className="cart__item__button cart__item__button--remove"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart__total-section">
                        <div className="cart__total">
                            <span className='cart__total__amount'>Total:</span>
                            <span className="cart__total__amount">${state.total.toFixed(0)}</span>
                        </div>
                        <button
                            onClick={handleCheckout} // Manejar clic en el botón
                            className="cart__item__button"
                        >
                            Proceder al Pago
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};