const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.DBPORT,
  dialect: 'postgres',
});

module.exports = sequelize;

