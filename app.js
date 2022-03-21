const express = require("express");
const morgan = require("morgan");
const db = require('./database/controllers');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))


app.get('/', (req, res) => {
  res.status(200).send('Blogsite')
});

module.exports = app;