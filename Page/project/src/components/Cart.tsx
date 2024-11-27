import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Carrito de Compra</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500 text-center">El carrito está vacío</p>
      ) : (
        <>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-amber-600 font-medium">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { productId: item.product.id, quantity: Math.max(0, item.quantity - 1) }
                    })}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { productId: item.product.id, quantity: item.quantity + 1 }
                    })}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })}
                    className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">${state.total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};