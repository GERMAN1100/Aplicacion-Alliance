import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Perfil = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("ID de usuario recibido:", id);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      if (!token) {
        setError('No token found');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/perfil/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);

      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          setError('Error: No response received from server');
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <div>
        <h2>Email: {user.email}</h2>
        <p>Teléfono: {user.tel}</p>
        <p>Ubicación: {user.ubicacion}</p>
        <p>Ciudad: {user.ciudad}</p>
        <p>Otro Teléfono: {user.OtroTel}</p>
        <p>Cuit o Documento: {user.document}</p>
        <p>Presentación: {user.presentacion}</p>
        <p>Enlace Web: {user.linkWeb}</p>
        <p>Instagram: {user.linkInstagram}</p>
        <p>Facebook: {user.linkFacebook}</p>
        <p>Categorías:</p>
        <ul>
          {user.categorias.map((categoria, index) => (
            <li key={index}>{categoria}</li>
          ))}
        </ul>
        <p>Enlace Catálogo: {user.linkCatalogo}</p>
      </div>
    </div>
  );
};

export default Perfil;
