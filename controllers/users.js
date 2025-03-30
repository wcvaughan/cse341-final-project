// User Controller - Chris Vaughan
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// POST /users - Register a new user
const registerUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDb().collection('users').insertOne(req.body);
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
    const userId = new ObjectId(req.params.userId);
    const result = await mongodb.getDb().collection('users').findOne({ _id: userId });
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
    const userId = new ObjectId(req.params.userId);
    const result = await mongodb.getDb().collection('users').updateOne(
      { _id: userId },
      { $set: req.body }
    );
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
    const userId = new ObjectId(req.params.userId);
    const result = await mongodb.getDb().collection('users').deleteOne({ _id: userId });
    res.status(200).json(result);
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
