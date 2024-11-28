import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavBar from './components/navBar/navBar';
import axios from 'axios';

// Agregar los siguientes renglos
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL = 'http://localhost:5000'; // Agregar la base URL del servidor Flask
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(
  (response) => {
    console.log(response.config.method + ' request succeeded');
    return response;
  },
  (error) => {
    console.log(error.config.method + ' request failed');
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <App />
  </React.StrictMode>
);

