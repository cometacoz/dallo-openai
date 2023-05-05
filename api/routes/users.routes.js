'use strict';

// Now we could inject our dependencies in our controllers
/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Inicia Sesion
 *     tags: [authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Ingresa un correo electrónico.
 *                 minLength: 1
 *               password:
 *                 type: string
 *                 description: Ingresa una contraseña.
 *                 minLength: 1
 *             example:
 *               email: correo@example.com
 *               password: contraseña123
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: string
         400:
 *         description: No se pudo iniciar sesion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: string
 */
export const signInUser = (req, res) => req.container.cradle.UserController.signInUser(req, res);


// Now we could inject our dependencies in our controllers
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Crea un usuario
 *     tags: [authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Ingresa un correo electrónico.
 *                 minLength: 1
 *               password:
 *                 type: string
 *                 description: Ingresa una contraseña.
 *                 minLength: 1
 *             example:
 *               email: correo@example.com
 *               password: contraseña123
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: string
         400:
 *         description: No se pudo crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: string
 */
export const signUpUser = (req, res) => req.container.cradle.UserController.signUpUser(req, res);