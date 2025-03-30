// routes/index.js - Main entry point for all route files

const express = require('express');
const router = express.Router();

const itemRoutes = require('./item-routes');
const storeRoutes = require('./store-routes');
const orderRoutes = require('./order-routes');
const userRoutes = require('./user-routes');

// Group route paths
router.use('/items', itemRoutes);
router.use('/stores', storeRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

module.exports = router;
