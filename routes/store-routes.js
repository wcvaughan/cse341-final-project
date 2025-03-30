const express = require('express');
const router = express.Router();
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} = require('../controllers/stores');

const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management
 */

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of stores
 */
router.get('/', getAllStores);

/**
 * @swagger
 * /api/stores/{storeId}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store found
 */
router.get('/:storeId', getStoreById);

/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
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
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Main Street Market
 *               location:
 *                 type: string
 *                 example: 123 Main St, Springfield
 *               hours:
 *                 type: string
 *                 example: Mon-Fri 8am-6pm
 *               manager:
 *                 type: string
 *                 example: Jane Doe
 *               contact:
 *                 type: string
 *                 example: 555-1234
 *               inventoryCount:
 *                 type: integer
 *                 example: 100
 *               status:
 *                 type: string
 *                 example: open
 *     responses:
 *       201:
 *         description: Store created
 */
router.post('/', isAuthenticated, createStore);

/**
 * @swagger
 * /api/stores/{storeId}:
 *   put:
 *     summary: Update a store by ID
 *     tags: [Stores]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
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
 *                 example: Main Street Market
 *               location:
 *                 type: string
 *                 example: 123 Main St, Springfield
 *               hours:
 *                 type: string
 *                 example: Mon-Fri 8am-6pm
 *               manager:
 *                 type: string
 *                 example: Jane Doe
 *               contact:
 *                 type: string
 *                 example: 555-1234
 *               inventoryCount:
 *                 type: integer
 *                 example: 100
 *               status:
 *                 type: string
 *                 example: open
 *     responses:
 *       200:
 *         description: Store updated
 */
router.put('/:storeId', isAuthenticated, updateStore);

/**
 * @swagger
 * /api/stores/{storeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store deleted
 */
router.delete('/:storeId', isAuthenticated, deleteStore);

module.exports = router;
