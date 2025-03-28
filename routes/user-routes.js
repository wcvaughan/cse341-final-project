// User Routes - Chris Vaughan
const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getAll, getSingle, registerUser, updateUser, deleteUser } = require('../controllers/users');
const { validateUser, validateId, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// POST /user - Route to create a new user (registration)
router.post('/', requiresAuth(), validateUser, handleValidationErrors, registerUser);

// GET /user/:userId - Route to retrieve a specific user by ID
router.get('/:userId', requiresAuth(), validateId, handleValidationErrors, getSingle);

// GET /user/ - Route to retrieve all users - admin protected is suggested
router.get('/', getAll);

// PUT /user/:userId - Route to update user details by ID
router.put('/:userId', requiresAuth(), validateId, validateUser, handleValidationErrors, updateUser);

// DELETE /user/:userId - Route to delete a user by ID
router.delete('/:userId', requiresAuth(), validateId, handleValidationErrors, deleteUser);

// Export
module.exports = router;