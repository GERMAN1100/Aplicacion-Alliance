DROP DATABASE IF EXISTS allianceback;
CREATE DATABASE allianceback;
USE allianceback;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tel VARCHAR(20) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    otro_tel VARCHAR(20),
    documento VARCHAR(20) NOT NULL,
    presentacion TEXT NOT NULL,
    link_web VARCHAR(255),
    link_instagram VARCHAR(255),
    link_facebook VARCHAR(255),
    categorias TEXT,
    link_catalogo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

