import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useCart } from '../../context/CartContext';


const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [previousOrder, setPreviousOrder] = useState(null); 
    const  state  = JSON.parse(sessionStorage.getItem('cart'));
    
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
            email
        };

        const fileName = `${formData.name}-${new Date().toISOString().slice(0, 10)}.json`;

        try {
            const response = await axios.post('http://localhost:5000/api/saveCheckoutData', {
                formData,
                cartData: state.items, 
                fileName,
            });

            if (response.status === 200) {
                console.log('Datos guardados correctamente');
                try {
                    const response = await axios.post('http://localhost:5000/api/sendEmail'); 
                } catch (error) {
                    console.error('Error al cargar el pedido anterior:', error);
                }
            }
        } catch (err) {
            console.error('Error al guardar los datos:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Formulario de Compra</h2>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Teléfono:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Correo:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="delivery">¿Requiere entrega?</label>
                <input
                    type="checkbox"
                    id="delivery"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                />
            </div>
            {delivery && (
                <div>
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
            <ul>
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
            {/* {previousOrder && (
                <>
                    <h3>Pedido Anterior</h3>
                    <ul>
                        {previousOrder.cartData.map((item) => (
                            <li key={item.product.id}>
                                {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.product.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </>
            )} */}
            <button type="submit">Guardar y Proceder</button>
        </form>
    );
};

export default CheckoutForm;