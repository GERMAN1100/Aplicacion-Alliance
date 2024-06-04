import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loading.css'; 

const Loading = () => {
  const navigate = useNavigate();

  // Redirige a la página de inicio de sesión después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000); // Tiempo en milisegundos
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='loadtitle'>
      <h1>Alliance</h1>
      <div className='loadfoot'>
        <h4>From</h4>
        <h2>Alliance</h2>
        <h4>Software company</h4>
      </div>
    </div>
  );
}

export default Loading;

