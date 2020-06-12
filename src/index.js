require('dotenv').config();

const express = require('express');
const app = express();
const SERVER_PORT = process.env.PORT || 8080;

const bodyParser = require('body-parser');

const schema = require('./configs/schema');
const graphqlApp = require('express-graphql');

app.use('/api', graphqlApp({ schema, graphiql: true }));

app.use(bodyParser.json());
require('./controllers')(app);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));