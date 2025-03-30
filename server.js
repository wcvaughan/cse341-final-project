const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const itemRoutes = require('./routes/item-routes');
const orderRoutes = require('./routes/order-routes');
const storeRoutes = require('./routes/store-routes');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Swagger and routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes); // GitHub OAuth routes

// Error handler for uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\nException origin: ${origin}`);
});

// Initialize DB and start server
mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running at port ${port}`);
    });
  }
});
