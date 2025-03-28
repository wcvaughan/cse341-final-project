// User Controller - Chris Vaughan

// POST /user - Register a new user
const registerUser = async (req, res) => {
    //#swagger.tags=['Users']

};

// GET /user/login - Handle user login

// GET /user/logout - Handle user logout

// GET /user/{userId} - Retrieve details of a specific user by ID
const getSingle = async (req, res) => {
    //#swagger.tags=['Users']

};

// GET /user - Retrieve all users -- admin protected
const getAll = async (req, res) => {
    //#swagger.tags=['Users']

};

// PUT /user/{userId} - Update user details by ID
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']

};

// DELETE /user/{userId} - Remove a user by ID
const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']

};

// Export 

module.exports = {
    registerUser,
    getSingle,
    getAll,
    updateUser,
    deleteUser
};