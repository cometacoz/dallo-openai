import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createContainer, asClass, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import cors from 'cors';



// classes
import ChatController from './controllers/chatController.js';
import UserController from './controllers/userController.js';
import { main } from './database/database.js';
import swaggerOptions from './swagger-jsdoc.js';

// routes
import { signInUser, signUpUser } from './routes/users.routes.js';
import { conversation } from './routes/chat.routes.js';



const app = express();
main();

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


// Create the container for injected of dependencies;
const container = createContainer({ injectionMode: InjectionMode.PROXY });

// Register our dependencies in the container;
container.register({
    // database: asClass(Database), //.singleton(),
    UserController: asClass(UserController),
    ChatController: asClass(ChatController)
});

// Initialization of Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// middleware body-parser
app.use(bodyParser.json());

// middleware cors
app.use(cors(corsOptions));


// Add middleware of Awilix to our application in Express;
app.use(scopePerRequest(container));


// routes
app.post('/users/signin', (req, res) => signInUser(req, res));
app.post('/users/signup', (req, res) => signUpUser(req, res));
app.post('/conversation/', (req, res) => conversation(req, res));

// route of swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});