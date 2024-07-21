import 'reflect-metadata';
import express from 'express';
import { DataSource, Like } from 'typeorm';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from './entity/User';

import multer from 'multer';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || '505050';

// Habilitar CORS
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : undefined,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
});
// -------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Añadir timestamp al nombre del archivo
  }
});

const upload = multer({ storage: storage });

// ----------------------------------
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');

    // Ruta para obtener el perfil de usuario por ID
    app.get('/perfil/:userId', async (req, res) => {
      const userId = parseInt(req.params.userId, 10);

      if (isNaN(userId)) {
        return res.status(400).send({ message: 'Invalid user ID' });
      }

      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
      }
    });

    // Ruta para registrar usuarios
    app.post('/registro', upload.single('ImagenPerfil'), async (req, res) => {
      const { email, nombreUsuario, descripcion, password, tel, otroTel, ubicacion, ciudad, documento, present,linkFacebook, linkInstagram, linkWeb, linkCatalogo, categorias } = req.body;
      const imagenPerfil = req.file ? req.file.filename : undefined;


      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.nombreUsuario = nombreUsuario;
        user.descripcion = descripcion;
        user.password = hashedPassword;
        user.tel = tel;
        user.ciudad = ciudad;
        user.otroTel = otroTel;
        user.ubicacion = ubicacion;
        user.documento = documento;
        user.present = present;
        user.linkInstagram = linkInstagram;
        user.linkWeb = linkWeb;
        user.linkFacebook = linkFacebook;
        user.linkCatalogo = linkCatalogo;
        user.categorias = categorias;
        user.imagenPerfil = imagenPerfil;

        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);

        res.status(201).json({ message: 'User registered' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
      }
    });

// ------------------------------------------------------------------------


  app.get('/api/users', async (req, res) => {
      try {
          const users = await AppDataSource.getRepository(User).find();
          res.json(users);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching users', error });
      }
  });
  
  app.get('/api/users/search', async (req, res) => {
      const { name } = req.query;
      try {
          const users = await AppDataSource.getRepository(User).find({
              where: {
                  nombreUsuario: Like(`%${name}%`)
              }
          });
          res.json(users);
      } catch (error) {
          res.status(500).json({ message: 'Error searching users', error });
      }
  });
  
  
  
// ------------------------------------------------------

    // Ruta para autenticar usuarios
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user || !user.password) {
          return res.status(400).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ message: 'Logged in successfully', token });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
      }
    });

    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
