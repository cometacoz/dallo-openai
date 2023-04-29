import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createContainer, asClass, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';



// classes
import UserController from './controllers/userController.js';
import ChatController from './controllers/chatController.js';
import Database from './database/database.js';
import swaggerOptions from './swagger-jsdoc.js';

// routes
import { getUser } from './routes/users.routes.js';
import { firstConversation } from './routes/chat.routes.js';


const app = express();
const port = process.env.PORT || 3000;

// Create the container for injected of dependencies;
const container = createContainer({ injectionMode: InjectionMode.PROXY });

// Register our dependencies in the container;
container.register({
    database: asClass(Database).singleton(),
    UserController: asClass(UserController),
    ChatController: asClass(ChatController)
});

// Initialization of Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// middleware body-parser
app.use(bodyParser.json());


// Add middleware of Awilix to our application in Express;
app.use(scopePerRequest(container));


// routes
app.get('/user/:id', (req, res) => getUser(req, res));
app.post('/conversation/', (req, res) => firstConversation(req, res));



// route of swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});