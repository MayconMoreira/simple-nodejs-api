const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');
const pedidosRoutes = require('./routes/pedidos');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':status'))

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechStore API',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos, categorias e pedidos da TechStore',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});