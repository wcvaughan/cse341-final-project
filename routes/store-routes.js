const express = require('express');
const router = express.Router();
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} = require('../controllers/stores');

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
 *               location:
 *                 type: string
 *               hours:
 *                 type: string
 *               manager:
 *                 type: string
 *               contact:
 *                 type: string
 *               inventoryCount:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store created
 */
router.post('/', createStore);

/**
 * @swagger
 * /api/stores/{storeId}:
 *   put:
 *     summary: Update a store by ID
 *     tags: [Stores]
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
 *               location:
 *                 type: string
 *               hours:
 *                 type: string
 *               manager:
 *                 type: string
 *               contact:
 *                 type: string
 *               inventoryCount:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store updated
 */
router.put('/:storeId', updateStore);

/**
 * @swagger
 * /api/stores/{storeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
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
router.delete('/:storeId', deleteStore);

module.exports = router;
