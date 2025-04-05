const express = require('express');
const {
  getAll,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser
} = require('../controllers/orders');

const {
  validateOrder,
  validateOrderId,
  validateUserIdBody,
  validateStoreIdBody,
  handleValidationErrors
} = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - storeId
 *               - items
 *               - totalPrice
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64e5a730cc6cfc6f91a1fabc
 *               storeId:
 *                 type: string
 *                 example: 64e5a730cc6cfc6f91a1f123
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                   required:
 *                     - itemId
 *                     - quantity
 *               totalPrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 39.99
 *               status:
 *                 type: string
 *                 example: pending
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', isAuthenticated, validateOrder, validateUserIdBody, validateStoreIdBody, handleValidationErrors, createOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 */
router.get('/:orderId', validateOrderId, handleValidationErrors, getSingle);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get all orders by a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders found
 */
router.get('/user/:userId', validateUserIdBody, handleValidationErrors, getOrdersByUser);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order updated
 */
router.put('/:orderId', isAuthenticated, validateOrderId, validateUserIdBody, validateStoreIdBody, handleValidationErrors, updateOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete('/:orderId', isAuthenticated, validateOrderId, handleValidationErrors, deleteOrder);

module.exports = router;
