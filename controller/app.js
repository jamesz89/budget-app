const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactions = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Budget App by James</h1>');
});

app.use('/transactions', transactions);

module.exports = app;
