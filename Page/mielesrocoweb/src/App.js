import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importar componentes
import Home from './components/home/Home.jsx';
import NotFound from './components/notFound/notFound.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;