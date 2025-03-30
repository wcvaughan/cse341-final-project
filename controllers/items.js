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
    const itemId = new ObjectId(req.params.itemId);
    const result = await mongodb.getDb().collection('items').findOne({ _id: itemId });
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
    const newItem = req.body;
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
    const itemId = new ObjectId(req.params.itemId);
    const result = await mongodb.getDb().collection('items').updateOne(
      { _id: itemId },
      { $set: req.body }
    );
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
    const itemId = new ObjectId(req.params.itemId);
    const result = await mongodb.getDb().collection('items').deleteOne({ _id: itemId });
    res.status(200).json(result);
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
