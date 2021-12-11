
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 4041

// access url encoded data and json data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes/user'));

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
});