import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './checkoutForm.css';

const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [previousOrder, setPreviousOrder] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const state = JSON.parse(sessionStorage.getItem('cart'));

    // Cargar datos del pedido anterior
    useEffect(() => {
        const loadPreviousOrder = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getPreviousOrder');
                setPreviousOrder(response.data);
            } catch (error) {
                console.error('Error al cargar el pedido anterior:', error);
            }
        };

        loadPreviousOrder();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            phone,
            delivery,
            address,
        };

        const fileName = `${formData.name}-${new Date().toISOString().slice(0, 10)}.json`;

        try {
            const response = await axios.post('http://localhost:5000/api/saveCheckoutData', {
                formData,
                cartData: state.items,
                fileName,
            });

            if (response.status === 200) {
                setPopupMessage('Datos guardados correctamente');
            }
        } catch (err) {
            console.error('Error al guardar los datos:', err);
            setPopupMessage('Problemas al guardar los datos');
        } finally {
            setPopupVisible(true); // Mostrar el pop-up
        }
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Formulario de Compra</h2>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Filtrar solo números
                            const numericValue = value.replace(/[^0-9]/g, '');
                            setPhone(numericValue);
                        }}
                        required
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="delivery">¿Requiere entrega?</label>
                    <input
                        type="checkbox"
                        id="delivery"
                        checked={delivery}
                        onChange={(e) => setDelivery(e.target.checked)}
                    />
                </div>
                {delivery && (
                    <div className="form-group">
                        <label htmlFor="address">Dirección:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                )}
                <h3>Resumen del Carrito</h3>
                <ul className="cart-summary">
                    {state.items.length > 0 ? (
                        state.items.map((item) => (
                            <li key={item.product.id}>
                                {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.product.price.toFixed(2)}
                            </li>
                        ))
                    ) : (
                        <li>No hay productos en el carrito.</li>
                    )}
                </ul>
                {previousOrder && (
                    <>
                        <h3>Pedido Anterior</h3>
                        <ul className="previous-order">
                            {previousOrder.cartData.map((item) => (
                                <li key={item.product.id}>
                                    {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.product.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <button type="submit" className="submit-button">Guardar y Proceder</button>
            </form>

            {popupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;