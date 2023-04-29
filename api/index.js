import dotenv from 'dotenv';

import express from 'express';
import { createContainer, asClass, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import Database from './database/database.js';

dotenv.config();

// controllers
import UserController from './controllers/userController.js';

const app = express();
const port = process.env.PORT || 3000;

// Create the container for injected of dependencies;
const container = createContainer({ injectionMode: InjectionMode.PROXY });

// Register our dependencies in the container;
container.register({
    database: asClass(Database).singleton(),
    UserController: asClass(UserController)
});

// Add middleware of Awilix to our application in Express;
app.use(scopePerRequest(container));

// Now we could inject our dependencies in our controllers
app.get('/user/:id', (req, res) => req.container.cradle.userController.getUser(req, res));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});