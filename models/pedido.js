const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./produto');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Pedido.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = Pedido;