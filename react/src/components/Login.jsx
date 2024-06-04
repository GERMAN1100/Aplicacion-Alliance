import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const validarCorreoElectronico = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validarCorreoElectronico(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Response from server:', response); // Verifica la respuesta del servidor
      const { token } = response.data;
      console.log('Token received:', token); // Verifica que se haya recibido el token
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage'); // Verifica que se haya almacenado el token
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      navigate(`/perfil/${decodedToken.userId}`);
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password. Please try again.');
    }
    
  };

  return (
    <div>
      <div className='Title'>
        <h1>Alliance</h1>
      </div>
      <div className='Body'>
        <div className='Inicio'><h1>Iniciar Sesión</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='email'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="current-email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña </label> 
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className='ButtonAcces'>
            <button type="submit" className='InitSes'>Iniciar sesión</button>
          </div>
        </form>
      </div>
      <div className='Access'><h2>¿Olvidaste la contraceña?</h2>
        <div className='ButtonAcces'>
          <button onClick={() => navigate('/registro')} className='InitAccess'>¿Primera vez en Alliance? Accede ahora</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
