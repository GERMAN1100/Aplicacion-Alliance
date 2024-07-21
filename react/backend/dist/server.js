"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./entity/User");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || '505050';
// Habilitar CORS
app.use((0, cors_1.default)({ origin: 'http://localhost:3001' }));
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : undefined,
    database: process.env.DB_NAME,
    entities: [User_1.User],
    synchronize: true,
});
// -------------------------------------
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Añadir timestamp al nombre del archivo
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// ----------------------------------
AppDataSource.initialize()
    .then(() => {
    console.log('Connected to the database');
    // Ruta para obtener el perfil de usuario por ID
    app.get('/perfil/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }
        try {
            const userRepository = AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Error fetching user' });
        }
    }));
    // Ruta para registrar usuarios
    app.post('/registro', upload.single('ImagenPerfil'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, nombreUsuario, descripcion, password, tel, otroTel, ubicacion, ciudad, documento, present, linkFacebook, linkInstagram, linkWeb, linkCatalogo, categorias } = req.body;
        const imagenPerfil = req.file ? req.file.filename : undefined;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = new User_1.User();
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
            const userRepository = AppDataSource.getRepository(User_1.User);
            yield userRepository.save(user);
            res.status(201).json({ message: 'User registered' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error registering user' });
        }
    }));
    // ------------------------------------------------------------------------
    app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield AppDataSource.getRepository(User_1.User).find();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }));
    app.get('/api/users/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        try {
            const users = yield AppDataSource.getRepository(User_1.User).find({
                where: {
                    nombreUsuario: (0, typeorm_1.Like)(`%${name}%`)
                }
            });
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error searching users', error });
        }
    }));
    // ------------------------------------------------------
    // Ruta para autenticar usuarios
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const userRepository = AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOne({ where: { email } });
            if (!user || !user.password) {
                return res.status(400).send('User not found');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).send('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
            res.status(200).send({ message: 'Logged in successfully', token });
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error logging in user');
        }
    }));
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
})
    .catch(error => console.log(error));
