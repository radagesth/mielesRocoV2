import React from 'react';
import { ProductCard } from '../productCart/productCart';
import { products } from '../../data/products';

export const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};