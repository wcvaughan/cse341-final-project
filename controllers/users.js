// User Controller - Chris Vaughan
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// POST /users - Register a new user
const registerUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const { name, email, password, role, address } = req.body;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof role !== 'string' ||
      typeof address !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid user fields' });
    }

    const newUser = { name, email, password, role, address };

    const result = await mongodb.getDb().collection('users').insertOne(newUser);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// GET /users/{userId} - Retrieve a specific user by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const result = await mongodb.getDb().collection('users').findOne({ _id: new ObjectId(userId) });

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// GET /users - Retrieve all users
const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDb().collection('users').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// PUT /users/{userId} - Update a user by ID
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const result = await mongodb.getDb().collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE /users/{userId} - Remove a user by ID
const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const result = await mongodb.getDb().collection('users').deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Export
module.exports = {
  registerUser,
  getSingle,
  getAll,
  updateUser,
  deleteUser
};
