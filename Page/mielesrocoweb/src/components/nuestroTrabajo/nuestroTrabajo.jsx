import React from 'react'
import './nuestroTrabajo.css'
import Footer from '../footer/Footer'
import Foto1 from '../../assets/imgs/mieles1.png';
import Foto2 from '../../assets/imgs/mieles2.jpg';
import Foto3 from '../../assets/imgs/mieles3.jpg';

function nuestroTrabajo() {
  return (
    <div>
        <div>
        <div className='nuestroTrabajo__container'>
        <h1 className='nuestroTrabajo__title'>Nuestro Trabajo</h1>  
        <p className='nuestroTrabajo__description'>Pequeña Pyme de ventas de Mieles 100% Familiares, 100% Organicas , 100% Naturales</p>
        
        <p className='nuestroTrabajo__description'> Tenemos nuestra sede donde producimos la Miel en la localidad de Pejerrey,Siendo este un pueblo en la precordillera de Linares, Región del Maule.  </p>
          <img src={Foto1} alt="Nuestro Lugar de Trabajo.  "/>
          <p className='nuestroTrabajo__description'>
            Se encuentra a 32 kilómetros al sureste de Linares por la ruta L-45.
             Es una de las mayores localidades (aunque pequeña) de la zona. 
             </p>
          <img src={Foto2} alt="Nuestro Lugar de Trabajo."/>
          <p className='nuestroTrabajo__description'> 
          Pejerrey es un lugar ideal para la crianza de abejas y la práctica de la apicultura debido a su ubicación privilegiada en la precordillera de Linares
          </p>
          <img src={Foto3} alt="Nuestro Equipamiento de Cosecha. "/>
          <p className='nuestroTrabajo__description'> 
          La tradición agrícola y el conocimiento local sobre la naturaleza hacen que la comunidad de Pejerrey sea un aliado importante para los apicultores, fomentando prácticas sostenibles y respetuosas con el medio ambiente.
          </p>
        <p className='nuestroTrabajo__description'> Ahora con sede en la region Metropolitana , teniendo entregas en toda la RM.</p>
       
       
       
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default nuestroTrabajo