// src/components/CheckoutForm.jsx
import React, { useState } from 'react';

const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, como enviar datos a una API o mostrar una confirmación.
        console.log({ name, phone, delivery });
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
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
                <label htmlFor="delivery">¿Desea reparto a domicilio?(se agregara una tarifa de 1.000 clp)</label>
                <input 
                    type="checkbox" 
                    id="delivery" 
                    checked={delivery} 
                    onChange={(e) => setDelivery(e.target.checked)} 
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default CheckoutForm;