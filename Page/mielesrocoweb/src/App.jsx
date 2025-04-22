import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './components/cart/Cart';
import { CheckoutForm } from './components/checkout/CheckoutForm';
import { CartProvider } from './context/CartContext';
import {CheckoutForm} from '../backend/apis/app.py';
import PreviousOrder from '../backend/apis/previous_orders.json';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkoutform" element={<CheckoutForm />} />
              <Route path="/Previousorder" element={<PreviousOrder />} />
              <Route path="/Footer" element={<Footer />} />
              
            </Routes>
          </main>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 