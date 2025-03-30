// Item Controller - Enoch Balbuena
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET /items - Retrieve a list of all items
const getAllItems = async (req, res) => {
  //#swagger.tags = ['Items']
  try {
    const result = await mongodb.getDb().collection('items').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// GET /items/{itemId} - Retrieve details of a specific item by ID
const getItemById = async (req, res) => {
  //#swagger.tags = ['Items']
  try {
    const itemId = req.params.itemId;
    if (!ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    const result = await mongodb.getDb().collection('items').findOne({ _id: new ObjectId(itemId) });

    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// POST /items - Create a new item
const createItem = async (req, res) => {
  //#swagger.tags = ['Items']
  try {
    const { name, category, price, stock } = req.body;

    // Validate required fields
    if (typeof name !== 'string' || typeof category !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ error: 'Missing or invalid fields: name, category, price, stock' });
    }

    const newItem = {
      ...req.body,
      createdAt: new Date()
    };

    const result = await mongodb.getDb().collection('items').insertOne(newItem);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// PUT /items/{itemId} - Update an existing item by ID
const updateItem = async (req, res) => {
  //#swagger.tags = ['Items']
  try {
    const itemId = req.params.itemId;
    if (!ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    const updateData = req.body;
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update fields provided' });
    }

    const result = await mongodb.getDb().collection('items').updateOne(
      { _id: new ObjectId(itemId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Item not found or no changes applied' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// DELETE /items/{itemId} - Remove an item by ID
const deleteItem = async (req, res) => {
  //#swagger.tags = ['Items']
  try {
    const itemId = req.params.itemId;
    if (!ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    const result = await mongodb.getDb().collection('items').deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
