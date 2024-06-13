import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Response from server:', response);
      const { token } = response.data;
      console.log('Token received:', token);
      localStorage.setItem('token', token);
      const userId = jwt.decode(token).userId;
      localStorage.setItem('userId', userId);
      navigate(`/perfil/${userId}`);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        setError(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        setError('Error: No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        setError(`Error: ${error.message}`);
      }
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
