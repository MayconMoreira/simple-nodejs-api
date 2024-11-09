const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = Produto;