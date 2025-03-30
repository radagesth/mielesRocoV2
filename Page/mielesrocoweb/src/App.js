import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importar componentes
import Home from './components/home/Home.jsx';
import NotFound from './components/notFound/notFound.jsx';
import CheckoutForm from './components/checkoutForm/checkoutForm.jsx';
import { CartProvider } from './context/CartContext';
import NuestroTrabajo from './components/nuestroTrabajo/nuestroTrabajo.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/NuestroTrabajo" element={<NuestroTrabajo />} />
            <Route path="/CheckoutForm" element={<CheckoutForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;