const { check, param, validationResult } = require('express-validator');

// Implement data validation for each model

// Item validation
const validateItem = [
  check('name').notEmpty().withMessage('name is required'),
  check('category').notEmpty().withMessage('category is required'),
  check('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
  check('stock').isInt({ min: 0 }).withMessage('stock must be a non-negative integer'),
  check('storeId').notEmpty().withMessage('storeId is required'),
];

// Order validation
const validateOrder = [
  check('userId').notEmpty().withMessage('userId is required'),
  check('storeId').notEmpty().withMessage('storeId is required'),
  check('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
  check('totalPrice').isFloat({ gt: 0 }).withMessage('totalPrice must be a positive number'),
  check('status').isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid order status')
];

// Store validation
const validateStore = [
  check('name').notEmpty().withMessage('name is required'),
  check('location').notEmpty().withMessage('location is required'),
  check('hours').notEmpty().withMessage('hours are required'),
  check('manager').notEmpty().withMessage('manager is required'),
  check('status').isIn(['active', 'closed']).withMessage('status must be active or closed')
];

// User validation
const validateUser = [
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('role').isIn(['admin', 'customer']).withMessage('role must be admin or customer'),
  check('address').notEmpty().withMessage('address is required')
];

// ID validator (for params)
const validateItemId = [
  param('itemId').isMongoId().withMessage('Invalid ID format')
];
const validateOrderId = [
  param('orderId').isMongoId().withMessage('Invalid ID format')
];
const validateStoreIdParam = [
  param('storeId').isMongoId().withMessage('Invalid ID format')
];
const validateStoreIdBody = [
  body('storeId').isMongoId().withMessage('Invalid ID format')
];
const validateUserIdParam = [
  param('userId').isMongoId().withMessage('Invalid ID format')
];
const validateUserIdBody = [
  body('userId').isMongoId().withMessage('Invalid ID format')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export 
module.exports = {
  validateItem,
  validateOrder,
  validateStore,
  validateUser,
  validateItemId,
  validateOrderId,
  validateStoreIdParam,
  validateStoreIdBody,
  validateUserIdParam,
  validateUserIdBody,
  handleValidationErrors
};
