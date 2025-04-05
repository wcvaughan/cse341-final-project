const express = require('express');
const {
  getAll,
  getSingle,
  registerUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const {
  validateUser,
  validateUserIdParam,
  handleValidationErrors
} = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: myStrongP@ssword
 *               role:
 *                 type: string
 *                 example: user
 *               address:
 *                 type: string
 *                 example: 456 Elm Street
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', isAuthenticated, validateUser, handleValidationErrors, registerUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 */
router.get('/:userId', validateUserIdParam, handleValidationErrors, getSingle);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 example: updatedP@ss
 *               address:
 *                 type: string
 *                 example: 789 Maple Avenue
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/:userId', isAuthenticated, validateUserIdParam, validateUser, handleValidationErrors, updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/:userId', isAuthenticated, validateUserIdParam, handleValidationErrors, deleteUser);

module.exports = router;
