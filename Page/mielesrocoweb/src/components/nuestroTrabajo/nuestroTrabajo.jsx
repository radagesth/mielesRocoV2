import React from 'react'
import './nuestroTrabajo.css'
import NavBar from '../navBar/navBar'
import Footer from '../footer/Footer'
function nuestroTrabajo() {
  return (
    <div>
        <div>
        <div className='nuestroTrabajo__container'>
        <h1 className='nuestroTrabajo__title'>Nuestro Trabajo</h1>  
        <p className='nuestroTrabajo__description'>Pequeña Pyme de ventas de Mieles 100% Familiares, 100% Organicas , 100% Naturales</p>
        <p className='nuestroTrabajo__description'> Ahora con sede en la region Metropolitana , teniendo entregas en toda la RM.</p>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default nuestroTrabajo