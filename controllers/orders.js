// Order Controller - Chris Vaughan
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// POST /orders - Create a new order
const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const result = await mongodb.getDb().collection('orders').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// GET /orders/{orderId} - Retrieve order details by order ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const orderId = new ObjectId(req.params.orderId);
    const result = await mongodb.getDb().collection('orders').findOne({ _id: orderId });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// GET /orders - Retrieve all orders (admin)
const getAll = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const result = await mongodb.getDb().collection('orders').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// GET /orders/user/{userId} - Retrieve orders by user ID
const getOrdersByUser = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const userId = req.params.userId;
    const result = await mongodb.getDb().collection('orders').find({ userId }).toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};

// PUT /orders/{orderId} - Update order by ID
const updateOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const orderId = new ObjectId(req.params.orderId);
    const result = await mongodb.getDb().collection('orders').updateOne(
      { _id: orderId },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// DELETE /orders/{orderId} - Delete order by ID
const deleteOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const orderId = new ObjectId(req.params.orderId);
    const result = await mongodb.getDb().collection('orders').deleteOne({ _id: orderId });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Export
module.exports = {
  createOrder,
  getSingle,
  getAll,
  getOrdersByUser,
  updateOrder,
  deleteOrder
};
