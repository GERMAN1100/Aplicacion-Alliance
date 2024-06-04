CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tel VARCHAR(20),
    ubicacion VARCHAR(255),
    ciudad VARCHAR(255),
    otro_tel VARCHAR(20),
    documento VARCHAR(20),
    presentacion TEXT,
    link_web VARCHAR(255),
    link_instagram VARCHAR(255),
    link_facebook VARCHAR(255),
    categorias TEXT,
    link_catalogo VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);