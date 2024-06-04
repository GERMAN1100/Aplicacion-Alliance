// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../conexiones/connection');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Validación de formato de correo electrónico
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] // Longitud mínima de contraseña
      }
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OtroTel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    presentacion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    linkWeb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkInstagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkFacebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkCatalogo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categorias: {
      type: DataTypes.JSON, // Agrega el campo categorias como tipo JSON
      allowNull: true
    }
  }, {
    tableName: 'usuario',
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });

  return Usuario; // Exporta la definición de Usuario
};
