import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/final.css';
import correcto from '../img/correcto.png';

const Final = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (!userId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='Final'>
      <div className="Body-Fin">
        <div className="Body-F"> 
          <img src={correcto} alt="imagencorrecto" />
          <h1>Haz creado tu perfil</h1>
          <h2>Gracias por formar parte de Alliance</h2>
          <h3>Encontrarás una comunidad en la que podrás mostrarte y aprovechar la información y contactos para su negocio</h3>
          <div className='ButtonWrapper'>
          <Link to={`/perfil/${userId}`} className='Button'>
           Ir al perfil
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Final;

