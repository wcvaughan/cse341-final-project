// Order Controller - Chris Vaughan
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// POST /orders - Create a new order
const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const { userId, storeId, items, totalPrice, status } = req.body;

    if (
      typeof userId !== 'string' ||
      typeof storeId !== 'string' ||
      !Array.isArray(items) ||
      typeof totalPrice !== 'number' ||
      typeof status !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid order fields' });
    }

    const newOrder = {
      userId,
      storeId,
      items,
      totalPrice,
      status,
      createdAt: new Date()
    };

    const result = await mongodb.getDb().collection('orders').insertOne(newOrder);
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
    const orderId = req.params.orderId;
    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }

    const result = await mongodb.getDb().collection('orders').findOne({ _id: new ObjectId(orderId) });
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

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

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing user ID' });
    }

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
    const orderId = req.params.orderId;
    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }

    const updateData = req.body;
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const result = await mongodb.getDb().collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Order not found or no changes made' });
    }

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
    const orderId = req.params.orderId;
    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }

    const result = await mongodb.getDb().collection('orders').deleteOne({ _id: new ObjectId(orderId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
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
