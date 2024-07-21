import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/perfil.css';
import lupa from '../img/lupa.svg';

const Perfil = () => {
  const { id } = useParams(); // Obtiene el id de la URL
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    telefono: '',
    email: '',
    mensaje: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const imagenPerfilUrl = `http://localhost:3000/uploads/${user.imagenPerfil}`;

  return (
    <div>
      <div className='Body'>
      <Link to="/busqueda"><img src={lupa} alt="lupa-buscador" /></Link>
        <div className='imagenPerfil'>
          <img src={imagenPerfilUrl} alt="Perfil" className="profile-image" />
        </div>
        <div className='usuario'>
              <h2>{user.nombreUsuario}</h2>
              <h4>{user.descripcion}</h4>
            </div>
            <div className='presentacion'>
              <p>Presentación: {user.present}</p>
            </div>
            <div className='categorias'>
            {/* <p>Categorías:</p> */}
            <ul>
              {user.categorias && user.categorias.length > 0 ? (
                user.categorias.map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))
              ) : (
                <li>No hay categorías</li>
              )}
            </ul>
           </div>
        <div className='body-sect'>
          <div className='body-info'>
            <div className='contacto'>
              <div className='contacSect'>
                <p>Email: {user.email}</p>
                <p>Teléfono: {user.tel}</p>
                <p>Otro Teléfono: {user.otroTel}</p>
              </div> 
            </div>
            <div className='ubicacion'>
              <div className='ubicacionSect'>
                <p>Ubicación: {user.ubicacion}</p>
                <p>Ciudad: {user.ciudad}</p>
              </div> 
            </div>
            <div className='redes'>
              <div className='redesSect'>
                <p>{user.linkWeb}</p>
                <p>Instagram: {user.linkInstagram}</p>
                <p>Facebook: {user.linkFacebook}</p>
              </div> 
            </div>
           <div className='link-cat'><p>{user.linkCatalogo}</p></div>
           
          </div>
          <div className='body-contact'>
              <div className="contact-form">
                <h2>Contáctanos</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="telefono">Ingresar Teléfono</label>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Ingresar Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
