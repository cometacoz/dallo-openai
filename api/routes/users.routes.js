'use strict';


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
export const getUser = (req, res) => req.container.cradle.UserController.getUser(req, res);