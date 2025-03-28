const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/item-routes');
const orderRoutes = require('./routes/order-routes');
const storeRoutes = require('./routes/store-routes');
const userRoutes = require('./routes/user-routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app
    .use(bodyParser.json())
    .use(auth(config))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .get('/', requiresAuth(), (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/items', itemRoutes)
    .use('/orders', orderRoutes)
    .use('/stores', storeRoutes)
    .use('/users', userRoutes);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exceptionL ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running at port ${port}`);
        });
    }
});