import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createContainer, asClass, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';



// classes
import UserController from './controllers/userController.js';
import Database from './database/database.js';
import swaggerOptions from './swagger-jsdoc.js';


const app = express();
const port = process.env.PORT || 3000;

// Create the container for injected of dependencies;
const container = createContainer({ injectionMode: InjectionMode.PROXY });

// Register our dependencies in the container;
container.register({
    database: asClass(Database).singleton(),
    UserController: asClass(UserController)
});

// Initialization of Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Add middleware of Awilix to our application in Express;
app.use(scopePerRequest(container));

// Now we could inject our dependencies in our controllers
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: El usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.get('/user/:id', (req, res) => req.container.cradle.UserController.getUser(req, res));


// route of swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});