// Store Controller - Enoch Balbuena
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET /stores - Retrieve all stores
const getAllStores = async (req, res) => {
  //#swagger.tags = ['Stores']
  try {
    const result = await mongodb.getDb().collection('stores').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

// GET /stores/{storeId} - Retrieve a single store
const getStoreById = async (req, res) => {
  //#swagger.tags = ['Stores']
  try {
    const storeId = new ObjectId(req.params.storeId);
    const result = await mongodb.getDb().collection('stores').findOne({ _id: storeId });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch store' });
  }
};

// POST /stores - Create a store
const createStore = async (req, res) => {
  //#swagger.tags = ['Stores']
  try {
    const result = await mongodb.getDb().collection('stores').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create store' });
  }
};

// PUT /stores/{storeId} - Update a store
const updateStore = async (req, res) => {
  //#swagger.tags = ['Stores']
  try {
    const storeId = new ObjectId(req.params.storeId);
    const result = await mongodb.getDb().collection('stores').updateOne(
      { _id: storeId },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update store' });
  }
};

// DELETE /stores/{storeId} - Delete a store
const deleteStore = async (req, res) => {
  //#swagger.tags = ['Stores']
  try {
    const storeId = new ObjectId(req.params.storeId);
    const result = await mongodb.getDb().collection('stores').deleteOne({ _id: storeId });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete store' });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
