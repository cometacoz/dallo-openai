'use strict';


// Now we could inject our dependencies in our controllers
/**
 * @swagger
 * /conversation:
 *   post:
 *     summary: Preguntale algo a Open AI
 *     tags: [Conversation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: Pregunta que el usuario ingresa.
 *                 minimum: 1
 *             required:
 *               - question
 *     responses:
 *       200:
 *         description: Respuesta de Open AI
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 */
export const conversation = (req, res) => req.container.cradle.ChatController.conversation(req, res);