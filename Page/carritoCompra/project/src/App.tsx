//Importe de 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//importe de componentes
import Home from './components/home';




function App() {
  return (

    <div>
      <Router>
         <Routes>
           <Route path="/" element={<Home />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;