// Error handler to centralize all error handling logic
function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.stack || err.message);
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message || err
    });
  }
  
  // Export 
  module.exports = errorHandler;
  