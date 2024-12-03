import React, { createContext, useContext, useReducer } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
    items: [],
    total: 0,
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                // Si el producto ya existe, aumentar la cantidad
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.product.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    total: state.total + action.payload.price,
                };
            }
            // Si el producto no existe, agregarlo al carrito
            return {
                ...state,
                items: [...state.items, { product: action.payload, quantity: 1 }],
                total: state.total + action.payload.price,
            };
        }
        case 'REMOVE_ITEM': {
            const item = state.items.find(item => item.product.id === action.payload);
            return {
                ...state,
                items: state.items.filter(item => item.product.id !== action.payload),
                total: state.total - (item ? item.product.price * item.quantity : 0),
            };
        }
        case 'UPDATE_QUANTITY': {
            const item = state.items.find(item => item.product.id === action.payload.productId);
            if (!item) return state;

            const quantityDiff = action.payload.quantity - item.quantity;
            return {
                ...state,
                items: state.items.map(item =>
                    item.product.id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
                total: state.total + (item.product.price * quantityDiff),
            };
        }
        case 'CALCULATE_TOTAL': {
            const total = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            return { ...state, total };
        }
        default:
            return state;
    }
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};