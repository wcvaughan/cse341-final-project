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
    const storeId = req.params.storeId;
    if (!ObjectId.isValid(storeId)) {
      return res.status(400).json({ error: 'Invalid store ID format' });
    }

    const result = await mongodb.getDb().collection('stores').findOne({ _id: new ObjectId(storeId) });
    if (!result) {
      return res.status(404).json({ error: 'Store not found' });
    }

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
    const { name, location, hours, manager, contact, inventoryCount, status } = req.body;

    if (
      typeof name !== 'string' ||
      typeof location !== 'string' ||
      typeof hours !== 'string' ||
      typeof manager !== 'string' ||
      typeof contact !== 'string' ||
      typeof inventoryCount !== 'number' ||
      typeof status !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid store fields' });
    }

    const newStore = {
      name,
      location,
      hours,
      manager,
      contact,
      inventoryCount,
      status
    };

    const result = await mongodb.getDb().collection('stores').insertOne(newStore);
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
    const storeId = req.params.storeId;
    if (!ObjectId.isValid(storeId)) {
      return res.status(400).json({ error: 'Invalid store ID format' });
    }

    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const result = await mongodb.getDb().collection('stores').updateOne(
      { _id: new ObjectId(storeId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Store not found or no changes made' });
    }

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
    const storeId = req.params.storeId;
    if (!ObjectId.isValid(storeId)) {
      return res.status(400).json({ error: 'Invalid store ID format' });
    }

    const result = await mongodb.getDb().collection('stores').deleteOne({ _id: new ObjectId(storeId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.status(200).json({ message: 'Store deleted successfully' });
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
