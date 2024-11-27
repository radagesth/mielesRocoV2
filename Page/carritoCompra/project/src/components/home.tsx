import React from 'react';
import { CartProvider } from '../context/CartContext';
import { ProductList } from './ProductList';
import { Cart } from './Cart';
import { Droplets } from 'lucide-react';

function home() {
  return (
    <CartProvider>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-amber-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <Droplets size={32} />
            <h1 className="text-2xl font-bold">Mieles Roco</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Productos</h2>
            <ProductList />
          </div>
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  </CartProvider>
  )
}

export default home