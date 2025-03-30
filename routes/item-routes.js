const express = require('express');
const router = express.Router();
const {
  createItem,
  updateItem,
  getAllItems,
  getItemById,
  deleteItem
} = require('../controllers/items');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
 */
router.get('/', getAllItems);

/**
 * @swagger
 * /api/items/{itemId}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item found
 */
router.get('/:itemId', getItemById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
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
 *               - category
 *               - price
 *               - stock
 *               - storeId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple
 *               category:
 *                 type: string
 *                 example: Fruit
 *               price:
 *                 type: number
 *                 example: 0.99
 *                 minimum: 0
 *               stock:
 *                 type: integer
 *                 example: 100
 *                 minimum: 0
 *               storeId:
 *                 type: string
 *                 example: 641234abcde123456789abcd
 *               description:
 *                 type: string
 *                 example: Fresh and juicy apples
 *               isOnSale:
 *                 type: boolean
 *                 example: false
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/images/apple.jpg
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Item created
 */
router.post('/', isAuthenticated, createItem);

/**
 * @swagger
 * /api/items/{itemId}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Items]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple
 *               category:
 *                 type: string
 *                 example: Fruit
 *               price:
 *                 type: number
 *                 example: 0.99
 *                 minimum: 0
 *               stock:
 *                 type: integer
 *                 example: 100
 *                 minimum: 0
 *               storeId:
 *                 type: string
 *                 example: 641234abcde123456789abcd
 *               description:
 *                 type: string
 *                 example: Fresh and juicy apples
 *               isOnSale:
 *                 type: boolean
 *                 example: false
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/images/apple.jpg
 *     responses:
 *       200:
 *         description: Item updated
 */
router.put('/:itemId', isAuthenticated, updateItem);

/**
 * @swagger
 * /api/items/{itemId}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 */
router.delete('/:itemId', isAuthenticated, deleteItem);

module.exports = router;
