const express = require("express")
const morgan = require("morgan");
const cors = require('cors');

//routes
const users = require('./routes/users')

const app = express();


app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))
app.use("/users", users)


app.get('/', (req, res) => {
  res.status(200).send('Blogsite')
});

module.exports = app;