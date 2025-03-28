// Order Routes - Chris Vaughan
const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getAll, getSingle, createOrder, updateOrder, deleteOrder } = require('../controllers/orders');
const { validateOrder, validateId, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// POST /order - Route to create a new order
router.post('/', requiresAuth(), validateOrder, handleValidationErrors, createOrder);

// GET /order/:orderId - Route to retrieve a specific order by ID
router.get('/:orderId', requiresAuth(), validateId, handleValidationErrors, getSingle);

// GET /user/ - Route to retrieve all users - admin protected is suggested
router.get('/', getAll);

// GET /order/user/:userId - Route to retrieve all orders for a specific user
router.put('/user/:userId', requiresAuth(), validateId, validateOrder, handleValidationErrors, getOrdersByUser);

// PUT /user/:orderId - Route to update order details by ID -- user protected (possibly checking user id against user whose orders are being accessed)
router.put('/:orderId', requiresAuth(), validateId, validateUser, handleValidationErrors, updateOrder);

// DELETE /order/:orderId - Route to cancel or delete an order by ID
router.delete('/:orderId', requiresAuth(), validateId, handleValidationErrors, deleteOrder);

// Export 
module.exports = router;
