const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/conexiones/connection');
const Usuario = require('./src/modelos/usuario')(sequelize, Sequelize);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
const secretKey = '505050';

// Ruta para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request with:', { email, password });

  try {
    const user = await Usuario.findOne({ where: { email } });
    console.log('User found:', user);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        console.log('Generated token:', token);
        res.json({ message: 'Login successful', token });
      } else {
        console.error('Invalid email or password');
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      console.error('Invalid email or password');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Ruta protegida para obtener usuario por ID
app.get('/perfil/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Usuario.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/registro', async (req, res) => {
  const { email, password, tel, ubicacion, ciudad, OtroTel, document, presentacion, linkWeb, linkInstagram, linkFacebook, linkCatalogo, categorias } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({
      email,
      password: hashedPassword,
      tel,
      ubicacion,
      ciudad,
      OtroTel,
      document,
      presentacion,
      linkWeb,
      linkInstagram,
      linkFacebook,
      linkCatalogo,
      categorias
    });

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id, token });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

console.log("Servidor backend iniciado correctamente.");

