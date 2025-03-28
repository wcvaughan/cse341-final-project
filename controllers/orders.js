// Order Controller - Chris Vaughan

// POST /order - Create a new order
const createOrder = async (req, res) => {
    //#swagger.tags=['Orders']

};

// GET /order/{orderId} - Retrieve order details by order ID
const getSingle = async (req, res) => {
    //#swagger.tags=['Orders']

};

// GET /order - Retrieve all orders -- admin protected
const getAll = async (req, res) => {
    //#swagger.tags=['Orders']

};

// GET /order/user/{userId} - Retrieve all orders placed by a specific user
const getOrdersByUser = async (req, res) => {
    //#swagger.tags=['Orders']

};
// DELETE /order/{orderId} - Cancel or remove an order by ID
const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']

};
// Export 

module.exports = {
    createOrder,
    getSingle,
    getAll,
    getOrdersByUser,
    deleteOrder
};